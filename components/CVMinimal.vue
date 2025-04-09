<template>
  <div
    ref="cvContent"
    class="max-w-2xl mx-auto p-10 text-gray-800 text-sm font-sans"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <aside class="space-y-6">
        <div class="text-center">
          <img
            v-if="config.photo"
            :src="config.photo"
            alt="Photo"
            class="w-24 h-24 mx-auto rounded-full object-cover object-center mb-2"
          />
          <h1 class="text-lg font-semibold">{{ config.name }}</h1>
          <p class="uppercase tracking-wide text-xs text-gray-500">
            {{ config.poste }}
          </p>
        </div>

        <section>
          <h2
            class="text-xs font-bold uppercase mb-1 tracking-wider text-gray-500"
          >
            Contact
          </h2>
          <ul class="space-y-1">
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
          <h2
            class="text-xs font-bold uppercase mb-1 tracking-wider text-gray-500"
          >
            Compétences
          </h2>
          <p>
            <span class="font-medium">Techniques:</span>
            {{ config.hardSkills.join(", ") }}
          </p>
          <p>
            <span class="font-medium">Soft Skills:</span>
            {{ config.softSkills.join(", ") }}
          </p>
        </section>

        <section>
          <h2
            class="text-xs font-bold uppercase mb-1 tracking-wider text-gray-500"
          >
            Intérêts
          </h2>
          <ul class="list-disc list-inside">
            <li v-for="(interest, index) in config.interests" :key="index">
              {{ interest }}
            </li>
          </ul>
        </section>
      </aside>

      <main class="md:col-span-2 space-y-8">
        <section>
          <h2
            class="text-xs font-bold uppercase mb-1 tracking-wider text-gray-500"
          >
            Objectifs
          </h2>
          <p class="leading-relaxed">{{ config.objectives }}</p>
        </section>

        <section>
          <h2
            class="text-xs font-bold uppercase mb-1 tracking-wider text-gray-500"
          >
            Éducation
          </h2>
          <div class="divide-y divide-gray-200">
            <div
              v-for="(education, index) in config.education.slice().reverse()"
              :key="index"
              class="py-2"
            >
              <p class="font-medium">{{ education.title }}</p>
              <p class="text-xs text-gray-500">
                {{ education.period?.start }} – {{ education.period?.end }}
              </p>
              <ul
                v-if="education.description"
                class="list-disc list-inside text-xs mt-1 text-gray-600"
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
          <h2
            class="text-xs font-bold uppercase mb-1 tracking-wider text-gray-500"
          >
            Expérience professionnelle
          </h2>
          <div class="divide-y divide-gray-200">
            <div
              v-for="(experience, index) in config.professionalExperience
                .slice()
                .reverse()"
              :key="index"
              class="py-2"
            >
              <p class="font-medium">{{ experience.title }}</p>
              <p class="text-xs text-gray-500">
                {{ experience.period.start }} – {{ experience.period.end }}
              </p>
              <ul
                v-if="experience.description"
                class="list-disc list-inside text-xs mt-1 text-gray-600"
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
  },
};
</script>
