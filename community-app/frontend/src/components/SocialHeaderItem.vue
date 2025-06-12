<script setup>
import { computed, onMounted } from 'vue';
import { NTooltip } from 'naive-ui';

const props = defineProps ({
    item: Object
})

const connection = {...props.item};

const prefix = "https://vvvv.org";

</script>
<template>
    <div class="col-sm-6 col-lg-3 px-2">
        <div class="socialItem mb-1 px-3 pt-3 pb-0 mb-0">
            <div class="row border-bottom">
                <h6 class="px-3 pb-1"> {{ connection.title }}</h6>
            </div>
            <div v-if="connection.children" v-for="c in connection.children" :key="c.name">
                <div class="row mt-2 pb-2 border-bottom">
                    <div class="col-2">
                        <img v-if="c.logo" :src="prefix+c.logo" />
                    </div>
                    <div class="col-10">
                        <div class="list-group list-group-flush">
                            <a v-if="c.children" v-for="link in c.children" :href="link.link" :alt="link.alt" class="list-group-item list-group-item-action px-0 pt-1 pb-2 link">
                                {{ link.description }}            
                            </a>
                            <a v-else :href="c.link" :alt="c.alt" class="list-group-item list-group-item-action px-0 pt-0 pb-2 link">
                                {{ c.description }}            
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>