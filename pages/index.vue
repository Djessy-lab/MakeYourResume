<template>
  <div>
    <Dashboard
      :userEmail="userEmail"
      :userConfigs="userConfigs"
      :userName="userName"
      :userId="userId"
      :userImage="userImage"
    />
  </div>
</template>

<script setup>
const { getSession } = useAuth();
const { $supabase } = useNuxtApp();

const userEmail = ref(null);
const userName = ref(null);
const userId = ref(null);
const userImage = ref(null);
const userConfigs = ref([]);

onMounted(async () => {
  try {
    const session = await getSession();
    if (session?.user) {
      console.log("Session récupérée:", session);
      await checkAndSaveUser(session.user);
    } else {
      console.warn("Aucune session trouvée. Redirection vers la page de connexion.");
      navigateTo('/login');
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de session :", error);
  }
});


const checkAndSaveUser = async (user) => {
  try {
    const { data: existingUser, error: fetchError } = await $supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error('Erreur lors de la vérification de l\'utilisateur: ' + fetchError.message);
    }

    if (!existingUser) {
      const { data, error } = await $supabase
        .from('users')
        .insert([
          {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        ]);

      if (error) {
        throw new Error('Erreur lors de l\'enregistrement de l\'utilisateur dans Supabase: ' + error.message);
      }
      console.log("Utilisateur enregistré dans Supabase avec succès:", data);
    }

    userEmail.value = existingUser ? existingUser.email : user.email;
    userName.value = existingUser ? existingUser.name : user.name;
    userId.value = existingUser ? existingUser.id : data[0].id;
    userImage.value = existingUser ? existingUser.image : user.image;
    userConfigs.value = existingUser ? existingUser.configs : [];
  } catch (error) {
    console.error("Erreur lors de la vérification ou de l'enregistrement de l'utilisateur:", error);
  }
};
</script>
