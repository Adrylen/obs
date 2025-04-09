<script setup lang="ts">
defineProps<{ errors: string[] }>();
</script>

<template>
  <section class="errors">
    <h2>Missing some parameters</h2>
    <ul>
      <li v-if="errors.includes('appId')">
        <strong>appId</strong>: Game ID (<a href="https://steamcommunity.com/discussions/forum/0/4328600953647375080/">How to find it?</a>)
      </li>
      <li v-if="errors.includes('key')">
        <strong>key</strong>: Steam API Key (<a href="https://steamcommunity.com/discussions/forum/1/5077247524960444296/">How to get one?</a>)
      </li>
      <li v-if="errors.includes('steamId')">
        <strong>steamId</strong>: Steam User ID (<a href="https://help.steampowered.com/en/faqs/view/2816-BE67-5B69-0FEC">How to find mine?</a>)
      </li>
    </ul>
  </section>
</template>

<style scoped>
.errors, a {
  color: red;
}
a {
  font-style: italic;
}
</style>
