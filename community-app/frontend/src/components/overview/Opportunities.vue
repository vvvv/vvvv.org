<script setup>

import { ref, onMounted } from 'vue';
import { NTag, NEllipsis, NSkeleton, NTooltip, NDropdown, NButton } from 'naive-ui'
import { useOpportunitiesStore } from './OpportunitiesStore.js'
import { showBusinessProfile } from "../../utils.js"
import SectionTitle from './SectionTitle.vue'
import Constants from '../../Constants.js'
import { useRouter } from 'vue-router';

const store = useOpportunitiesStore();
const loading = ref(false);

const router = useRouter();

onMounted(()=>{   
    sync();
})

async function sync(force)
{
    try {
        loading.value = true;
        await store.fetch(force);         
    }
    catch(error) {
        console.log (error);
    }
    finally {
        loading.value = false;
    }
}

const addOptions = ref(
    [
        {
            label: 'Add job via Job Forum',
            key: 'job',
            link: Constants.FORUM_JOBS_TOPIC
        },
        {
            label: 'Add internship via business profile',
            key: 'internship',
            link: Constants.PROFILE_BUSINESS
        }
    ]
)

function handleAdd (value)
{
    const link = addOptions.value.find(o=>o.key == value).link;
    document.location.href = link;
}

</script>

<template>
    <div class="section pl-4 opportunities">
        <SectionTitle showRefresh="true" :loading="loading" title="Opportunities" @sync="sync(true)">
            <template #beforeSync>
                <NDropdown placement="bottom-start" trigger="click" size="small" :options="addOptions" @select="handleAdd">
                    <div class="mr-3">
                        <NButton size="small">+ Add</NButton>
                    </div>
                </NDropdown>
            </template>
        </SectionTitle>
        <div class="row pt-1">
            <template v-if="loading">
                <NSkeleton text :repeat="5" class="mb-4 mx-3"></NSkeleton>
            </template>
            <template v-else>
                <ul v-if="store.jobs.length > 0" class="list-group list-group-flush list">
                    <li v-for="(job, index) in store.jobs" :key="index" class="list-group-item d-flex flex-nowrap mt-0 mb-0 py-2 link">
                        <NTag size="small" round :bordered="false" class="px-3 mr-3" :color="{color: '#666', textColor: '#fff'}">job</NTag>
                        <NEllipsis :line-clamp="1" :tooltip=false>
                            <a :href="job.link" target="_blank">{{ job.title }}</a>
                        </NEllipsis>
                    </li>
                </ul>
                <ul v-if="store.internships.length > 0" class="list-group list-group-flush list">
                    <li v-for="(job, index) in store.internships" :key="index" class="list-group-item d-flex flex-nowrap mt-0 mb-0 py-2 link">
                        <NTag size="small" round :bordered="false" class="px-2 mr-3 text-muted">internship</NTag>
                        <NEllipsis :line-clamp="1" :tooltip=false>
                            <a :href="job.link" target="_blank" @click.prevent="showBusinessProfile(job.slug)">
                                {{ job.title }}
                            </a>
                        </NEllipsis>
                    </li>
                </ul>
                <!-- <div v-else class="m-3">Okay, Houston... we have a problem here.<br/>Try again later.</div> -->
            </template>
        </div>
        <div class="row justify-content-end">

            <!-- <NTooltip trigger="hover">
                <template #trigger>
                </template>
                Add job via Job Forum
            </NTooltip>
            <NTooltip trigger="hover">
                <template #trigger>
                </template>
                Add internship via business profile
            </NTooltip> -->
        </div>
    </div>
</template>