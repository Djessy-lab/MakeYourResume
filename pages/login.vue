<template>
  <h1 class="text-6xl font-serif text-center dark:text-white">Make Your Resume</h1>
  <div class="flex justify-center items-center h-screen">
    <div
      class="w-[80%] p-32 rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <h2 class="text-center text-2xl mb-8 font-prompt">Se connecter avec</h2>
      <div class="flex flex-col gap-4">
        <Button @click="loginWithGoogle" :level="4">
          <Icon name="devicon:google" class="h-5 w-5 mr-4 items-center" />
          Google
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});
const { signIn } = useAuth();
const config = useRuntimeConfig();

const loginWithGoogle = async () => {
  const baseUrl = config.public.authOrigin;
  try {
    await signIn("google", {
      callbackUrl: `${baseUrl}/`,
      callGetSession: false
    });
  } catch (error) {
    console.error("Erreur lors de la connexion avec Google:", error);
  }
};
</script>
