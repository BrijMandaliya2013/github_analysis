<template>
    <div ref="lottieContainer" style="width: 300px; height: 300px;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';
import animationData from '@/assets/loading.json';

const lottieContainer = ref(null);

onMounted(() => {
    lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: 'svg',
        autoplay: true,
        animationData: animationData,
    });
});
</script>

<style>
/* Add any necessary styles */
</style>