<template>
  <div>
    <component
      v-for="(component, index) in metadata.components"
      :key="index"
      :is="getComponentType(component.type)"
      v-bind="component.props"
      @formSubmit="handleFormSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import GenericForm from "./GenericForm.vue";
import GenericList from "./GenericList.vue";
import Heading from "./Heading.vue";

// Initialize the store
const store = useStore();

const metadata = ref({ components: [] }) as any;

onMounted(async () => {
  const response = await fetch("/metadata.json");
  metadata.value = await response.json();
});

const componentMap = {
  Heading,
  GenericForm,
  GenericList,
};


/**
 * Returns the Vue component type for the given type string.
 *
 * @param type { 'Heading' | 'GenericForm' | 'GenericList' | 'input' | 'textarea' } - The type of the component.
 * @returns { string | typeof GenericForm | typeof GenericList | typeof Heading } - The component type.
 */
 function getComponentType(type: string): string | typeof GenericForm | typeof GenericList | typeof Heading | null {
  // Define a list of standard HTML elements
  const standardHtmlElements = [
    'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a',
    'img', 'button', 'input', 'textarea', 'select', 'option',
    'section', 'article', 'nav', 'footer', 'header', 'main',
    'ul', 'ol', 'li'
  ];

  // Check if the type is a standard HTML element
  if (standardHtmlElements.includes(type)) {
    return type; // Return the type directly for standard elements
  }

  // Check if the type corresponds to a custom component
  return componentMap[type as keyof typeof componentMap] || null;
}

/**
 * Handles form submission by dispatching the appropriate Vuex action.
 *
 * @param { { action: string, data: Record<string, unknown> } } payload - Contains the action name and form data.
 */
function handleFormSubmit(payload: { action: string, data: Record<string, unknown> }): void {
  store.dispatch(payload.action, payload.data);
}
</script>
