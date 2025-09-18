<script setup>

const { data, isPast = false } = defineProps(['data', 'isPast']);

</script>

<template>
    <div v-if="data.length" class="dates">
        <template v-for="(item, index) in data.slice(0, 3)">
            <div class="mt-0 mb-0 row border-bottom mb-2 pb-3 d-flex align-items-center" :class="{ 'text-muted': item.past }">
                <div class="col-2 col-lg-1 pl-0 mr-lg-0 pr-lg-0">
                    <a :href="item.link">
                        <img :src="item.thumb" class="img-fluid" alt="{{ item.title }}"/>
                    </a>
                </div>
                <div class="col-10 col-lg-11 info">
                    <a :href="item.link" class="title">{{ item.title }}</a>
                    <p class="date mt-1 mb-0 d-flex">
                        <NEllipsis :line-clamp="1" :tooltip=false>
                        {{ item.dates }}<span v-if="item.country">. {{ item.country }}</span>
                        </NEllipsis>
                    </p>
                </div>
            </div>
        </template>
    </div>
    <div v-else>
        No upcoming dates.
    </div>
</template>