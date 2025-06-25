<script setup>
import { computed } from 'vue';
import { connections } from '../connections.js'
import { logos } from './logos/logos.js'
import ConnectionsItem from './ConnectionsItem.vue';

const sortedConnections = computed(()=> {
    const c = [...connections].sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
    c.forEach( c => {
        c.children?.forEach (connection =>{
            if (!connection.logo && connection.name)
            {
                const element = logos.find (l=> l.name === connection.name.toLowerCase());
                if (element)
                {
                    connection.icon = element.logo;
                }
            }
        })
    })

    return c;
})
</script>

<template>
    <div class="row socialHeader">
        <ConnectionsItem v-for="connection in sortedConnections" :item="connection" :key="connection.name"/>
    </div>
</template>