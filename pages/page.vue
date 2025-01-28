<template>
  <div class="bg-white dark:bg-gray-800 min-h-screen">
    <CV :userName="userName" :config="config" />
  </div>
</template>

<script>
export default {
  name: 'page',
  data() {
    return {
      userName: this.getUserName(),
      config: JSON.parse(sessionStorage.getItem('config')) || {}
    };
  },
  methods: {
    getUserName() {
      return sessionStorage.getItem('userName') || 'Nom par défaut';
    }
  }
};
</script>
