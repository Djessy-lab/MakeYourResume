<template>
  <div class="bg-white dark:bg-gray-800 min-h-screen">
     <CVWrapper :config="config" :selectedStyle="config.style.value" />
  </div>
</template>

<script>
export default {
  name: 'page',
  data() {
    return {
      config: JSON.parse(sessionStorage.getItem('config')) || {}
    };
  },
};
</script>
