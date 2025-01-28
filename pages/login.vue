<template>
  <div>
    <h2>Connexion</h2>
    <Button @click="loginWithGoogle">Se connecter avec Google</Button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: '',
    };
  },
  methods: {
    async loginWithGoogle() {
      const { signIn } = useAuth();
      const baseUrl = "http://localhost:3000"
      try {
        await signIn("google", {
          callbackUrl: `${baseUrl}/`,
        });
      } catch (error) {
        console.error("Erreur lors de la connexion avec Google:", error);
      }
    },
  },
};
</script>
