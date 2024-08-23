<script setup>

import { defineEmits, ref } from 'vue';
// Define the emit function
const emit = defineEmits(['searchBtnClicked']);
const userName = ref("BrijMandaliya2013");

const searchBtnClick = () => {
  emit("searchBtnClicked", userName.value);
}

const enterPressed = (event) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    searchBtnClick()
  }
}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light position-sticky">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Github Analysis</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">


        </ul>
        <div class="d-flex w-sm-100 mr-4">
          <input class="form-control me-2 " type="search" placeholder="Search" aria-label="Search"
            @keypress="enterPressed" v-model="userName">
          <button class="btn btn-outline-light rounded" type="button" @click="searchBtnClick">Search</button>
        </div>
      </div>
    </div>
  </nav>

</template>


<style scoped>
.navbar {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: rgb(101, 112, 173);
  height: 100px !important;
}

@media only screen and (max-width: 992px) {
  .navbar {
    height: auto !important;
  }
}
</style>
