<script setup>
import { shallowRef, computed, onMounted } from 'vue'
import { getURL } from '../utils'
import { linkData } from './LinksHelper.js'
import { NIcon } from 'naive-ui'
import { logos } from "./logos/logos.js"

const props = defineProps(['social'])

const socialLinks = shallowRef([]);
const socialFields = shallowRef([]);

const socialOrder = ['website', 'github', 'nuget', 'linkedin', 'mastodon', 'pixelfed', 'peertube', 'youtube']

onMounted(()=>{
	if  (props.social)
	{
		socialLinks.value = socialOrder.filter(key => props.social[key]).map(key => {	
			const data = linkData(key, props.social[key]); 
			return data;		
		});

		socialFields.value = props.social.fields?.map(({ key, value }) => {	
			const { text, url } = getURL(value);
			return{
				key: key,
				text: text,
				url: url
			}
		}) || [];
	}
})

</script>

<template>
	<div>
		<div class="mt-4 mt-sm-0 pb-2 socialView" v-if="socialLinks.length > 0">
			<div class="mb-1 pr-2" v-for="link in socialLinks" :key="link.key">
				<div class="pb-2">
					<NIcon v-if="link.icon" class="mr-2" size="20"><component :is="link.icon"/></NIcon>
					<p v-else>{{  link.text }}</p>
					<template v-if="link.url"><a :href="link.url" target="_blank">{{ link.text }}</a></template>
					<template v-else>{{ link.text }}</template>
				</div>
			</div>
		</div>
		<div class="mt-4 mt-sm-0 socialView border-top" v-if="socialFields.length > 0">
			<div class="mb-1 pr-2 socialItem" v-for="field in socialFields" :key="field.key">
					<div class="key">{{  field.key }}</div>
					<template v-if="field.url"><a :href="field.url" target="_blank">{{ field.text }}</a></template>
					<template v-else>{{ field.text }}</template>
			</div>
		</div>
	</div>
</template>
