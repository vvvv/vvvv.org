<script setup>
import { ref } from 'vue'
import { ensureHttps, getProperties } from '../../utils'

const { social, order } = defineProps({ social: Object, order: Array })

const socialLinks = ref(null);
const socialFields = ref(null);

if  (social)
{
	socialLinks.value = getProperties(social, order);
	socialFields.value = social.fields;
}

</script>

<template>
	<div class="card mb-4 mb-lg-0">
		<div class="card-body p-0">   
			<ul class="list-group list-group-flush rounded-2">
				<li class="list-group-item px-3 py-1" v-for="(value, key) in socialLinks" :key="key">
					<p class="py-0 mb-0 text-muted font-weight-light" style="font-variant-caps: all-small-caps;"> {{ key }} </p>
						<a :href="ensureHttps(value)" v-if="key == 'website' && (value != null || value != '')">{{ value }}</a>
					<p class="mb-0" v-else>{{ value ?? '-' }}</p>
				</li>
				<template v-if="socialFields && Object.values(socialFields).some(x => x!== null)">
					<li class="list-group-item px-3 py-1" v-for="f in socialFields" :key="f.key">
						<p class="py-0 mb-0 text-muted font-weight-light" style="font-variant-caps: all-small-caps;"> {{ f.key }} </p>
						<p class="mb-0">{{ f.value !== null && f.value !== undefined ? f.value : "-" }}</p>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>
