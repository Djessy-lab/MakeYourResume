<template>
  <div ref="cvContent" id="cvMinimal" class="max-w-3xl mx-auto p-8 font-sans bg-white">
    <header class="border-b border-gray-200 pb-6 mb-8">
      <div class="flex flex-col md:flex-row items-start justify-between">
        <div>
          <h1 class="text-3xl font-light text-gray-900">{{ config.name }}</h1>
          <p class="text-gray-600 mt-1">{{ config.poste }}</p>
        </div>
        <div class="mt-4 md:mt-0">
          <img v-if="config.photo" :src="config.photo" alt="Photo"
            class="w-20 h-20 rounded-md object-cover object-center" />
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
      <main class="md:col-span-8">
        <section class="mb-8">
          <h2 class="inline-block text-sm font-semibold uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-4">
            Objectifs
          </h2>
          <p class="text-gray-700 leading-relaxed">{{ config.objectives }}</p>
        </section>

        <section class="mb-8">
          <h2 class="inline-block text-sm font-semibold uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-6">
            Expérience
          </h2>

          <div class="space-y-8">
            <div v-for="(experience, index) in config.professionalExperience.slice().reverse()" :key="index"
              class="relative pl-6 border-l border-gray-200">
              <div class="absolute left-0 top-0 w-2 h-2 -ml-1 bg-gray-900 rounded-full"></div>

              <div>
                <div class="flex flex-col md:flex-row md:justify-between">
                  <h3 class="text-gray-900 font-medium">{{ experience.title }}</h3>
                  <p class="text-xs text-gray-500 md:text-right mt-1 md:mt-0 font-medium">
                    {{ experience.period.start }} — {{ experience.period.end }}
                  </p>
                </div>

                <ul v-if="experience.description" class="mt-2 text-sm space-y-1 text-gray-600">
                  <li v-for="(line, i) in experience.description.split('\n')" :key="i" class="flex">
                    <span class="mr-2 text-gray-400">›</span>
                    <span>{{ line }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="inline-block text-sm font-semibold uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-6">
            Éducation
          </h2>

          <div class="space-y-6">
            <div v-for="(education, index) in config.education.slice().reverse()" :key="index"
              class="relative pl-6 border-l border-gray-200">
              <div class="absolute left-0 top-0 w-2 h-2 -ml-1 bg-gray-900 rounded-full"></div>

              <div>
                <div class="flex flex-col md:flex-row md:justify-between">
                  <h3 class="text-gray-900 font-medium">{{ education.title }}</h3>
                  <p class="text-xs text-gray-500 md:text-right mt-1 md:mt-0 font-medium">
                    {{ education.period?.start }} — {{ education.period?.end }}
                  </p>
                </div>

                <ul v-if="education.description" class="mt-2 text-sm space-y-1 text-gray-600">
                  <li v-for="(line, i) in education.description.split('\n')" :key="i" class="flex">
                    <span class="mr-2 text-gray-400">›</span>
                    <span>{{ line }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="md:col-span-4 text-sm">
        <section class="mb-8 p-4 bg-gray-50 rounded-md">
          <h2 class="text-sm font-semibold uppercase tracking-wider mb-3">
            Contact
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-4 h-4 mr-2 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                </path>
              </svg>
              <a :href="`tel:${config.contact.phone}`" class="text-gray-700 hover:text-gray-900">{{ config.contact.phone
                }}</a>
            </li>

            <li>
              <div class="flex items-start">
                <svg class="w-4 h-4 mr-2 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
                <a :href="`mailto:${config.contact.email}`" class="text-gray-700 hover:text-gray-900 break-words">{{
                  config.contact.email }}</a>
              </div>
            </li>

            <li class="flex items-start">
              <svg class="w-4 h-4 mr-2 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-gray-700">{{ config.contact.location }}</span>
            </li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-sm font-semibold uppercase tracking-wider mb-3">
            Compétences
          </h2>
          <div class="mb-4">
            <h3 class="text-xs uppercase tracking-wide text-gray-500 mb-2">Techniques</h3>
            <div class="flex flex-wrap gap-1">
              <span v-for="(skill, i) in config.hardSkills" :key="i" class="px-2 py-1 text-xs bg-gray-100 rounded">
                {{ skill }}
              </span>
            </div>
          </div>
          <div>
            <h3 class="text-xs uppercase tracking-wide text-gray-500 mb-2">Interpersonnelles</h3>
            <div class="flex flex-wrap gap-1">
              <span v-for="(skill, i) in config.softSkills" :key="i" class="px-2 py-1 text-xs bg-gray-100 rounded">
                {{ skill }}
              </span>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-sm font-semibold uppercase tracking-wider mb-3">
            Langues
          </h2>
          <div class="space-y-2">
            <div v-for="(language, index) in config.languages" :key="index" class="flex items-center justify-between">
              <span class="text-gray-700">{{ language.name }}</span>
              <div class="w-20 h-1 bg-gray-200 rounded-full">
                <div class="h-full bg-gray-700 rounded-full"
                  :style="{ width: `${getLanguagePercent(language.level)}%` }">
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-sm font-semibold uppercase tracking-wider mb-3">
            Intérêts
          </h2>
          <div class="flex flex-wrap gap-1">
            <span v-for="(interest, index) in config.interests" :key="index"
              class="px-2 py-1 text-xs border border-gray-200 rounded">
              {{ interest }}
            </span>
          </div>
        </section>
      </aside>
    </div>
  </div>

  <div class="fixed bottom-6 right-6 flex gap-4">
    <button
      class="rounded-md shadow-sm hover:shadow hover:bg-gray-50 transition-all duration-200 w-10 h-10 bg-white border border-gray-200 text-gray-500 flex items-center justify-center"
      @click="backHome" title="Return to Home">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
        </path>
      </svg>
    </button>
    <button
      class="rounded-md shadow-sm hover:shadow hover:bg-gray-50 transition-all duration-200 w-10 h-10 bg-white border border-gray-200 text-gray-500 flex items-center justify-center"
      @click="exportPDF" title="Download PDF">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
      </svg>
    </button>
  </div>
</template>

<script>
import { exportPDF } from "../utils/pdfExporter";
export default {
  name: "CVMinimaliste",
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
    getLanguagePercent(level) {
      const levels = {
        'Débutant': 20,
        'Intermédiaire': 40,
        'Avancé': 60,
        'Bilingue': 80,
        'Langue maternelle': 100,
      };
      return levels[level] || 60;
    }
  },
};
</script>

<style>
#cvMinimal {
  font-family: "Inter", sans-serif;
}

@media print {
  #cvMinimal {
    padding: 0;
  }

  button {
    display: none !important;
  }
}
</style>
