<script setup>
import { ref, computed, onMounted } from 'vue'
import { ensureHttps, getProperties, stripPrefix, ensurePrefix, stripBeforeLastAt, stripBeforeLastSlash } from '../utils'

const { social, order } = defineProps({ social: Object, order: Array })

const socialLinks = ref([]);
const socialFields = ref([]);

const socialKeys = [
	{ key: 'github', prefix: 'github.com/'},
	{ key: 'nuget', prefix: 'nuget.org/profiles/'},
	{ key: 'mastodon', prefix: null},
	{ key: 'pixelfed', prefix: null}
]

onMounted(()=>{
	if  (social)
	{
		socialLinks.value = socialKeys
			.filter(({ key }) => social[key])
			.map(({ key, prefix }) => {
				if (prefix)
				{
					const stripped = stripBeforeLastSlash(social[key]);
					return {
						name: key,
						text: stripped,
						url: ensurePrefix(stripped, prefix)
					}
				}
				else
				{
					return {
						name: key,
						text: stripBeforeLastAt(social[key]),
						url: social[key]
					}
				}
			})

		social.fields?.forEach(({ key, value }) => {	
			socialLinks.value.push({
				name: key,
				text: value
			})
		});
	}
})

</script>

<template>
	<div class="row mt-4 mt-sm-0 socialView">
		<div class="col-sm-6 col-lg-4 mb-1 pr-2" v-for="link in socialLinks" :key="link.name">
			<div class="border-bottom pb-2">
				<p class="my-0 key"> {{ link.name }} </p>
				<template v-if=link.url><a :href="link.url" target="_blank">{{ link.text }}</a></template>
				<template v-else>{{ link.text }}</template>
			</div>
		</div>
	</div>
</template>
