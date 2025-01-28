import { defineNuxtPlugin } from '#app';
import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.SUPABASE_URL;
  const supabaseKey = config.public.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement SUPABASE_URL et SUPABASE_KEY doivent être définies.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Ajoutez le client Supabase à l'instance Nuxt
  nuxtApp.provide('supabase', supabase);
});
