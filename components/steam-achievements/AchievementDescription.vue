<script setup lang="ts">
import type { Achievement } from '@/types/achievements';
import { computed } from 'vue';
import descriptions from "@/assets/data/descriptions.json";

const props = defineProps<{ data: Achievement; }>();

const description = computed(() => props.data.description ?? (
  props.data.id
    ? (descriptions as { [key: string]: string; })[props.data.id]
    : undefined
));
</script>

<template>
  <p :class="[
    'achievement__description',
    {
      'achievement__description--hidden': data.hidden && !data.achieved,
    }
  ]">
    {{ description }}
  </p>
</template>

<style scoped>
.achievement__description {
  grid-area: c;
  margin: 0;
  padding-right: var(--steam-achievements-spacing);
}

.achievement__description--hidden {
  color: transparent;
  text-shadow: 0 0 var(--steam-achievements-shadow-m) white;
  font-weight: bold;
}
</style>
