<script setup>
import { NTooltip, NIcon } from 'naive-ui';

defineProps (['item']);

const prefix = "https://vvvv.org";

</script>
<template>
    <div class="px-2">
        <div class="socialItem mb-1 px-3 pt-3 pb-0 mb-0">
            <div class="row border-bottom">
                <h6 class="px-3 pb-1"> {{ item.title }}</h6>
            </div>
            <div v-if="item.children" v-for="c in item.children" :key="c.name">
                <div class="row mt-2 pb-2 border-bottom">
                    <div class="col-2">
                        <img v-if="c.logo" :src="prefix+c.logo" style="width: 25px;"/>
                        <NIcon v-else size="25">
                            <component :is="c.icon"/>
                        </NIcon>
                    </div>
                    <div class="col-10">
                        <div class="list-group list-group-flush">
                            <template v-if="c.children" v-for="link in c.children">
                                <NTooltip :disabled="!link.alt" trigger="hover" placement="top-start" :delay="100" :animated=false :duration="0">
                                  <template #trigger>
                                    <a :href="link.link" class="list-group-item list-group-item-action px-0 pt-1 pb-2 link">
                                        {{ link.description }}            
                                    </a>
                                  </template>
                                  {{ link.alt }}
                                </NTooltip>
                            </template>
                            <template v-else>
                                <NTooltip :disabled="!c.alt" trigger="hover" placement="top-start" :delay="100" :animated=false :duration="0">
                                    <template #trigger>
                                        <a :href="c.link" class="list-group-item list-group-item-action px-0 pt-0 pb-2 link">
                                            {{ c.description }}            
                                        </a>
                                    </template>
                                    {{ c.alt }}
                                </NTooltip>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>