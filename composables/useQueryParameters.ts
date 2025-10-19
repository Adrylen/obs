import type { LocationQuery } from "vue-router";

const STEAM_ACHIEVEMENTS_DEFAULT_TRANSITION = 10000;

type Overlay = 
  | 'pokemon-emerald'
  | 'obs-title'
  | 'steam-achievements'
  | 'zevent-cagnotte'
  | undefined;

export default function (overlay: Overlay, query: LocationQuery) {
  // All available properties
  const {
    a, appId, appid,
    b, badges,
    d, debug, delay,
    k, key,
    l, lang,
    oi, otherId,
    on, otherName,
    p1, player1,
    p2, player2,
    s, steamId, steamid,
    t, transition, title,
  } = query;

  switch(overlay) {
    case 'obs-title':
      return {
        title: (title ?? t) as string | undefined,
      };
    case 'pokemon-emerald':
      return {
        badges: Number((badges ?? b) as string | undefined) || 0,
        p1: (player1 ?? p1 ?? "") as string | undefined,
        p2: (player2 ?? p2 ?? "") as string | undefined,
      };
    case 'steam-achievements':
      return {
        appId: (appId ?? appid ?? a) as string | undefined,
        key: (key ?? k) as string | undefined,
        lang: (lang ?? l) as string | undefined,
        steamId: (steamId ?? steamid ?? s) as string | undefined,
        debug: (debug ?? d) === "true" || (debug ?? d) === "1",
        otherId: (otherId ?? oi) as string | undefined,
        otherName: (otherName ?? on) as string | undefined,
        transition: +(transition ?? t ?? 0) || STEAM_ACHIEVEMENTS_DEFAULT_TRANSITION,
      };
    case 'zevent-cagnotte':
      return {
        delay: Number((delay ?? d) as string | undefined) || 0,
      };
    default:
      return {};
  }
}
