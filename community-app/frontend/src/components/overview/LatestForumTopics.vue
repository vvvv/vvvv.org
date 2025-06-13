<script setup>

import { ref, onMounted } from 'vue';
import { NEllipsis } from 'naive-ui'
import { fetchLatestTopics } from './fetchForum.js';
import Constants from '../../constants.js';

const topics = ref([]);

onMounted(async ()=>{
    try
    {
        const data = await fetchLatestTopics();
        topics.value = data.map((t)=>{
            return {
                id: t.id,
                title: t.title,
                link: Constants.FORUM+'t/'+t.slug
            }
        })
    }
    catch(error)
    {
        console.log (error);
    }
})
</script>

<template>
    <div v-if="topics.length > 0" class="section">
        <div class="row pb-2 mb-2 border-bottom">
            <div class="col-auto mr-auto">
                <h2>Latest Forum Topics</h2>
            </div>
            <div class="col-auto">
                <a :href="Constants.FORUM" class="btn btn-sm btn-secondary">Forum</a>
            </div>
        </div>
        <div class="row pt-2">
            <ul class="list-group list-group-flush">
                <li v-for="topic in topics" :key="topic.id" class="list-group-item mt-0 mb-0 py-2 forumLink">
                    <NEllipsis line-clamp="1">
                        <a :href="topic.link">{{ topic.title }}</a>
                    </NEllipsis>
                </li>
            </ul> 
        </div>
    </div>
</template>