<script setup lang="ts">
import type { SteamPlayerStatsResponse } from '@/types/steam';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    data?: SteamPlayerStatsResponse;
    name?: string;
    right?: boolean;
  }>(),
  { data: undefined, name: 'Total', right: false },
);

const amount = computed(() => props.data?.playerstats.achievements?.filter(({ achieved }) => achieved === 1).length ?? 0);
const total = computed(() => props.data?.playerstats.achievements?.length ?? 0);
</script>

<template>
  <span
    v-if="data"
    :class="['player-total', { right }]"
  >
    {{ name }} : {{ amount }}/{{ total }}
  </span>
</template>

<style scoped>
.player-total {
  font-size: 12px;
  left: 4px;
  position: absolute;
  right: auto;
  top: -2px;
  z-index: 1000;
}

.right {
  left: auto;
  right: calc(100% - var(--image-size) + 4px);
}
</style>
