<script setup>
import { defineProps, reactive, ref, watch } from 'vue';

let repoName = ref(null)
let isRepo = ref(true)
let orgsData = reactive([])
let repoData = reactive([])

const props = defineProps({
    data: Object
})

watch(() => props.data, (newData) => {
    if (newData) {
        repoData = newData.repo;
        orgsData = newData.organization;
    }
}, { intermediate: true })

</script>
<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title text-center p-3">
                <div class="row ">
                    <div class="col">
                        <h5 role="button" @click="() => { isRepo = true }">Repository <span
                                class="badge text-bg-secondary">{{
                                    repoData != null ? repoData.length : 0 }}</span></h5>
                    </div>
                    <div class="col">
                        <h5 role="button" @click="() => { isRepo = false }">Organization <span
                                class="badge text-bg-secondary">{{
                                    orgsData != null ? orgsData.length : 0 }}</span></h5>
                    </div>
                </div>
            </h4>
            <form class="d-flex  mr-4">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                    v-model="repoName">
                <button class="btn btn-outline-light rounded" type="button" @click="reposearchBtnClick">Search</button>
            </form>

            <div v-if="isRepo" class="repository overflow-y-auto mt-4" style="max-height: 30rem;">
                <div v-for="datas in repoData" class="m-2">
                    <div v-if="!repoName || datas.name.includes(repoName)" class="repositorys py-2 mx-1">
                        <h5>{{ datas.name }}</h5>
                    </div>
                </div>
            </div>
            <div v-if="!isRepo" class="repository overflow-y-auto mt-4" style="max-height: 30rem;">
                <div v-for="datas in orgsData" class="m-2">
                    <div v-if="(!repoName || datas.login.includes(repoName)) && !isRepo" class="repositorys py-2 mx-1">
                        <h5>{{ datas.login }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    background-color: rgb(59, 59, 61);
    color: rgb(235, 225, 225)
}


.repositorys {
    border-bottom: 2px solid rgb(143, 138, 138);
}
</style>