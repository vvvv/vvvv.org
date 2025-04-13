<script setup>
const { hire } = defineProps({ hire: Object })
</script>

<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <img :src="hire.image" class="img-fluid" v-if="hire.image !== null"/>
                <div class="card-body">
                    <div class="col">
                        <p class="card-text" v-html="hire.description"></p>
                    </div>
                    <div class="col">
                        <h4>vvvv skills</h4>
                        <p class="card-text" v-html="hire.skills_vvvv"></p>
                        
                        <h4>other skills</h4>
                        <p class="card-text" v-html="hire.skills_other"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>