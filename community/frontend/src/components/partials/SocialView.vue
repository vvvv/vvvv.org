<script setup>
    const { data } = defineProps(['data'])
</script>

<template>
    <Field label="Website" :value="data.website"/>
    <Field label="Github" :value="data.github"/>
    <Field label="Nuget" :value="data.nuget"/>
    <Field label="Pixelfed" :value="data.pixelfed"/>
    <Field label="Mastodon" :value="data.mastodon"/>
    <template v-for="f in data.fields">
        <Field :label="f.key" :value="f.value" class="col-12 col-md-6"/>
    </template>
</template>