<script setup>
import { logos } from './logos/logos.js'
import { NIcon, NButton, NDropdown } from 'naive-ui';
import { ChevronDown } from '@vicons/ionicons5';
import { showBusinessProfile, showEduProfile } from "../utils.js"

const props = defineProps(['list', 'options', 'connection', 'type'])
const emit = defineEmits(['change'])

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

</script>

<template>
    <div>
        <table class="table table-borderless">
            <thead class="border-bottom">
                <tr>
                    <th scope="col" class="col-4">{{ type}}</th>
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
    </div>
</template>

