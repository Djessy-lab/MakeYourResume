<template>
  <div class="lg:flex max-lg:w-[100%] min-h-[100vh] sticky top-0 bg-gray-100 dark:bg-gray-900">
    <aside :class="sideBarClasses">
      <ThemeToggle size="sm" />
      <div class="mt-4 w-full" v-if="isSidebarOpen">
        <h2 class="text-lg dark:text-white font-bold mb-4">Votre espace</h2>
        <ul class="space-y-2 flex-1">
          <li>
            <Button @click="toggleConfigsView" :level="6">
              Voir les CV existants
              <Icon name="line-md:watch" class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center" />
            </Button>
          </li>
          <li>
            <Button @click="toggleNewConfigView" :level="6">
              Créer un nouveau CV
              <Icon name="line-md:plus-circle" class="text-blue-600 dark:text-blue-100 h-5 w-5 items-center" />
            </Button>
          </li>
        </ul>
      </div>
      <Button v-if="userEmail && isSidebarOpen" @click="logout" :level="7" class="mt-auto">
        Se déconnecter
        <Icon name="line-md:log-out" class="text-red-600 dark:text-red-100 h-5 w-5 items-center" />
      </Button>
    </aside>
    <button @click="toggleSidebar" class="p-2 rounded-lg absolute z-10" :class="buttonToggleSideBarClasses">
      <Icon :name="iconSideBar" class="text-gray-600 dark:text-gray-200 h-5 w-5" />
    </button>
    <main class="flex-1 p-4 dark:bg-gray-900 overflow-y-auto max-h-[100vh]">
      <div v-if="newConfigView">
        <CVForm :userId="userId" />
      </div>
      <div v-else>
        <div class="w-full flex justify-between">
          <div>
            <h3 class="text-2xl dark:text-white font-prompt">Création de CV</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Connecté en tant que : {{ userEmail }}
            </p>
          </div>
          <div>
            <img v-if="userImage" :src="userImage" class="rounded-full w-10 h-10 mr-4" alt="Avatar" />
          </div>
        </div>
        <div v-if="configsView" class="mt-10">
          <p class="text-gray-600 dark:text-gray-300" v-if="!localUserConfigs.length">
            {{ noConfigMessage }}
          </p>
          <div v-else :class="configsViewClasses">
            <div v-for="(config, index) in localUserConfigs" :key="index">
              <Button @click="openConfig(config)">{{ config.configName }}</Button>
              <Button :level="2" @click="askDeleteConfig(config)">Supprimer</Button>
            </div>
          </div>
        </div>
      </div>
      <Modal v-if="showConfirmDialog" :modelValue="showConfirmDialog" @update:modelValue="showConfirmDialog = false"
        title="Confirmer la suppression" content="Êtes-vous sûr de vouloir supprimer ce CV ?" :buttons="buttonsModal" />
    </main>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  props: {
    userEmail: { type: String, default: '' },
    userName: { type: String, default: '' },
    userId: { type: String, default: '' },
    userImage: { type: String, default: '' },
    userConfigs: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentConfig: null,
      configsView: true,
      editConfigView: false,
      newConfigView: false,
      isSidebarOpen: true,
      noConfigMessage: "Vous n'avez pas encore de CV, créez-en un en quelques clics !",
      showConfirmDialog: false,
      localUserConfigs: [...this.userConfigs],
      buttonsModal: [
        {
          text: "Supprimer",
          type: "delete",
          click: () => this.deleteConfig(this.currentConfig),
        },
        {
          text: "Annuler",
          type: "cancel",
          click: () => (this.showConfirmDialog = false),
        },
      ],
      toast: {
        title: "",
        message: "",
        type: "",
      },
      isToastVisible: false,
      config: {
        configName: 'CV1',
        name: 'Djessy Coiffé',
        poste: 'Développeur - Front-end',
        experience: 'Plus de 12 ans d\'expérience',
        contact: {
          phone: '+336 74 11 36 35',
          email: 'adrien.mercier@gmail.com',
          location: 'Basé à Paris (75), France'
        },
        hardSkills: ['Microsoft Office', 'ACT! CRM (SAGE)', 'SalesForce.com'],
        softSkills: ['Communication', 'Travail d\'équipe', 'Résolution de problèmes'],
        interests: ['Fitness', 'Voyage', 'Théâtre'],
        objectives: 'À la recherche d\'un nouveau défi pour améliorer mes compétences.',
        education: 'Master en Marketing et Gestion des Affaires, ÉCOLE XXX (2008)',
        professionalExperience: 'Ingénieur d\'affaires France/Europe du Sud, Société XXX | Paris, 01/2015-Présent'
      }
    };
  },
  watch: {
    userConfigs(newConfigs) {
      this.localUserConfigs = [...newConfigs];
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
    const toastData = localStorage.getItem("toastData");
    if (toastData) {
      const parsedToast = JSON.parse(toastData);
      this.toast = { ...parsedToast };
      this.isToastVisible = true;
      if (this.toast.type === 'success') {
        this.triggerConfetti();
      }
      localStorage.removeItem("toastData");
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  computed: {
    iconSideBar() {
      return this.isSidebarOpen
        ? "line-md:menu-to-close-alt-transition"
        : "line-md:close-to-menu-transition";
    },
    buttonToggleSideBarClasses() {
      return `transform transition-transform duration-500 left-auto mt-2 ${this.isSidebarOpen
        ? "translate-x-52 max-lg:absolute max-lg:top-0 max-lg:right-52 "
        : "translate-x-0 max-lg:absolute max-lg:top-0 max-lg:right-2"
        }`;
    },
    sideBarClasses() {
      return `bg-gray-200 dark:bg-gray-800 p-4 shadow-lg relative flex flex-col items-start transform transition-all duration-500 overflow-hidden ${this.isSidebarOpen
        ? "translate-x-0 w-64 max-lg:w-full max-lg:translate-y-0 opacity-100"
        : "translate-x-full w-0 max-lg:-translate-y-full opacity-0"
        }`;
    },
    configsViewClasses() {
      return `grid gap-8 max-lg:grid-cols-1 ${this.isSidebarOpen ? "grid-cols-3" : "grid-cols-4"
        }`;
    },
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === "Escape" && this.showConfirmDialog) {
        this.showConfirmDialog = false;
      }
    },
    async updateConfig(configName) {

    },
    async logout() {

    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleConfigsView() {
      this.configsView = true;
      this.newConfigView = false;
      this.editConfigView = false;
    },
    toggleNewConfigView() {
      this.newConfigView = true;
      this.configsView = false;
      this.editConfigView = false;
    },
    openConfig(config) {
      sessionStorage.setItem('userName', this.userName);
      sessionStorage.setItem('config', JSON.stringify(config));
      this.$router.push({
        path: "/page",
      });
    },
    askDeleteConfig(config) {
      this.currentConfig = config;
      this.showConfirmDialog = true;
    },
    editConfig(config) {
      // this.currentConfig = config;
      // this.editConfigView = true;
      // this.configsView = false;
    },
    async deleteConfig(config) {
      try {
        const { $supabase } = useNuxtApp();
        const updatedConfigs = this.localUserConfigs.filter(c => c !== config);
        const { error } = await $supabase
          .from('users')
          .update({ configs: updatedConfigs })
          .eq('id', this.userId);

        if (error) throw error;
        this.localUserConfigs = [...updatedConfigs];
        this.showConfirmDialog = false;
        console.log('Configuration supprimée avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de la configuration:', error);
      }
    },
    async exportConfig(config) {

    },
    triggerConfetti() {
      const colors = ["#bb0000", "#0000ee", "#f9ff33"];
      const end = Date.now() + 1.5 * 1000;
      function frame() {
        useConfetti({
          particleCount: 3,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
          colors: colors,
        });
        useConfetti({
          particleCount: 3,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    },
  },
};
</script>
