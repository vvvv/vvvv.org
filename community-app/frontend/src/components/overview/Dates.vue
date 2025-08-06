<script setup>

import { ref, onMounted } from 'vue';
import { NTag, NEllipsis, NSkeleton } from 'naive-ui'
import { useHugoStore } from './Hugostore.js'
import Constants from '../../constants.js';
import SectionTitle from './SectionTitle.vue'

const store = useHugoStore();
const loading = ref(false);

onMounted(async ()=>{   
    try {
        loading.value = true;
        await store.fetch();
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
    <div class="section pl-4">
        <SectionTitle :showRefresh="false" :loading="loading" title="Dates" :link="Constants.BLOG_DATES" :isExternal="true"/>
            <template v-if="loading">
                <NSkeleton text :repeat="6" class="mb-4 mx-3"></NSkeleton>
            </template>
            <template v-else>
                <div v-if="store.dates.length > 0" class="dates">
                    <template v-for="(item, index) in store.dates.slice(0, 3)">
                        <div class="mt-0 mb-0 row border-bottom mb-2 pb-3 d-flex align-items-start" :class="{ 'text-muted': item.past }">
                            <div class="col-2 col-md-3 col-lg-2 pl-0 mr-lg-0 pr-lg-0">
                                 <a :href="item.link">
                                     <img :src="item.thumb" class="img-fluid p-1" alt="{{ item.title }}"/>
                                 </a>
                            </div>
                            <div class="col-10 col-md-9 col-lg-10 info pl-0">
                                <a :href="item.link" class="title">{{ item.title }}</a>
                                <p class="date mt-1 mb-0">
                                    <NEllipsis :line-clamp="1" :tooltip=false>
                                        <NTag v-if="!item.past"size="small" round :bordered="false" class="mr-2 darkTag">upcoming</NTag> {{ item.dates }}<span v-if="item.country">. {{ item.country }}</span>
                                    </NEllipsis>
                                </p>
                            </div>
                        </div>
                    </template>
                </div>
                <div v-else class="m-3">Okay, Houston... we have a problem here.<br/>Try again later.</div>
            </template>
    </div>
</template>