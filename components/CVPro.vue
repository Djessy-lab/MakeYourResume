<template>
  <div
    ref="cvContent"
    id="cvPro"
    class="max-w-2xl mx-auto p-10 bg-white text-gray-800 font-sans"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <aside class="space-y-8 md:pr-6 border-gray-200 md:border-r">
        <div class="text-center">
          <img
            v-if="config.photo"
            :src="config.photo"
            alt="Photo"
            class="w-28 h-28 mx-auto object-cover mb-3"
          />
          <h1 class="text-xl font-bold">{{ config.name }}</h1>
          <p class="text-sm text-gray-500 font-medium uppercase tracking-wider">
            {{ config.poste }}
          </p>
          <p class="text-xs text-gray-400 mt-1">{{ config.experience }}</p>
        </div>

        <section>
          <h2
            class="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide"
          >
            Contact
          </h2>
          <ul class="space-y-1 text-sm text-gray-700">
            <li>
              <a
                :href="`tel:${config.contact.phone}`"
                class="hover:underline"
                >{{ config.contact.phone }}</a
              >
            </li>
            <li>
              <a
                :href="`mailto:${config.contact.email}`"
                class="hover:underline"
                >{{ config.contact.email }}</a
              >
            </li>
            <li>{{ config.contact.location }}</li>
          </ul>
        </section>

        <section>
          <h2
            class="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide"
          >
            Compétences
          </h2>
          <div class="text-sm text-gray-700 space-y-2">
            <p>
              <span class="font-medium">Techniques:</span>
              {{ config.hardSkills.join(", ") }}
            </p>
            <p>
              <span class="font-medium">Interpersonnelles:</span>
              {{ config.softSkills.join(", ") }}
            </p>
          </div>
        </section>

        <section>
          <h2
            class="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide"
          >
            Centres d'intérêt
          </h2>
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li v-for="(interest, i) in config.interests" :key="i">
              {{ interest }}
            </li>
          </ul>
        </section>
      </aside>

      <main class="md:col-span-2 space-y-10">
        <section>
          <h2 class="text-lg font-semibold uppercase tracking-wide mb-3">
            Objectifs
          </h2>
          <p class="text-sm leading-relaxed text-gray-800">
            {{ config.objectives }}
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold uppercase tracking-wide mb-3">
            Éducation
          </h2>
          <div class="space-y-4">
            <div
              v-for="(education, index) in config.education.slice().reverse()"
              :key="index"
              class="border-b pb-2"
            >
              <div class="flex justify-between items-center">
                <p class="font-medium text-sm">{{ education.title }}</p>
                <span class="text-xs text-gray-500"
                  >{{ education.period?.start }} –
                  {{ education.period?.end }}</span
                >
              </div>
              <ul
                v-if="education.description"
                class="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1"
              >
                <li
                  v-for="(line, i) in education.description.split('\n')"
                  :key="i"
                >
                  {{ line }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-semibold uppercase tracking-wide mb-3">
            Expérience professionnelle
          </h2>
          <div class="space-y-4">
            <div
              v-for="(experience, index) in config.professionalExperience
                .slice()
                .reverse()"
              :key="index"
              class="border-b pb-2"
            >
              <div class="flex justify-between items-center">
                <p class="font-medium text-sm">{{ experience.title }}</p>
                <span class="text-xs text-gray-500"
                  >{{ experience.period.start }} –
                  {{ experience.period.end }}</span
                >
              </div>
              <ul
                v-if="experience.description"
                class="list-disc list-inside text-xs text-gray-600 mt-1 space-y-1"
              >
                <li
                  v-for="(line, i) in experience.description.split('\n')"
                  :key="i"
                >
                  {{ line }}
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
      @click="backHome"
      title="Return to Home"
    >
      <Icon name="line-md:home-simple" class="w-6 h-6" />
    </button>
    <button
      class="rounded-full shadow-xl hover:shadow-md hover:scale-105 transition-all duration-200 w-12 h-12 bg-blue-500 text-white flex items-center justify-center"
      @click="exportPDF"
      title="Download PDF"
    >
      <Icon name="line-md:downloading-loop" class="w-6 h-6" />
    </button>
  </div>
</template>

<script>
import { exportPDF } from "../utils/pdfExporter";

export default {
  name: "CVProfessionnel",
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
  },
};
</script>

<style>
#cvPro {
  font-family: "Newsreader";
}
</style>
