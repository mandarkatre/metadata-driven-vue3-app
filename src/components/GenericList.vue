<template>
  <div class="max-h-screen overflow-y-auto">
    <ul class="space-y-4">
      <li
        v-for="item in items"
        :key="item.id"
        class="p-4 bg-gray-100 rounded shadow"
      >
        <div v-for="(value, key) in item" :key="key" class="mb-1">
          <strong class="text-blue-600">{{ displayKey(key) }}:</strong>
          {{ value }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  dataFetch: string;
}>();

const store = useStore();
const items = ref([]);

// Function to fetch items from the initial source
async function fetchItems() {
  const response = await fetch(props.dataFetch);
  const data = await response.json();
  items.value = data.items; // Matches the JSON structure
  store.commit("setItems", items.value); // Store initial items in Vuex
}

// Computed property to get items from Vuex store
const itemsFromStore = computed(() => store.getters.getItems);

// Watch for changes in the store items to update local items
watchEffect(() => {
  items.value = itemsFromStore.value;
});

// Fetch initial items when the component mounts
onMounted(async () => {
  await fetchItems();
});

// Function to format the key for display
function displayKey(key: string) {
  const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
  return formattedKey.replace(/_/g, " "); // Replace underscores with spaces
}
</script>
