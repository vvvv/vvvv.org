<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { logos } from './logos/logos.js'
import { NIcon, NButton, NDropdown, NPagination, NSpin, NPerformantEllipsis } from 'naive-ui';
import { ChevronDown } from '@vicons/ionicons5';
import { showBusinessProfile, showEduProfile, showUserProfile } from "../utils.js"

const props = defineProps(['list', 'loading', 'options', 'connection', 'connectionKey', 'pageSizes'])
const emit = defineEmits(['change', 'page'])

const windowWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const constants = {
    business: {
        title: 'Businesses on other platforms:',
        type: 'Business',
        profileLink: 'business',
        handleClick: (item)=>showBusinessProfile(item.slug)
    },
    edu: {
        title: 'Institutions on other platforms:',
        type: 'Institution',
        profileLink: 'edu',
        handleClick: (item)=>showEduProfile(item.slug)
    },
    people: {
        title: 'People on other platforms:',
        type: 'Username',
        profileLink: 'personal',
        handleClick: (item)=>showUserProfile(item.name)
    }
}

const profileLink = computed(()=>`/edit-profile/?p=${constants[props.connectionKey].profileLink}`)

const page = ref(1);
const pageSize = ref(props.pageSizes[0].value);

function setPage(p)
{
    page.value = p
    emit('page', { page: p, size: pageSize.value});
}

function setSize(s)
{
    pageSize.value = s;
    emit('page', { page: 1, size: s});
}

const isSimple = computed(() => (windowWidth.value < 480 ? true : false));
const showSizePicker = computed(() => windowWidth.value > 600);

watch(()=>props.list, ()=> window.scrollTo({ top: 0, behavior: 'smooth' }));
watch(()=>props.connection, (oldValue, newValue)=> { 
    if (oldValue!=newValue)
        page.value = 1;
});

</script>

<template>
    <p>{{ constants[props.connectionKey].title }}</p>
    <NSpin :show="loading">
        <div class="connectionsView" v-if="list">
            <table class="table table-borderless w-100" style="table-layout: fixed;">
                <thead class="border-bottom">
                    <tr>
                        <th scope="col" class="w-20">{{ constants[props.connectionKey].type }}</th>
                        <th scope="col" class="w-80 pr-0">
                            <div class="row align-items-center">
                                <div class="col">
                                    <NDropdown trigger="click" :options="options" @select="(key) => emit('change', key)">
                                        <NButton secondary>{{ connection.label }}<NIcon class="ml-4"><ChevronDown/></NIcon></NButton>
                                    </NDropdown>
                                </div>
                                <div class="col-auto mt-3 mt-md-0" v-if="list.total > pageSizes[0].value">
                                    <NPagination
                                        v-model:page="page"
                                        v-model:page-size="pageSize"
                                        :simple="isSimple"
                                        :item-count="list.total"
                                        :page-sizes="pageSizes"
                                        :page-slot="4"
                                        :show-size-picker="showSizePicker"
                                        @update:page="setPage"
                                        @update:page-size="setSize"
                                        class="pagination"
                                    />
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="list">
                    <tr v-for="item in list.items" class="border-bottom">
                        <td>
                            <NPerformantEllipsis line-clamp="1" :tooltip="false">
                                <a :href="item.profileLink" @click.prevent="constants[item.key].handleClick(item)">{{ item.name }}</a>
                            </NPerformantEllipsis>
                        </td>
                        <td>
                            <a :href="item.connectionLink" target="_blank">
                                <NPerformantEllipsis line-clamp="1" :tooltip="false">
                                    <NIcon class="mr-1"><component :is="logos[connection.key]"/></NIcon>
                                        {{ item.label }}
                                </NPerformantEllipsis>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="row mt-4">
                <div class="col-12 col-md order-2 order-md-1">
                    <p class="profileLink">Add this platform to <a :href="profileLink">your profile.</a></p>
                </div>
                <div class="col-12 col-md-auto ml-auto order-1 order-md-2 mb-3 mb-md-0" v-if="list.total > pageSizes[0].value">
                    <NPagination
                        v-model:page="page"
                        v-model:page-size="pageSize"
                        :simple="isSimple"
                        :item-count="list.total"
                        :page-sizes="pageSizes"
                        :page-slot="4"
                        :show-size-picker="showSizePicker"
                        @update:page="setPage"
                        @update:page-size="setSize"
                    />
                </div>
            </div>
        </div>
    </NSpin>
</template>

