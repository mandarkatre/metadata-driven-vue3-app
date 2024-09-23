<template>
  <h1 class="text-2xl font-bold text-center text-blue-600">{{ text }}</h1>
</template>

<script lang="ts" setup>
defineProps<{
  text: string;
}>();
</script>

<style scoped>
</style>
