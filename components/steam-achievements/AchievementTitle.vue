<script setup lang="ts">
import type { Achievement } from '@/types/achievements';

defineProps<{ data: Achievement; }>();
</script>

<template>
  <h2 :class="[
    'achievement__title',
    {
      'achievement__title--hidden': data.hidden && !data.achieved,
    }
  ]">
    {{ data.displayName }}
  </h2>
</template>

<style scoped>
.achievement__title {
  font-size: 20px;
  grid-area: b;
  margin: 0;
  padding: var(--steam-achievements-spacing) 0 0 0;
  width: 100%;
}

.achievement__title--hidden {
  color: transparent;
  text-shadow: 0 0 var(--steam-achievements-shadow-m) white;
  font-weight: bold;
}
</style>
