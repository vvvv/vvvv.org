<script setup>
import { shallowRef, computed, onMounted } from 'vue'
import { ensureHttps, stripHttp, getProperties, stripPrefix, ensurePrefix, stripBeforeLastAt, stripBeforeLastSlash, getURL } from '../utils'
import { NIcon } from 'naive-ui'
import { logos } from "./logos/logos.js"

const props = defineProps(['social'])

const socialLinks = shallowRef([]);
const socialFields = shallowRef([]);

const socialOrder = ['website', 'github', 'nuget', 'linkedin', 'mastodon', 'pixelfed', 'peertube', 'youtube']

const media = socialOrder.map( (m) => {
	const l = logos.find( logo => logo.name === m );
	return {
		key: m,
		prefix: l.prefix,
		logo: l.logo
	}
})

// Add logos
media.forEach( m => {
	const l = logos.find( logo => logo.name === m.key );
	m.logo = l ? l.logo : null;
});

function getLogo(key)
{
	const entry = media.find( i => i.key === key );
	return  entry ? entry.logo : null;
}

function pickHandle (link) {
	const indexOf = link.lastIndexOf('@');
	return indexOf !== -1 ? link.slice (indexOf) : link;
}

function openLink (name, link) {
	const url = media[name]?.prefix ? `${media[name].prefix}${link}/` : name.link 
	window.open(url, '_blank'); 
}

onMounted(()=>{
	if  (props.social)
	{
		socialLinks.value = media.filter(({ key }) => props.social[key]).map(({ key, prefix }) => {	
				
				let text;
				let url;

				if (key === 'website')
				{
					text = stripHttp(props.social.website)
					url = ensureHttps(props.social.website)
				}
				else
				{
					text = stripBeforeLastSlash(props.social[key]);
					url = ensureHttps(ensurePrefix(props.social[key], prefix));
				}

				const logo = getLogo(key); 
			
				return {
					name: key,
					text: text,
					url: url,
					icon: logo
				}
			});

		socialFields.value = props.social.fields?.map(({ key, value }) => {	
			const { text, url } = getURL(value);
			return{
				name: key,
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
			<div class="mb-1 pr-2" v-for="link in socialLinks" :key="link.name">
				<div class="pb-2">
					<NIcon v-if="link.icon" class="mr-2" size="20"><component :is="link.icon"/></NIcon>
					<p v-else>{{  link.name }}</p>
					<template v-if="link.url"><a :href="link.url" target="_blank">{{ link.text }}</a></template>
					<template v-else>{{ link.text }}</template>
				</div>
			</div>
		</div>
		<div class="mt-4 mt-sm-0 socialView border-top" v-if="socialFields.length > 0">
			<div class="mb-1 pr-2 socialItem" v-for="field in socialFields" :key="field.name">
					<div class="key">{{  field.name }}</div>
					<template v-if="field.url"><a :href="field.url" target="_blank">{{ field.text }}</a></template>
					<template v-else>{{ field.text }}</template>
			</div>
		</div>
	</div>
</template>
