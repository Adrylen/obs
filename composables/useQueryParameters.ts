import type { LocationQuery } from "vue-router";

const STEAM_ACHIEVEMENTS_DEFAULT_TRANSITION = 10000;

type Overlay = 'steam-achievements' | undefined;

export default function (overlay: Overlay, query: LocationQuery) {
  // All available properties
  const {
    a, appId, appid,
    d, debug,
    k, key,
    l, lang,
    oi, otherId,
    on, otherName,
    s, steamId, steamid,
    t, transition,
  } = query;

  switch(overlay) {
    /* Steam Achievements Overlay */
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
    default:
      return {};
  }
}
