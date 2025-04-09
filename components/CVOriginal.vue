<template>
  <div
    ref="cvContent"
    class="flex max-w-2xl mx-auto p-8 py-10 bg-white shadow-lg rounded-lg"
  >
    <div class="w-1/3 pr-6 border-r border-gray-300">
      <img
        v-if="config.photo"
        :src="config.photo"
        alt="Photo de profil"
        class="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
        style="object-position: center"
      />
      <h1 class="text-2xl font-bold text-center text-blue-600">
        {{ config.name }}
      </h1>
      <h2 class="text-lg font-semibold text-center mb-4">{{ config.poste }}</h2>
      <h3 class="text-md text-center mb-6">{{ config.experience }}</h3>

      <div class="mb-4 flex flex-col">
        <h2 class="text-lg font-semibold">CONTACT</h2>
        <a :href="`tel:${config.contact.phone}`" class="text-md">{{
          config.contact.phone
        }}</a>
        <a :href="`mailto:${config.contact.email}`" class="text-md">{{
          config.contact.email
        }}</a>
        <p class="text-md">{{ config.contact.location }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-lg font-semibold">COMPÉTENCES</h2>
        <p class="text-md">
          <span class="font-bold">Compétences techniques :</span><br />
          {{ config.hardSkills.join(", ") }}
        </p>
        <p class="text-md">
          <span class="font-bold">Compétences interpersonnelles :</span><br />
          {{ config.softSkills.join(", ") }}
        </p>
      </div>

      <div>
        <h2 class="text-lg font-semibold">INTÉRÊTS</h2>
        <p
          v-for="(interest, index) in config.interests"
          :key="index"
          class="text-md"
        >
          {{ interest }}
        </p>
      </div>
    </div>

    <div class="w-2/3 pl-6">
      <div class="mb-4">
        <h2 class="text-2xl font-semibold">OBJECTIFS</h2>
        <p class="text-md">{{ config.objectives }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-2xl font-semibold">ÉDUCATION</h2>
        <div
          v-for="(education, index) in config.education.slice().reverse()"
          :key="index"
        >
          <p class="text-md">
            {{ education.title }}
            <span class="text-xs"
              >({{ education.period?.start }}-{{ education.period?.end }})</span
            >
          </p>
          <ul>
            <li
              v-if="education.description"
              v-for="(line, index) in education.description.split('\n')"
              :key="index"
              class="text-xs font-thin"
            >
              {{ line }}
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-semibold">EXPÉRIENCE PROFESSIONNELLE</h2>
        <div
          v-for="(experience, index) in config.professionalExperience
            .slice()
            .reverse()"
          :key="index"
        >
          <p class="text-md font-medium">
            {{ experience.title }}
            <span class="text-xs"
              >({{ experience.period.start }}-{{ experience.period.end }})</span
            >
          </p>
          <ul>
            <li
              v-if="experience.description"
              v-for="(line, index) in experience.description.split('\n')"
              :key="index"
              class="text-xs text-gray-500"
            >
              {{ line }}
            </li>
          </ul>
        </div>
      </div>
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
