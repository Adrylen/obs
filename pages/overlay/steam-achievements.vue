<script setup lang="ts">
import type { Achievement } from '@/types/achievements';
import type { SteamGameResponse, SteamPlayerStatsResponse } from '@/types/steam';
import AchievementTotal from '@/components/steam-achievements/AchievementTotal.vue';
import AchievementElement from '@/components/steam-achievements/AchievementElement.vue';

const route = useRoute();

const displayed = ref<number>(0);
const debug = ref<boolean>(route.query.debug === "true");
const otherId = ref(route.query.otherId ?? undefined);
const otherName = ref<string | undefined>(route.query.otherName as string ?? undefined);

const game = ref<SteamGameResponse>(undefined);
const response = ref<SteamPlayerStatsResponse>(undefined);
const stats = ref<SteamPlayerStatsResponse>(undefined);
const otherStats = ref<SteamPlayerStatsResponse>(undefined);

const queryParameters = (override: object = {}) => Object
  .entries({
    appId: route.query.appId ?? route.query.appid,
    key: route.query.key,
    lang: route.query.lang ?? route.query.l,
    steamId: route.query.steamId ?? route.query.steamid,
    ...override,
  })
  .filter(([_, value]) => !!value)
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

const loaded = computed(() => !!response.value && !!stats.value && !!game.value);

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

$fetch<SteamPlayerStatsResponse>(`/api/steam/player/achievements?${queryParameters()}`)
  .then((res) => response.value = res)
  .catch(()=>{});
$fetch<SteamPlayerStatsResponse>(`/api/steam/player/stats?${queryParameters()}`)
  .then((res) => stats.value = res)
  .catch(()=>{});
$fetch<SteamGameResponse>(`/api/steam/game/schema?${queryParameters()}`)
  .then((res) => game.value = res)
  .catch(()=>{});

if (!!otherId) {
  $fetch<SteamPlayerStatsResponse>(`/api/steam/player/achievements?${queryParameters({ steamId: otherId.value })}`)
  .then((res) => otherStats.value = res)
  .catch(()=>{});
}

onMounted(() => {
  setInterval(() => {
    displayed.value = (displayed.value + 1) % (playerAchievements.value.length || 1);
  }, +(route.query.t ?? 0) || 10000);
});
</script>

<template>
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
