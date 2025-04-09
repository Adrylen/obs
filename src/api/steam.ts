import type { SteamGameResponse, SteamPlayerAchievementsInput, SteamPlayerStatsResponse, SteamSchemaForGameInput, SteamUserStatsForGameInput } from "@/types/steam";
import axios from "axios";

const baseUrl = (url: string) =>
  process.env.NODE_ENV === 'production' ? url.replace(/^\/api/g, 'https://api.steampowered.com') : url;

const getApi = (url: string, options: { [key: string]: string }) => axios.get(
  `${baseUrl(url)}?` + Object
    .entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
);

export const getPlayerAchievements = async (
  { appId, lang, key, steamId }: SteamPlayerAchievementsInput
): Promise<SteamPlayerStatsResponse | undefined> => {
  try {
    const response = await getApi(
      '/api/ISteamUserStats/GetPlayerAchievements/v1',
      { key, appId, l: lang, steamId, },
    );

    return response.data;
  } catch(error) {
    console.log(error);
    return undefined;
  }
};

export const getGameSchema = async (
  { appId, lang, key }: SteamSchemaForGameInput
): Promise<SteamGameResponse | undefined> => {
  try {
    const response = await getApi(
      '/api/ISteamUserStats/GetSchemaForGame/v2',
      { key, appId, l: lang, },
    );

    return response.data;
  } catch(error) {
    console.log(error);
    return undefined;
  }
}

export const getUserGameStats = async (
  { appId, key, steamId }: SteamUserStatsForGameInput
): Promise<SteamPlayerStatsResponse | undefined> => {
  try {
    const response = await getApi(
      '/api/ISteamUserStats/GetUserStatsForGame/v2',
      { key, appId, steamId, },
    );

    return response.data;
  } catch(error) {
    console.log(error);
    return undefined;
  }
}
