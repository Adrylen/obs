<script setup lang="ts">
import type { Achievement } from '@/types/achievements';
import type { SteamGameResponse, SteamPlayerStatsResponse } from '@/types/steam';
import { ref, onMounted, computed } from 'vue';
import AchievementTotal from '@/components/achievements/AchievementTotal.vue';
import AchievementParameters from '@/components/achievements/AchievementParameters.vue';
import AchievementElement from '@/components/achievements/AchievementElement.vue';
import { getGameSchema, getPlayerAchievements, getUserGameStats } from '@/api/steam';

const errors = ref<string[]>([]);
const otherId = ref<string | undefined>(undefined);
const otherName = ref<string | undefined>(undefined);

const debug = ref<boolean>(false);
const displayed = ref<number>(0);

const response = ref<SteamPlayerStatsResponse | undefined>(undefined);
const game = ref<SteamGameResponse | undefined>(undefined);
const stats = ref<SteamPlayerStatsResponse | undefined>(undefined);
const otherStats = ref<SteamPlayerStatsResponse | undefined>(undefined);

const loaded = computed(() => !!response.value && !!game.value);

const playerAchievements = computed(() => !loaded.value ? [] : game.value?.game
  .availableGameStats.achievements
  .reduce<Array<Achievement>>((array, achievement) => {
    const { achieved, apiname, unlocktime } = response.value
      ?.playerstats.achievements
      ?.find(({ apiname }) => apiname === achievement.name) ?? {};

    const { value } = stats.value
      ?.playerstats.stats
      ?.find(({ name }) => name === `${achievement.name}_STAT`) ?? {};

    return [
      ...array,
      {
        ...achievement,
        id: apiname,
        achieved: achieved ?? 0,
        unlocktime: unlocktime ?? 0,
        value,
      },
    ];
  }, []) ?? []
);

onMounted(async () => {
  const params = new URLSearchParams(location.search);

  // Mandatory parameters
  const key = params.get('key');
  if (!key) errors.value.push('key');
  const appId = params.get('appId');
  if (!appId) errors.value.push('appId');
  const steamId = params.get('steamId');
  if (!steamId) errors.value.push('steamId');

  if (!key || !appId || !steamId) return;

  // Optional parameters
  const lang = 'french';
  otherId.value = params.get('otherId') ?? undefined;
  otherName.value = params.get('otherName') ?? undefined;
  debug.value = params.get('debug') === "true";

  // API calls
  response.value = await getPlayerAchievements({ appId, key, steamId, lang });
  game.value = await getGameSchema({ appId, key, lang });
  stats.value = await getUserGameStats({ appId, key, steamId });

  if (otherId.value)
    otherStats.value = await getPlayerAchievements({ appId, key, steamId: otherId.value, lang });

  // Loop
  setInterval(() => {
    displayed.value = (displayed.value + 1) % (playerAchievements.value.length || 1);
  }, 3000);
});
</script>

<template>
  <AchievementParameters v-if="errors.length" :errors />
  <section v-if="loaded" class="achievements">
    <AchievementTotal :data="response" />
    <AchievementTotal
      right
      :data="otherStats"
      :name="otherName"
    />
    <AchievementElement
      v-for="(achievement, index) in playerAchievements"
      :key="index"
      :data="achievement"
      :visible="displayed >= index"
    />
  </section>
  <template v-if="debug">
    <details>
      <summary>Player achievements</summary>
      <pre v-if="response">{{ JSON.stringify(response, null, 2) }}</pre>
    </details>
    <details>
      <summary>Player stats</summary>
      <pre v-if="stats">{{ JSON.stringify(stats, null, 2) }}</pre>
    </details>
    <details v-if="otherId">
      <summary>Other player stats</summary>
      <pre v-if="otherStats">{{ JSON.stringify(otherStats, null, 2) }}</pre>
    </details>
    <details>
      <summary>Game data</summary>
      <pre v-if="game">{{ JSON.stringify(game, null, 2) }}</pre>
    </details>
  </template>
</template>

<style>
:root {
  --image-size: 464px;
}
</style>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/fira-sans-extra-condensed');

.achievements {
  color: white;
  font-family: 'Fira Sans Extra Condensed', sans-serif;
  height: 116px;
  overflow: hidden;
  position: relative;
}
</style>
