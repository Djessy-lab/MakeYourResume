<template>
  <div ref="cvContent" id="cvModern" class="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-2xl min-h-screen">
    <header class="mb-8">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div class="relative">
          <img v-if="config.photo" :src="config.photo" alt="Profile photo"
            class="rounded-full w-28 h-28 object-cover object-center border-4 border-blue-100 shadow-md" />
          <div v-else
            class="rounded-full w-28 h-28 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {{ config.name ? config.name.charAt(0) : 'U' }}
          </div>
        </div>

        <div class="flex-1">
          <h1 class="text-2xl md:text-3xl font-bold text-blue-700">{{ config.name }}</h1>
          <h2 class="text-md font-medium text-gray-700">{{ config.poste }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ config.experience }}</p>

          <div class="mt-3 flex flex-wrap gap-2">
            <a v-if="config.contact.phone" :href="`tel:${config.contact.phone}`"
              class="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors">
              <span class="mr-1">📱</span> {{ config.contact.phone }}
            </a>
            <a v-if="config.contact.email" :href="`mailto:${config.contact.email}`"
              class="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors">
              <span class="mr-1">✉️</span> {{ config.contact.email }}
            </a>
            <span v-if="config.contact.location"
              class="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
              <span class="mr-1">📍</span> {{ config.contact.location }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <aside class="space-y-8">
        <section class="bg-blue-50 p-4 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-blue-700 mb-2 flex items-center">
            <span class="mr-2">🎯</span> Objectifs
          </h3>
          <p class="text-sm text-gray-700">{{ config.objectives }}</p>
        </section>

        <section class="bg-purple-50 p-4 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-purple-700 mb-2 flex items-center">
            <span class="mr-2">💪</span> Compétences
          </h3>
          <div class="text-sm text-gray-600 space-y-3">
            <div>
              <h4 class="text-purple-600 font-medium mb-1">Techniques</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="(skill, i) in config.hardSkills" :key="i"
                  class="px-2 py-1 bg-white rounded-lg text-xs shadow-sm">
                  {{ skill }}
                </span>
              </div>
            </div>
            <div>
              <h4 class="text-purple-600 font-medium mb-1">Interpersonnelles</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="(skill, i) in config.softSkills" :key="i"
                  class="px-2 py-1 bg-white rounded-lg text-xs shadow-sm">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-indigo-50 p-4 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-indigo-700 mb-2 flex items-center">
            <span class="mr-2">🌍</span> Langues
          </h3>
          <div class="space-y-2">
            <div v-for="(language, index) in config.languages" :key="index"
              class="flex justify-between items-center bg-white p-2 rounded-lg">
              <span class="text-sm font-medium text-gray-700">{{ language.name }}</span>
              <div class="flex items-center">
                <div v-for="i in 5" :key="i" :class="['w-2 h-2 rounded-full mx-0.5',
                  getSkillLevel(language.level) >= i ? 'bg-indigo-600' : 'bg-indigo-200']">
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="bg-green-50 p-4 rounded-xl shadow-sm">
          <h3 class="text-lg font-semibold text-green-700 mb-2 flex items-center">
            <span class="mr-2">🌟</span> Intérêts
          </h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(interest, index) in config.interests" :key="index"
              class="px-2 py-1 bg-white rounded-lg text-xs shadow-sm">
              {{ interest }}
            </span>
          </div>
        </section>
      </aside>

      <main class="md:col-span-2 space-y-8">
        <section>
          <h2 class="text-xl font-semibold text-blue-700 pb-2 border-b border-blue-100 mb-4 flex items-center">
            <span class="mr-2">🎓</span> Éducation
          </h2>
          <div class="space-y-4">
            <div v-for="(education, index) in config.education.slice().reverse()" :key="index"
              class="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
              <div class="flex justify-between items-start">
                <h3 class="text-md font-medium text-gray-800">
                  {{ education.title }}
                </h3>
                <span class="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {{ education.period?.start }} - {{ education.period?.end }}
                </span>
              </div>
              <ul v-if="education.description" class="mt-2 space-y-1 text-sm text-gray-600">
                <li v-for="(line, i) in education.description.split('\n')" :key="i" class="flex items-start">
                  <span class="text-blue-400 mr-2">•</span>
                  <span>{{ line }}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-blue-700 pb-2 border-b border-blue-100 mb-4 flex items-center">
            <span class="mr-2">💼</span> Expérience professionnelle
          </h2>
          <div class="space-y-4">
            <div v-for="(experience, index) in config.professionalExperience.slice().reverse()" :key="index"
              class="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
              <div class="flex justify-between items-start flex-wrap gap-2">
                <h3 class="text-md font-medium text-gray-800">
                  {{ experience.title }}
                </h3>
                <span class="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {{ experience.period.start }} - {{ experience.period.end }}
                </span>
              </div>
              <ul v-if="experience.description" class="mt-2 space-y-1 text-sm text-gray-600">
                <li v-for="(line, i) in experience.description.split('\n')" :key="i" class="flex items-start">
                  <span class="text-blue-400 mr-2">•</span>
                  <span>{{ line }}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>

  <div class="fixed bottom-6 right-6 flex flex-col gap-4">
    <button
      class="rounded-full shadow-xl hover:shadow-md hover:scale-105 transition-all duration-200 w-12 h-12 bg-green-500 text-white flex items-center justify-center"
      @click="backHome" title="Return to Home">
      <Icon name="line-md:home-simple" class="w-6 h-6" />
    </button>
    <button
      class="rounded-full shadow-xl hover:shadow-md hover:scale-105 transition-all duration-200 w-12 h-12 bg-blue-500 text-white flex items-center justify-center"
      @click="exportPDF" title="Download PDF">
      <Icon name="line-md:downloading-loop" class="w-6 h-6" />
    </button>
  </div>
</template>

<script>
import { exportPDF } from "../utils/pdfExporter";
export default {
  name: "CV",
  props: {
    config: { type: Object, default: () => ({}) },
    userName: { type: String, default: "" },
  },
  methods: {
    async exportPDF() {
      const element = this.$refs.cvContent;
      await exportPDF(element, this.userName);
    },
    backHome() {
      this.$router.push("/");
    },
    getSkillLevel(level) {
      const levels = {
        'Débutant': 1,
        'Intermédiaire': 2,
        'Avancé': 3,
        'Bilingue': 4,
        'Langue maternelle': 5,
      };
      return levels[level] || 3;
    }
  },
};
</script>

<style>
#cvModern {
  font-family: 'Space Grotesk';
}

img {
  display: inline-block !important;
}

@media print {
  #cvModern {
    box-shadow: none !important;
  }

  button {
    display: none !important;
  }
}
</style>
