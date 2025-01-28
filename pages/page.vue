<template>
  <div>
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
