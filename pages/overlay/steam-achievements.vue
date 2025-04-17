<script setup lang="ts">
import type { Achievement } from '@/types/achievements';
import type { SteamGameResponse, SteamPlayerStatsResponse } from '@/types/steam';
import AchievementTotal from '@/components/steam-achievements/AchievementTotal.vue';
import AchievementElement from '@/components/steam-achievements/AchievementElement.vue';

const route = useRoute();
const {
  appId,
  debug,
  key,
  lang,
  otherId,
  otherName,
  steamId,
  transition,
} = useQueryParameters('steam-achievements', route.query);

const queryParameters = joinQueryParameters({ appId, key, lang, steamId });

const displayed = ref<number>(0);

const game = ref<SteamGameResponse>(undefined);
const playerAchievements = ref<SteamPlayerStatsResponse>(undefined);
const otherAchievements = ref<SteamPlayerStatsResponse>(undefined);
const playerStats = ref<SteamPlayerStatsResponse>(undefined);

const loaded = computed(() => !!playerAchievements.value && !!playerStats.value && !!game.value);

const achievements = computed(() => !loaded.value ? [] : game.value?.game
  .availableGameStats.achievements
  .reduce<Array<Achievement>>((array, achievement) => {
    const { achieved, apiname, unlocktime } = playerAchievements.value
      ?.playerstats.achievements
      ?.find(({ apiname }) => apiname === achievement.name) ?? {};

    const { value } = playerStats.value
      ?.playerstats.stats
      ?.find(({ name }) => name === `${achievement.name}_STAT`) ?? {};

    return [
      ...array,
      {
        ...achievement,
        id: apiname,
        achieved: achieved ?? 0,
        unlockTime: unlocktime ?? 0,
        value,
      },
    ];
  }, []) ?? [],
);

onMounted(() => {
  Promise.all([
    useSteamFetch<SteamGameResponse>(`/api/steam/game/schema?${queryParameters()}`),
    useSteamFetch<SteamPlayerStatsResponse>(`/api/steam/player/achievements?${queryParameters()}`),
    useSteamFetch<SteamPlayerStatsResponse>(`/api/steam/player/stats?${queryParameters()}`),
    ...(!otherId ? [] : [
      useSteamFetch<SteamPlayerStatsResponse>(`/api/steam/player/achievements?${queryParameters({ steamId: otherId })}`)
    ]),
  ]).then(([gameResponse, playerAchievementsResponse, playerStatsResponse, otherAchievementsResponse]) => {
    game.value = gameResponse;
    playerAchievements.value = playerAchievementsResponse;
    playerStats.value = playerStatsResponse;
    otherAchievements.value = otherAchievementsResponse;
  });

  setInterval(() => {
    displayed.value = (displayed.value + 1) % (achievements.value.length || 1);
  }, transition);
});
</script>

<template>
  <section v-if="loaded" class="achievements">
    <AchievementTotal :data="playerAchievements" />
    <AchievementTotal
      right
      :data="otherAchievements"
      :name="otherName"
    />
    <AchievementElement
      v-for="(achievement, index) in achievements"
      :key="index"
      :data="achievement"
      :visible="displayed >= index"
    />
  </section>
  <template v-if="debug">
    <details>
      <summary>Player achievements</summary>
      <pre v-if="playerAchievements">{{ JSON.stringify(playerAchievements, null, 2) }}</pre>
    </details>
    <details>
      <summary>Player stats</summary>
      <pre v-if="playerStats">{{ JSON.stringify(playerStats, null, 2) }}</pre>
    </details>
    <details v-if="otherId">
      <summary>Other player stats</summary>
      <pre v-if="otherAchievements">{{ JSON.stringify(otherAchievements, null, 2) }}</pre>
    </details>
    <details>
      <summary>Game data</summary>
      <pre v-if="game">{{ JSON.stringify(game, null, 2) }}</pre>
    </details>
  </template>
</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/fira-sans-extra-condensed');

.achievements {
  color: white;
  font-family: 'Fira Sans Extra Condensed', sans-serif;
  height: var(--steam-achievements-height);
  overflow: hidden;
  position: relative;
}
</style>
