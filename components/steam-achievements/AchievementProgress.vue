<script setup lang="ts">
import type { Achievement } from '@/types/achievements';
import { computed } from 'vue';
import maxCount from "@/assets/data/maxCount.json";
import type { Json } from '@/types/utils';

const props = defineProps<{ data: Achievement; }>();

const value = computed(() => props.data.value ?? 0);
const max = computed(() => props.data.id
  ? (maxCount as Json)[props.data.id]
  : undefined
);
</script>

<template>
  <progress
    v-if="max != null"
    class="achievement__progress"
    :max="max"
    :value="value"
  />
</template>

<style scoped>
.achievement__progress {
  position: absolute;
  bottom: 8px;
  left: var(--steam-achievements-spacing);
  width: calc(var(--steam-achievements-image) + 2px);
}
</style>
