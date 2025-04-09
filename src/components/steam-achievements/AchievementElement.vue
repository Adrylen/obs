<script setup lang="ts">
import type { Achievement } from '@/types/achievements';
import AchievementDescription from './AchievementDescription.vue';
import AchievementProgress from './AchievementProgress.vue';
import AchievementTitle from './AchievementTitle.vue';
import AchievementImage from './AchievementImage.vue';

defineProps<{ data: Achievement; visible: boolean; }>();
</script>

<template>
  <div :class="['achievement', { 'achievement--show': visible }]">
    <AchievementImage :data />
    <AchievementProgress :data />
    <AchievementTitle :data />
    <AchievementDescription :data />
  </div>
</template>

<style scoped>
.achievement {
  background-image: url(/images/raw_wood.jpg);
  background-size: var(--image-size);
  background-repeat: no-repeat;
  height: calc(var(--image-size) / 4);
  width: var(--image-size);

  display: grid;
  grid-template:
    "a b" 58px
    "a c" 58px / 116px 348px;

  position: absolute;
  transform: translateY(100%);
  transition: transform 2s ease-in-out;
}

.achievement--show {
  transform: translateY(0%);
}
</style>
