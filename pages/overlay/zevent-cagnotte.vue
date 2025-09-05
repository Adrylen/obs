<script setup lang="ts">
const route = useRoute();
const { delay } = useQueryParameters('zevent-cagnotte', route.query);

type Zevent = { donationAmount?: { formatted?: string; } };
let data = ref<Zevent>({});

onMounted(async () => {
  data.value = await $fetch<Zevent>('/api/zevent');
  setInterval(async () => {
    data.value = await $fetch<Zevent>('/api/zevent');
  }, delay || 60*1000);
});
</script>

<template>
  <p class="text">
    ZEVENT 2025 - {{ data?.donationAmount?.formatted ?? "0.00 €" }}
  </p>
</template>

<style scoped>
@font-face {
  font-family: "Komika";
  src: url(/assets/fonts/KOMIKAX_.ttf);
}

.text {
  font-family: "Komika";
  color: #00bd00;
  font-size: 64px;
}
</style>
