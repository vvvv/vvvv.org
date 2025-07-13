<script setup>
import { NIcon, NTooltip } from 'naive-ui';
import { PersonCircleOutline } from '@vicons/ionicons5'
import { toHtml, showUserProfile } from '../utils.js'

defineProps(['data']);

</script>
<template>
    <p class="text-muted mb-2 border-top pt-3 smallTitle">People</p>
    <div v-for="person in data" class="mb-2">
        <NIcon size="20" class="mr-2">
            <PersonCircleOutline/>
        </NIcon>
        <NTooltip trigger="hover" :disabled="!person.role" placement="top-start">
                <template #trigger>
                    <a :href="person.link" @click.prevent="showUserProfile(person.username)">{{ person.username }}</a>
                </template>
                {{ person.role }}
        </NTooltip>
    </div>
</template>