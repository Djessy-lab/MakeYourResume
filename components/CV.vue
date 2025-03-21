<template>
  <div class="flex justify-between">
    <Button :level="4" @click="backHome">Retourner au Dashboard</Button>
    <Button @click="exportPDF">Exporter en PDF</Button>
  </div>
  <div ref="cvContent" class="flex max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div class="w-1/3 pr-6 border-r border-gray-300">
      <img v-if="config.photo" :src="config.photo" alt="Photo de profil"
        class="rounded-full w-32 h-32 mx-auto mb-4 object-cover" style="object-position: center;" />
      <h1 class="text-2xl font-bold text-center text-blue-600">
        {{ config.name }}
      </h1>
      <h2 class="text-lg font-semibold text-center mb-4">{{ config.poste }}</h2>
      <h3 class="text-md text-center mb-6">{{ config.experience }}</h3>

      <div class="mb-4 flex flex-col">
        <h2 class="text-lg font-semibold">CONTACT</h2>
        <a :href="`tel:${config.contact.phone}`" class="text-md">{{ config.contact.phone }}</a>
        <a :href="`mailto:${config.contact.email}`" class="text-md">{{ config.contact.email }}</a>
        <p class="text-md">{{ config.contact.location }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-lg font-semibold">COMPÉTENCES</h2>
        <p class="text-md">
          <span class="font-bold">Compétences techniques :</span> {{ config.hardSkills.join(", ") }}
        </p>
        <p class="text-md">
          <span class="font-bold">Compétences interpersonnelles :</span> {{ config.softSkills.join(", ") }}
        </p>
      </div>

      <div>
        <h2 class="text-lg font-semibold">INTÉRÊTS</h2>
        <p v-for="(interest, index) in config.interests" :key="index" class="text-md">{{ interest }}</p>
      </div>
    </div>

    <div class="w-2/3 pl-6">
      <div class="mb-4">
        <h2 class="text-2xl font-semibold">OBJECTIFS</h2>
        <p class="text-md">{{ config.objectives }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-2xl font-semibold">ÉDUCATION</h2>
        <p v-for="(education, index) in config.education" :key="index" class="text-md">{{ education }}</p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold">EXPÉRIENCE PROFESSIONNELLE</h2>
        <p v-for="(experience, index) in config.professionalExperience" :key="index" class="text-md font-medium">{{
          experience }}</p>
      </div>
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
