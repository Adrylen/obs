export default defineEventHandler(async (event) => {
  const { key, appId, lang, steamId } = getQuery(event);

  return await $fetch(
    'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2'
    + `?key=${key}`
    + `&appid=${appId}`
    + `&l=${lang}`
  );
});
