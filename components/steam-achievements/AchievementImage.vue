<script setup lang="ts">
import type { Achievement } from '@/types/achievements';

defineProps<{ data: Achievement; }>();
</script>

<template>
  <img
    :class="[
      'achievement__image',
      {
        'achievement__image--hidden': data.hidden && data.achieved,
        'achievement__image--todo': !data.achieved,
      }
    ]"
    :src="data.achieved ? data.icon : data.icongray"
  >
</template>

<style scoped>
.achievement__image {
  grid-area: a;
  margin: var(--steam-achievements-spacing);
  border-width: 2px;
  border-style: ridge;
  border-color: white;
  width: var(--steam-achievements-image);
}

.achievement__image--hidden {
  box-shadow: 0 0 var(--steam-achievements-shadow-l) gold;
}

.achievement__image--todo {
  border-color: gray;
}
</style>
