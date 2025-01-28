export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $supabase } = useNuxtApp();

  const { data: { user }, error } = await $supabase.auth.getUser();

  if (!user) {
    return navigateTo('/login');
  }
});
