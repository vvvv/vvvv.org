<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { logos } from './logos/logos.js'
import { NIcon, NButton, NDropdown, NPagination, NSpin } from 'naive-ui';
import { ChevronDown } from '@vicons/ionicons5';
import { showBusinessProfile, showEduProfile } from "../utils.js"

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
        profileLink: 'business'
    },
    edu: {
        title: 'Institutions on other platforms:',
        type: 'Institution',
        profileLink: 'edu'
    },
    people: {
        title: 'People on other platforms:',
        type: 'Username',
        profileLink: 'personal'
    }
}

function handleClick(item)
{
    if (item.key == 'business')
    {
        showBusinessProfile(item.slug);
    }
    else if (item.key == 'edu')
    {
        showEduProfile(item.slug);
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

</script>

<template>
    <p>{{ constants[props.connectionKey].title }}</p>
    <NSpin :show="loading">
        <div class="connectionsView" v-if="list">
            <table class="table table-borderless">
                <thead class="border-bottom">
                    <tr>
                        <th scope="col" class="col-4">{{ constants[props.connectionKey].type }}</th>
                        <th scope="col" class="col pr-0">
                            <div class="row align-items-center">
                                <div class="col mb-3 mb-md-0">
                                    <NDropdown trigger="click" :options="options" @select="(key) => emit('change', key)">
                                        <NButton secondary>{{ connection.label }}<NIcon class="ml-4"><ChevronDown/></NIcon></NButton>
                                    </NDropdown>
                                </div>
                                <div class="col-auto" v-if="list.total > pageSizes[0].value">
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
                            <a :href="item.profileLink" @click.prevent="handleClick(item)">{{ item.name }}</a>
                        </td>
                        <td>
                            <a :href="item.connectionLink" target="_blank">
                                <NIcon class="mr-3"><component :is="logos[connection.key]"/></NIcon>{{ item.label }}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="row mt-4">
                <div class="col-12 col-md">
                    <p class="profileLink">Add this platform to <a :href="profileLink">your profile.</a></p>
                </div>
                <div class="col-12 col-md-auto ml-auto" v-if="list.total > pageSizes[0].value">
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

