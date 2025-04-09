/* INPUTS */

type AppId = { appId: string };
type Key = { key: string };
type Lang = { lang: string };
type SteamId = { steamId: string };

export type SteamPlayerAchievementsInput = AppId & Key & Lang & SteamId;
export type SteamSchemaForGameInput = AppId & Key & Lang;
export type SteamUserStatsForGameInput = AppId & Key & SteamId;

/* OUTPUTS */

export type SteamGameResponse = {
  game: {
    availableGameStats: {
      achievements: Array<{
        name: string;
        displayName: string;
        hidden: 0 | 1;
        description: string;
        icon: string;
        icongray: string;
      }>;
    };
  };
} | undefined;

export type SteamPlayerStatsResponse = {
  playerstats: {
    achievements?: Array<{
      achieved: 0 | 1;
      apiname: string;
      unlocktime: number;
    }>;
    stats?: Array<{
      name: string;
      value: number;
    }>;
  };
} | undefined;
