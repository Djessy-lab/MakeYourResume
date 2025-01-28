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

<script>
export default {
    name: 'index',
    data() {
        return {
            userEmail: null,
            userName: null,
            userId: null,
            userImage: null,
            userConfigs: []
        };
    },
    async mounted() {
        const { getSession } = useAuth();
        try {
            const session = await getSession();
            console.log("Données utilisateur :", session.user);

            await this.checkAndSaveUser(session.user);
        } catch (error) {
            console.error("Erreur lors du callback :", error);
        }
    },
    methods: {
        async checkAndSaveUser(user) {
            try {
                const { $supabase } = useNuxtApp();

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
                } else {
                    console.log("L'utilisateur existe déjà dans la base de données.");
                }

                this.userEmail = existingUser ? existingUser.email : user.email;
                this.userName = existingUser ? existingUser.name : user.name;
                this.userId = existingUser ? existingUser.id : data[0].id;
                this.userImage = existingUser ? existingUser.image : user.image;
                this.userConfigs = existingUser ? existingUser.configs : [];

            } catch (error) {
                console.error("Erreur lors de la vérification ou de l'enregistrement de l'utilisateur:", error);
            }
        },
    }
};
</script>
