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
  margin-block: 24px;
  margin-inline: 24px;
  border-width: 2px;
  border-style: ridge;
  border-color: white;
}

.achievement__image--hidden {
  box-shadow: 0 0 12px gold;
}

.achievement__image--todo {
  border-color: gray;
}
</style>
