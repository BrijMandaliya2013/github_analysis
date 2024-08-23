<script setup>
import { fetchCommitsPerRepo, fetchLanguages, fetchOrganiztion, fetchPRPerRepo, fetchStarredPerLanguage, fetchStarredPerRepo, fetchUserData, fetchUserRepo } from '@/assets/fetchData.js';
import { ref, onMounted, watch, reactive } from 'vue';
import Header from '@/components/Header.vue';
import UserProfile from '@/components/UserProfile.vue'
import Repository from '@/components/Repository.vue';
import noData from '@/components/noData.vue';
import loading from '@/components/loading.vue';



import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { chartDATA } from '@/assets/chartData';


ChartJS.register(ArcElement, Tooltip, Legend)

const imgSrc = ref(null);
const userName = ref(null);
let data = ref(null);
let repoData = ref(null)
let languages = reactive([])
let organization = ref()
let repo = ref([])
let commits = ref([])
let starred = ref([])
let starredPerRepo = ref([])
let PRPerRepo = ref([])


let starredPerLanguageLoading = ref(false)
let commitsPerRepoLoading = ref(false)
let starredPerRepoLoading = ref(false)
let repoPerLanguageLoading = ref(false)
let PRPerRepoLoading = ref(false)


let repoPerLanguageChartData = ref(null)
let repoPerLanguageChartOptions = ref(null)

let starredPerLanguageChartData = ref(null)
let starredPerLanguageChartOptions = ref(null)

let commitsPerRepoChartData = ref(null)
let commitsPerRepoChartOptions = ref(null)

let starredPerRepoChartData = ref(null)
let starredPerRepoChartOptions = ref(null)

let PRPerRepoChartData = ref(null)
let PRPerRepoChartOptions = ref(null)


// Fetch and Set Values for compoenent requirement
async function setdata(name) {

    data.value = await fetchUserData(name);

    repo.value = await fetchUserRepo(name);
    console.log()

    organization.value = await fetchOrganiztion(name);
    if (repo.value.length > 0) {

        languages = await fetchLanguages(repo.value);
        const repoPerLanguage = chartDATA(Array.from(languages.keys()), Array.from(languages.values()));
        repoPerLanguageChartData.value = repoPerLanguage.data;
        repoPerLanguageChartOptions.value = repoPerLanguage.options;
        repoPerLanguageLoading.value = false;

        starred.value = await fetchStarredPerLanguage(repo.value);
        const starredPerLanguage = chartDATA(Array.from(starred.value.keys()), Array.from(starred.value.values()));
        starredPerLanguageChartData.value = starredPerLanguage.data;
        starredPerLanguageChartOptions.value = starredPerLanguage.options;
        starredPerLanguageLoading.value = false;

        commits.value = await fetchCommitsPerRepo(repo.value);
        const commitsPerRepo = chartDATA(Array.from(commits.value.keys()), Array.from(commits.value.values()))
        commitsPerRepoChartData.value = commitsPerRepo.data;
        commitsPerRepoChartOptions.value = commitsPerRepo.options;
        commitsPerRepoLoading.value = false

        starredPerRepo.value = await fetchStarredPerRepo(repo.value);
        const starredPerRepoChart = chartDATA(Array.from(starredPerRepo.value.keys()), Array.from(starredPerRepo.value.values()))
        starredPerRepoChartData.value = starredPerRepoChart.data;
        starredPerRepoChartOptions.value = starredPerRepoChart.options;
        starredPerRepoLoading.value = false

        PRPerRepo.value = await fetchPRPerRepo(repo.value)
        const PRPerRepoChart = chartDATA(Array.from(PRPerRepo.value.keys()), Array.from(PRPerRepo.value.values()))
        PRPerRepoChartData.value = PRPerRepoChart.data;
        PRPerRepoChartOptions.value = PRPerRepoChart.options;
        PRPerRepoLoading.value = false
        console.log(PRPerRepo.value)
    }


}
function handleSearchBtnClick(name) {
    userName.value = name;
    starredPerLanguageLoading.value = true
    commitsPerRepoLoading.value = true
    starredPerRepoLoading.value = true
    repoPerLanguageLoading.value = true
    PRPerRepoLoading.value = true
}

onMounted(() => {
    setdata('BrijMandaliya2013');

});

watch(userName, (newName) => {
    if (newName) {
        setdata(newName)
    }
})

watch([repoPerLanguageChartData, starredPerLanguageChartData], (newrepoPerLanguageChartData, newstarredPerLanguageChartData) => {
    if (newrepoPerLanguageChartData) {

    }
    if (newstarredPerLanguageChartData) {

    }
})





</script>

<template>
    <Header @searchBtnClicked="handleSearchBtnClick" />
    <div class="container-fuild">
        <div class="row justify-content-center m-5">
            <div class="col-12 col-sm-4 col-lg-3 mb-3 mb-sm-0">
                <UserProfile :data="data" />
            </div>
            <div class="col-12 col-md-8 col-lg-9">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-12 col-lg-7 mt-3">
                        <div class="row">
                            <div class="col-6 my-2">
                                <div class="card p-3" style="max-height: 400px;">
                                    <h4 class="card-title">Repo Per Languages</h4>
                                    <div class="card-body">
                                        <div v-if="repoPerLanguageLoading">
                                            <loading />
                                        </div>
                                        <Doughnut v-else-if="languages.size > 0" :data="repoPerLanguageChartData"
                                            :options="repoPerLanguageChartOptions" />
                                        <div v-else>
                                            <noData />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="col-6 my-2">
                                <div class="card p-3" style="max-height: 400px;">
                                    <h4 class="card-title">Starred Per Languages</h4>
                                    <div class="card-body">
                                        <div v-if="starredPerLanguageLoading">
                                            <loading />
                                        </div>
                                        <Doughnut v-else-if="starred.size > 0" :data="starredPerLanguageChartData"
                                            :options="starredPerLanguageChartOptions" />
                                        <div v-else>
                                            <noData />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 my-2">
                                <div class="card p-3" style="max-height: 400px;">
                                    <h4 class="card-title">Commits Per Repo</h4>
                                    <div class="card-body">
                                        <div v-if="commitsPerRepoLoading">
                                            <loading />
                                        </div>
                                        <Doughnut v-else-if="commits.size > 0" :data="commitsPerRepoChartData"
                                            :options="commitsPerRepoChartOptions" />
                                        <div v-else>
                                            <noData />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 my-2">
                                <div class="card p-3" style="max-height: 400px;">
                                    <h4 class="card-title">Star Per Repo</h4>
                                    <div class="card-body">
                                        <div v-if="starredPerRepoLoading">
                                            <loading />
                                        </div>
                                        <Doughnut v-else-if="starredPerRepo.size > 0" :data="starredPerRepoChartData"
                                            :options="starredPerRepoChartOptions" />
                                        <div v-else>
                                            <noData />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 my-2">
                                <div class="card p-3" style="max-height: 400px;">
                                    <h4 class="card-title">PR Per Repo</h4>
                                    <div class="card-body">
                                        <div v-if="PRPerRepoLoading">
                                            <loading />
                                        </div>
                                        <Doughnut v-else-if="PRPerRepo.size > 0" :data="PRPerRepoChartData"
                                            :options="PRPerRepoChartOptions" />
                                        <div v-else>
                                            <noData />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-12 col-lg-5 mt-3">
                        <Repository :data="{ organization, repo }" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    background-color: rgb(55, 58, 74);
    border: none;
    color: white;
}
</style>
