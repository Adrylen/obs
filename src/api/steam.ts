import type { SteamGameResponse, SteamPlayerAchievementsInput, SteamPlayerStatsResponse, SteamSchemaForGameInput, SteamUserStatsForGameInput } from "@/types/steam";
import axios from "axios";

const getApi = (url: string, options: { [key: string]: string }) => axios.get(
  `${url}?` + Object
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
      { key, appid: appId, l: lang, steamid: steamId, },
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
      { key, appid: appId, l: lang, },
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
      { key, appid: appId, steamid: steamId, },
    );

    return response.data;
  } catch(error) {
    console.log(error);
    return undefined;
  }
}
