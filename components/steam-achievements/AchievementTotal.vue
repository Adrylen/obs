<script setup lang="ts">
import type { SteamPlayerStatsResponse } from '@/types/steam';
import { computed } from 'vue';

const { data, name, right } = withDefaults(
  defineProps<{
    data?: SteamPlayerStatsResponse;
    name?: string;
    right?: boolean;
  }>(),
  { data: undefined, name: 'Total', right: false },
);

const amount = computed(() => data?.playerstats.achievements?.filter(({ achieved }) => achieved === 1).length ?? 0);
const total = computed(() => data?.playerstats.achievements?.length ?? 0);
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
  left: var(--steam-achievements-meta-offset);
  position: absolute;
  right: auto;
  top: -1px;
  z-index: 1000;
}

.right {
  left: auto;
  right: calc(100% - var(--steam-achievements-width) + var(--steam-achievements-meta-offset));
}
</style>
