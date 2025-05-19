<script setup lang="ts">
const route = useRoute();
const { title } = useQueryParameters('obs-title', route.query);
</script>

<template>
  <div class="title-block">
    <h1>{{ title || 'Starting soon' }}</h1>
  </div>
</template>

<style scoped>
.title-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:flex-end;
  width: 1920px;
  height: 1080px;
  overflow: hidden;

  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 900;
  font-size: 64px;
}

h1 {
  background-color: #FFF;
  color: transparent;
  text-shadow: 0px 2px 2px #7ca5b8;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;

  animation: zoom-in-out-repeat 30s ease infinite;
}

@keyframes zoom-in-out-repeat {
  0% {
    scale: 100%;
  }

  50% {
    scale: 105%;
  }

  100% {
    scale: 100%;
  }
}
</style>