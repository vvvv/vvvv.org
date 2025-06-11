<script setup>
import { ref, computed, onMounted } from 'vue'
import { ensureHttps, getProperties, stripPrefix, ensurePrefix, stripBeforeLastAt, stripBeforeLastSlash, getURL } from '../utils'
import { NIcon } from 'naive-ui'
import { LogoGithub, LogoMastodon } from '@vicons/ionicons5'
import LogoNuget  from './logos/LogoNuget'
import LogoPixelfed from './logos/LogoPixelfed'

const { social, order } = defineProps({ social: Object, order: Array })

const socialLinks = ref([]);
const socialFields = ref([]);

const media = [
	{ key: 'github', prefix: 'github.com/', logo: LogoGithub },
	{ key: 'nuget', prefix: 'nuget.org/profiles/', logo: LogoNuget},
	{ key: 'mastodon', prefix: null, logo: LogoMastodon},
	{ key: 'pixelfed', prefix: null, logo: LogoPixelfed}
]

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
	if  (social)
	{
		socialLinks.value = media.filter(({ key }) => social[key]).map(({ key, prefix, logo }) => {	
				const stripped = stripBeforeLastSlash(social[key]);
				const url = ensurePrefix(social[key], prefix)
				return {
					name: key,
					text: stripped,
					url: url,
					icon: getLogo (key)
				}
			});

		socialFields.value = social.fields?.map(({ key, value }) => {	
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
		<div class="row mt-4 mt-sm-0 pb-2 socialView border-bottom" v-if="socialLinks.length > 0">
			<div class="col-sm-6 mb-1 pr-2" v-for="link in socialLinks" :key="link.name">
				<div class="pb-2">
					<NIcon v-if="link.icon" class="mr-2" size="20"><component :is="link.icon"/></NIcon>
					<p v-else>{{  link.name }}</p>
					<template v-if="link.url"><a :href="link.url" target="_blank">{{ link.text }}</a></template>
					<template v-else>{{ link.text }}</template>
				</div>
			</div>
		</div>
		<div class="row mt-4 mt-sm-0 socialView" v-if="socialFields.length > 0">
			<div class="col-sm-12 mb-1 pr-2" v-for="field in socialFields" :key="field.name">
				<div class="border-bottom pb-2">
					<div class="key">{{  field.name }}</div>
					<template v-if="field.url"><a :href="field.url" target="_blank">{{ field.text }}</a></template>
					<template v-else>{{ field.text }}</template>
				</div>
			</div>
		</div>
	</div>
</template>
