<template>
  <div class="bg-white dark:bg-gray-800 min-h-screen">
    <CV :config="config" />
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
