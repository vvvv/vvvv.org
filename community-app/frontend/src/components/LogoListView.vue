<script setup>
import defaultLogo from '../assets/defaultLogo.png'
import Location from "../components/Location.vue"
import Internships from '../components/Internships.vue';
import { NSpin, NTooltip } from 'naive-ui';

const props = defineProps(['list', 'title', 'loading'])
const emit = defineEmits(['click']);

</script>

<template>
    <NSpin :show="loading">
        <div class="logoListView" v-if="list && list.total > 0">
            <p>{{ title }}</p>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                <div v-for="item in list.items" track-by="item.name" class="col mx-0 px-0">
                    <NTooltip :disabled="!item.tagline" trigger="hover" placement="top" delay="50" duration="0">
                        <template #trigger>
                            <div class="companyCard p-3 h-100 px-3 py-4" @click.prevent="emit('click', item.slug)">
                                <div class="company">
                                    <div class="logo">
                                        <img :src="item.logo || defaultLogo"/>
                                    </div>
                                    <p class="name">{{ item.name }}</p>
                                </div>
                                    
                                <Internships v-if="item.internships"  :data="item" text="Accepting internship" class="mb-1"/>
                                <Location :location="{city: item.location_city, country: item.location_country}"/>
        
                            </div>
                        </template>
                        {{ item.tagline }}
                    </NTooltip>
                </div>
            </div>
        </div>
    </NSpin>
</template>