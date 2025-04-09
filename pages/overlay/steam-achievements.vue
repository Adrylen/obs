<script setup lang="ts">
import type { AsyncData } from '#app';
import type { Achievement } from '@/types/achievements';
import type { SteamGameResponse, SteamPlayerStatsResponse, SteamSchemaForGameInput } from '@/types/steam';
import AchievementTotal from '@/components/steam-achievements/AchievementTotal.vue';
import AchievementElement from '@/components/steam-achievements/AchievementElement.vue';

const route = useRoute();

const displayed = ref<number>(0);
const debug = ref<boolean>(route.query.debug === "true");
const otherId = ref(route.query.otherId ?? undefined);
const otherName = ref<string | undefined>(route.query.otherName as string ?? undefined);

const queryParameters = (override: object = {}) => Object
  .entries({
    appId: route.query.appId ?? route.query.appid,
    key: route.query.key,
    l: route.query.lang ?? route.query.l,
    steamId: route.query.steamId ?? route.query.steamid,
    ...override,
  })
  .filter(([_, value]) => !!value)
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

const loaded = computed(() => !!player?.value && !!stats.value && !!game.value);

const playerAchievements = computed(() => !loaded.value ? [] : game.value?.game
  .availableGameStats.achievements
  .reduce<Array<Achievement>>((array, achievement) => {
    const { achieved, apiname, unlocktime } = player.value
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

const { data: player } = await useFetch(
  `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1?${queryParameters()}`,
  { lazy: true, method: 'GET', },
) as AsyncData<SteamPlayerStatsResponse | undefined, FetchEvent>;

const { data: stats } = await useFetch(
  `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2?${queryParameters()}`,
  { lazy: true, method: 'GET', },
) as AsyncData<SteamPlayerStatsResponse | undefined, FetchEvent>;

const { data: game } = await useFetch(
  `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2?${queryParameters()}`,
  { lazy: true, method: 'GET', },
) as AsyncData<SteamGameResponse | undefined, FetchEvent>;

let otherPlayer = ref<SteamPlayerStatsResponse | undefined>(undefined);
if (!!otherId) {
  const { data } = await useFetch(
    `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1?${queryParameters({ steamId: otherId })}`,
    { lazy: true, method: 'GET', },
  ) as AsyncData<SteamPlayerStatsResponse | undefined, FetchEvent>;

  otherPlayer = data;
}

onMounted(() => {
  setInterval(() => {
    displayed.value = (displayed.value + 1) % (playerAchievements.value.length || 1);
  }, 3000);
});
</script>

<template>
  <section v-if="loaded" class="achievements">
    <AchievementTotal :data="player" />
    <AchievementTotal
      right
      :data="otherPlayer"
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
      <pre v-if="player">{{ JSON.stringify(player, null, 2) }}</pre>
    </details>
    <details>
      <summary>Player stats</summary>
      <pre v-if="stats">{{ JSON.stringify(stats, null, 2) }}</pre>
    </details>
    <details v-if="otherId">
      <summary>Other player stats</summary>
      <pre v-if="otherPlayer">{{ JSON.stringify(otherPlayer, null, 2) }}</pre>
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
