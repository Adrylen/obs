<script setup lang="ts">
import AchievementPage from './components/steam-achievements/AchievementPage.vue';

const params = new URLSearchParams(location.search);
const overlay = params.get('overlay');
</script>

<template>
  <AchievementPage v-if="overlay === 'steam-achievements'" />
  <div v-else>
    Missing overlay: {{ overlay }}
  </div>
</template>

<style scoped>
</style>
