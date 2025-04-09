<template>
  <div
    ref="cvContent"
    class="max-w-2xl mx-auto p-10 bg-white rounded-3xl shadow-2xl"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <aside class="space-y-8 border-r border-gray-200 pr-6">
        <div class="flex flex-col items-center">
          <img
            v-if="config.photo"
            :src="config.photo"
            alt="Photo de profil"
            class="rounded-full w-32 h-32 object-cover object-center border-4 border-blue-200"
          />
          <div class="text-center mt-4">
            <h1 class="text-xl font-bold text-blue-600">{{ config.name }}</h1>
            <h2 class="text-sm text-gray-700">{{ config.poste }}</h2>
            <p class="text-xs text-gray-500">{{ config.experience }}</p>
          </div>
        </div>

        <section>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>
              <a :href="`tel:${config.contact.phone}`">{{
                config.contact.phone
              }}</a>
            </li>
            <li>
              <a :href="`mailto:${config.contact.email}`">{{
                config.contact.email
              }}</a>
            </li>
            <li>{{ config.contact.location }}</li>
          </ul>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Compétences</h3>
          <div class="text-sm text-gray-600 space-y-2">
            <p>
              <strong class="text-gray-800">Techniques :</strong><br />
              {{ config.hardSkills.join(", ") }}
            </p>
            <p>
              <strong class="text-gray-800">Interpersonnelles :</strong><br />
              {{ config.softSkills.join(", ") }}
            </p>
          </div>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Intérêts</h3>
          <ul class="list-disc list-inside text-sm text-gray-600">
            <li v-for="(interest, index) in config.interests" :key="index">
              {{ interest }}
            </li>
          </ul>
        </section>
      </aside>

      <main class="md:col-span-2 space-y-10">
        <section>
          <h2 class="text-xl font-semibold text-blue-700">Objectifs</h2>
          <p class="text-sm text-gray-700 mt-2">{{ config.objectives }}</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-blue-700">Éducation</h2>
          <div class="space-y-4 mt-2">
            <div
              v-for="(education, index) in config.education.slice().reverse()"
              :key="index"
            >
              <p class="text-sm font-medium text-gray-800">
                {{ education.title }}
                <span class="text-xs text-gray-500"
                  >({{ education.period?.start }} -
                  {{ education.period?.end }})</span
                >
              </p>
              <ul
                v-if="education.description"
                class="list-disc list-inside text-xs text-gray-600"
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
          <h2 class="text-xl font-semibold text-blue-700">
            Expérience professionnelle
          </h2>
          <div class="space-y-4 mt-2">
            <div
              v-for="(experience, index) in config.professionalExperience
                .slice()
                .reverse()"
              :key="index"
            >
              <p class="text-sm font-medium text-gray-800">
                {{ experience.title }}
                <span class="text-xs text-gray-500"
                  >({{ experience.period.start }} -
                  {{ experience.period.end }})</span
                >
              </p>
              <ul
                v-if="experience.description"
                class="list-disc list-inside text-xs text-gray-600"
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
  <div class="sticky bottom-3 p-4">
    <div class="flex justify-between">
      <button
        class="rounded-full shadow-xl hover:shadow-lg hover:translate-y-1 transition-all ease-in-out duration-200 w-16 h-16 bg-green-100"
        @click="backHome"
      >
        <Icon
          name="line-md:home-simple-filled"
          class="w-6 h-6 text-green-800"
        />
      </button>
      <button
        class="rounded-full shadow-xl hover:shadow-lg hover:translate-y-1 transition-all ease-in-out duration-200 w-16 h-16 bg-blue-100"
        @click="exportPDF"
      >
        <Icon name="line-md:downloading-loop" class="w-6 h-6 text-blue-800" />
      </button>
    </div>
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
  },
};
</script>
