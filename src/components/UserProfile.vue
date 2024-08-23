<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
    data: Object
})

const userName = ref(null);
const imgSrc = ref(null);
const userEmail = ref(null);
const userCompany = ref(null)
// let userName = props.data?.login;
// let imgSrc = props.data?.avatar_url;
watch(() => props.data, (newData) => {
    if (newData) {
        userName.value = newData.login;
        imgSrc.value = newData.avatar_url;
        userEmail.value = newData.email;
        userCompany.value = newData.company;
    }
}, { intermediate: true })
</script>

<template>
    <div class="card w-75 p-2">
        <img :src="imgSrc" class="img-thumbnail user-profile w-100 h-auto" alt="" />
        <input type="text" class="form-control mt-2 user-name" :value="userName" disabled>
        <input v-if="userEmail" type="text" class="form-control mt-2 user-name" disabled :value="userEmail">
        <input v-if="userCompany" class="form-control mt-2 user-name" type="text" disabled :value="userCompany"></input>
    </div>
</template>

<style scoped>
.user-profile {
    border-radius: 50%;
}

.card {
    background-color: rgb(55, 58, 74);
    border: none;
    border-top-left-radius: 11rem;
    border-top-right-radius: 11rem;
}

.user-name {
    background-color: rgb(35, 41, 66);
    border-color: black;
    color: whitesmoke;
    border-radius: 20px;
    text-align: center;
}

.user-name:disabled {
    background-color: rgb(35, 41, 66);
}

textarea {
    resize: none;
}
</style>