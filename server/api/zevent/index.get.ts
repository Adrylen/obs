export default defineEventHandler(async () => {
  return await $fetch('https://zevent.fr/api/');
});
