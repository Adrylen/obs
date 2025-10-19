export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  if (!id) return undefined;
  return {
    name: (await $fetch<{ names: any }>(`https://pokeapi.co/api/v2/pokemon-species/${id}`))
      .names[4].name,
    sprite: (await $fetch<{ sprites: any }>(`https://pokeapi.co/api/v2/pokemon/${id}`))
      .sprites.versions["generation-iii"].emerald.front_default,
  };
});
