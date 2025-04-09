export default defineEventHandler(async (event) => {
  const { key, appId, lang, steamId } = getQuery(event);

  return await $fetch(
    'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1'
    + `?key=${key}`
    + `&appid=${appId}`
    + `&steamid=${steamId}`
    + `&l=${lang}`
  );
});
