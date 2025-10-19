<script setup lang="ts">
type Pokemon = {
  name: string;
  sprite: string;
};

const route = useRoute();
const { p1, p2 } = useQueryParameters('pokemon-emerald', route.query);

const player1Team = ref<Array<Pokemon | undefined>>(Array.from({ length: 6 }));
const player2Team = ref<Array<Pokemon | undefined>>(Array.from({ length: 6 }));

const loadPokemon = (id?: string) => $fetch<Pokemon | undefined>(`/api/pokeapi/pokemon?id=${id ?? ""}`)

onMounted(async () => {
  const p1Values = p1?.split('-') ?? [];
  const p2Values = p2?.split('-') ?? [];

  player1Team.value = await Promise.all(Array.from({ length: 6 }).map((_,i) => loadPokemon(p1Values.at(i))));
  player2Team.value = await Promise.all(Array.from({ length: 6 }).map((_,i) => loadPokemon(p2Values.at(i))));
});
</script>

<template>
  <div class="background">
    <div class="cam"></div>
    <ul class="teams">
      <li class="player">
        <ul class="team">
          <li v-for="pokemon in player1Team" class="pokemon">
            <p class="pokemon-name">{{ pokemon?.name }}</p>
            <img height="64" width="64" src="https://www.pokepedia.fr/images/a/a0/Sprite_Pok%C3%A9_Ball_face_Smile.png" :style="`opacity: ${pokemon ? '.5' : '1'}`">
            <img v-if="!!pokemon" class="sprite" height="64" width="64" style="right: 0;" :src="pokemon.sprite">
            <img v-if="!!pokemon" class="link" height="32" width="32" src="https://www.emoji.co.uk/files/microsoft-emojis/objects-windows10/9865-link-symbol.png">
          </li>
        </ul>
      </li>
      <li class="player">
        <ul class="team">
          <li v-for="pokemon in player2Team" class="pokemon">
            <img height="64" width="64" src="https://www.pokepedia.fr/images/a/a0/Sprite_Pok%C3%A9_Ball_face_Smile.png" :style="`opacity: ${pokemon ? '.5' : '1'}`">
            <img v-if="!!pokemon" class="sprite" height="64" width="64" :src="pokemon.sprite">
            <p class="pokemon-name">{{ pokemon?.name }}</p>
          </li>
        </ul>
      </li>
    </ul>
    <div class="game"></div>
    <img class="logo" src="https://www.pokebip.com/pages/jeuxvideo/logos/emeraude.png">
    <img class="logo-ball" src="https://www.pokepedia.fr/images/a/a7/Miniature_Faiblo_Ball_LPZA.png?20251015154731">
    <p class="logo-text">20 ans</p>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "Komika";
  src: url(/assets/fonts/KOMIKAX_.ttf);
}
.background {
  position: relative;
  background: linear-gradient(to bottom right, #6e9c6d, #9bd285, #b5ff87);
  height: 1080px;
  width: 1920px;
}
.logo {
  position: absolute;
  right: calc(var(--game-right-full-offset) + var(--game-width) / 4 * 3 - var(--logo-width) / 2);
  scale: 0.8;
}
.logo-ball {
  position: absolute;
  top: 16px;
  right: calc(var(--game-right-full-offset) + var(--game-width) / 2 - var(--logo-ball-width) / 2);
  scale: .5;
}
.logo-text {
  position: absolute;
  top: 32px;
  right: calc(var(--game-right-full-offset) + var(--game-width) / 4 - var(--logo-text-width) / 2);
  font-family: "Komika";
  font-size: 64px;
  color: white;
  text-shadow:
    4px 0 black, -4px 0 black, 0 4px black, 0 -4px black,
    2px 2px black, -2px -2px black, -2px 2px black, 2px -2px black;
}
.cam {
  position: absolute;
  background: linear-gradient(to bottom, #6e9c6d, #d1eab9, #6e906a);
  top: 64px;
  left: 74px;
  height: 286px;
  width: 496px;
}
.cam::after {
  position: absolute;
  content: '';
  background-color: black;
  top: var(--game-border-width);
  right: var(--game-border-width);
  height: 270px;
  width: 480px;
}
.game {
  position: absolute;
  background: linear-gradient(to bottom, #6e9c6d, #d1eab9, #6e906a);
  top: var(--game-top-offset);
  right: var(--game-right-offset);
  height: calc(var(--game-height) + 2 * var(--game-border-width));
  width: calc(var(--game-width) + 2 * var(--game-border-width));
}
.game::after {
  position: absolute;
  content: '';
  background-color: black;
  top: var(--game-border-width);
  right: var(--game-border-width);
  height: var(--game-height);
  width: var(--game-width);
}
.teams, .team {
  margin: 0;
  padding: 0;
}
.player, .pokemon {
  list-style: none;
}
.teams {
  position: absolute;
  display: flex;
  gap: 16px;
  top: 480px;
  left: 58px;
}
.pokemon {
  position: relative;
  background-color: #ccca;
  display: flex;
  justify-content: space-between;
  border-radius: 32px;
  margin-block: 8px;
  width: 256px;
}
.pokemon-name {
  color: white;
  font-size: 24px;
  font-family: Komika;
  text-align: right;
  flex: 1;
  height: fit-content;
  align-self: center;
  padding: 0 8px 8px 8px;
}
.sprite {
  position: absolute;
}
.link {
  position: absolute;
  top: 16px;
  right: -24px;
  z-index: 10;
}
</style>
