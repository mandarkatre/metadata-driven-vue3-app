<template>
  <div id="app">
    <MetadataProcessor />
  </div>
</template>

<script lang="ts" setup>
import MetadataProcessor from "./components/MetadataProcessor.vue";
</script>

<style scoped>
#app {
  max-width: 800px;
  margin: auto;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
