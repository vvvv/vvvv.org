<script setup>

import { ref, onMounted } from 'vue';
import { NEllipsis, NSkeleton } from 'naive-ui'
import { fetchLatestTopics } from './fetchOverview.js';
import Constants from '../../constants.js';
import { formatDiagnosticsWithColorAndContext } from 'typescript';

const topics = ref([]);
const loading = ref(false);

onMounted(async ()=>{

    loading.value = true;

    try {
        topics.value = await fetchLatestTopics();
    }
    catch(error) {
        console.log (error);
    }
    finally {
        loading.value = false;
    }
})
</script>

<template>
    <div class="section">
        <div class="row pb-2 mb-2 border-bottom">
            <div class="col-auto mr-auto">
                <h2>Latest Forum Topics</h2>
            </div>
            <div class="col-auto">
                <a :href="Constants.FORUM" class="all">Forum</a>
            </div>
        </div>
        <div class="row pt-2">
            <template v-if="loading">
                <NSkeleton text :repeat="5" class="mb-4 mx-3"></NSkeleton>
            </template>
            <template v-else>
                <ul v-if="topics.length > 0" class="list-group list-group-flush">
                    <li v-for="topic in topics" :key="topic.id" class="list-group-item mt-0 mb-0 py-2 forumLink">
                        <NEllipsis :line-clamp="1" :tooltip=false>
                            <a :href="topic.link" target="_blank">{{ topic.title }}</a>
                        </NEllipsis>
                    </li>
                </ul> 
                <div v-else>No topics found.</div>
            </template>
        </div>
    </div>
</template>