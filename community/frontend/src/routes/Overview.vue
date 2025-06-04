<script setup>
import { ref, computed } from 'vue'
import NewestUsers from "../components/overview/NewestUsers.vue"
import '../styles/style.scss'

</script>

<template>
    <h1>Overview</h1>
    <div class="row">
        <div class="col">
            <NewestUsers/>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header">
                    Businesses
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                </ul>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header">
                    For Hire!
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">An item</li>
                    <li class="list-group-item">A second item</li>
                    <li class="list-group-item">A third item</li>
                </ul>
            </div>
        </div>
    </div>
</template>
