<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-4 p-4 bg-white rounded shadow-md"
  >
    <div v-for="field in formFields" :key="field.name" class="flex flex-col">
      <label class="font-semibold mb-1">{{ field.label }}</label>
      <input
        v-if="field.type === 'text'"
        v-model="formData[field.name]"
        class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        v-if="field.type === 'textarea'"
        v-model="formData[field.name]"
        class="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
    <button
      type="submit"
      class="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200"
    >
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watchEffect } from "vue";

const props = defineProps<{
  formFields: { label: string; name: string; type: string }[];
  submitAction: string;
}>();

const emit = defineEmits();
const formData = ref({});

// Initialize formData with empty strings for each field
watchEffect(() => {
  formData.value = Object.fromEntries(
    props.formFields.map((field) => [field.name, ""])
  );
});

function handleSubmit() {
  emit("formSubmit", { action: props.submitAction, data: formData.value });
}
</script>
