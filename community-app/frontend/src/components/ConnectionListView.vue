<script setup>
import { logos } from './logos/logos.js'
import { NIcon, NButton, NDropdown } from 'naive-ui';
import { ChevronDown } from '@vicons/ionicons5';
import { showBusinessProfile, showEduProfile } from "../utils.js"
import { computed, onMounted } from 'vue';

const props = defineProps(['list', 'options', 'connection', 'connectionKey'])
const emit = defineEmits(['change'])

const texts = {
    business: {
        title: 'Businesses on other platforms:',
        type: 'Business',
    },
    edu: {
        title: 'Institutions on other platforms:',
        type: 'Institution',
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

const profileLink = computed(()=>`/edit-profile/?p=${props.connectionKey}`)

</script>

<template>
    <div class="connectionsView">
        <p>{{ texts[props.connectionKey].title }}</p>
        <table class="table table-borderless">
            <thead class="border-bottom">
                <tr>
                    <th scope="col" class="col-4">{{ texts[props.connectionKey].type }}</th>
                    <th scope="col" class="col">
                       <NDropdown trigger="click" :options="options" @select="(key) => emit('change', key)">
                         <NButton secondary>{{ connection.label }}<NIcon class="ml-4"><ChevronDown/></NIcon></NButton>
                       </NDropdown></th>
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
        <p class="mt-4 profileLink">Add this platform to <a :href="profileLink">your profile.</a></p>
    </div>
</template>

