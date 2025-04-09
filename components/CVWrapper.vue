<template>
  <div>
    <component
      :is="currentCVComponent"
      v-bind="propsToPass"
      v-if="currentCVComponent"
    />
    <p v-else class="text-center text-gray-500">
      Veuillez sélectionner un style de CV.
    </p>
  </div>
</template>

<script>
import CVOriginal from "./CVOriginal.vue";
import CVMinimal from "./CVMinimal.vue";
import CVModern from "./CVModern.vue";
import CVPro from "./CVPro.vue";

export default {
  name: "CVWrapper",
  props: {
    selectedStyle: { type: String, required: true },
    config: { type: Object, required: true },
  },
  computed: {
    currentCVComponent() {
      const components = {
        classic: CVOriginal,
        modern: CVModern,
        minimalist: CVMinimal,
        professional: CVPro,
      };
      return components[this.selectedStyle] || null;
    },
    propsToPass() {
      return {
        config: this.config,
      };
    },
  },
};
</script>
