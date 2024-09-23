# Metadata Processor Application

The `metadata.json` file serves as a template to render the UI components dynamically. The `MetadataProcessor.vue` component reads `metadata.json` and selects components to render based on the specified type. 

## Dynamic Rendering Logic

- **Standard HTML Controls**: If the type corresponds to a standard HTML control (e.g., `input`, `textarea`), it will be rendered as-is using Vue's built-in capabilities.
- **Custom Components**: For custom components, which are also generic, `MetadataProcessor.vue` dynamically imports and renders them as specified in the metadata.

Data is passed from the processor to the child components, along with actions that are propagated back up. This allows integration with Vuex for state management and updates.

## Examples

### Example 1: Current Code Structure

This example shows the structure of the existing metadata:

```json
{
  "components": [
    {
      "type": "Heading",
      "props": {
        "text": "Recipe List"
      }
    },
    {
      "type": "GenericForm",
      "props": {
        "formFields": [
          { "label": "Recipe Name", "name": "recipeName", "type": "text" },
          { "label": "Ingredients", "name": "ingredients", "type": "textarea" }
        ],
        "submitAction": "submitRecipe"
      }
    },
    {
      "type": "GenericList",
      "props": {
        "dataFetch": "/api/recipes"
      }
    }
  ]
}
```

### Example 2: Adding a Standard HTML Control

When adding a standard HTML control, such as an input field, it can be included in metadata.json like this:

```json
{
  "type": "input",
  "props": {
    "value": "This is a text input",
    "placeholder": "Type something...",
    "class": "border p-2 rounded"
  }
}
```


## What Could Go Wrong (WCGW)

1. Centralized dependency : If metadata.json or actual server call to load metadata fails, entire application UI will be affected.

2. Tedious store management: If the dispatched functions are not propaged properly or missing in metadata, debugging can get difficult.

3. Performance: Performance with dynamic component load can have FCP and LCP higher values, and it can take a longer time for SPA, but should be fine for nuxt - ssr based app

4. Runtime errors: Dynamic components, if something goes wrong can give more runtime errors, which are not easy to figure out during development time by compilers. A sophisticated custom compiler should be built for this.

5. Backward compatibility: If metadata schema keeps changing, and existing app is in prod, it can be a mess to maintain backward compatibility

6. Validations: Metadata can even include validation rules, that would get applied dynamically, but integrations with validation libraries like vuelidate need to be checked if UI is dynamic.

7. Documentation: A guide to how app or processor works and its latest state should be well documented, else, it can cause confusion.



