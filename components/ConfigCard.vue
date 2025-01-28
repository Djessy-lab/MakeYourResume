<template>
  <div class="relative group">
    <div class="rounded-lg flex flex-col">
      <OptionsCard v-if="hasOptionsCard" @deleteConfig="deleteConfig" @editConfig="editConfig"
        @exportConfig="exportConfig(config)" />
      <button @click="$emit('openConfig', config)"
        class="hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-lg w-full rounded-lg hover:shadow-md transition-all duration-500 font-prompt dark:brightness-80 hover:brightness-95">
        <p class="dark:text-white font-bold bg-gray-100 dark:bg-gray-800 w-full h-40 flex flex-col justify-center rounded-t-lg">
          {{ config.configName }}
          <span v-if="config.poste" class="text-xs font-normal">({{ config.poste }})</span>
        </p>
        <div class="p-4 border-t dark:border-gray-700 dark:text-white">
          <h2 class="flex">CV : {{ config.configName }}</h2>
          <div class="flex">
            <p class="text-xs">Date de création : {{ formattedCreatedAt }}</p>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "ConfigCard",
  emits: ["openConfig", "deleteConfig", "editConfig", "exportConfig"],
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    hasOptionsCard: { type: Boolean, default: false },
  },
  computed: {
    formattedCreatedAt() {
      return dayjs(this.config.createdAt).format("DD/MM/YYYY");
    },
  },
  methods: {
    deleteConfig() {
      this.$emit('deleteConfig', this.config)
    },
    editConfig() {
      this.$emit('editConfig', this.config)
    },
    exportConfig() {
      this.$emit('exportConfig', this.config);
    }
  }
};
</script>
