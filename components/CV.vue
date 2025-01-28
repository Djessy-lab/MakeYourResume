<template>
  <div class="flex justify-between">
    <Button :level="4" @click="backHome">Retourner au Dashboard</Button>
    <Button
      @click="exportPDF"
      class="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >Exporter en PDF</Button
    >
  </div>
  <div
    ref="cvContent"
    class="flex max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg"
  >
    <div class="w-1/3 pr-6 border-r border-gray-300">
      <img
        v-if="config.photo"
        :src="config.photo"
        alt="Photo de profil"
        class="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
        style="object-position: center;"
      />
      <h1 class="text-2xl font-bold text-center text-blue-600">
        {{ config.name }}
      </h1>
      <h2 class="text-lg font-semibold text-center mb-4">{{ config.poste }}</h2>
      <h3 class="text-md text-center mb-6">{{ config.experience }}</h3>

      <div class="mb-4">
        <h2 class="text-lg font-semibold">CONTACT</h2>
        <p class="text-md">{{ config.contact.phone }}</p>
        <p class="text-md">{{ config.contact.email }}</p>
        <p class="text-md">{{ config.contact.location }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-lg font-semibold">COMPÉTENCES</h2>
        <p class="text-md">
          Compétences techniques : {{ config.hardSkills.join(", ") }}
        </p>
        <p class="text-md">
          Compétences interpersonnelles : {{ config.softSkills.join(", ") }}
        </p>
      </div>

      <div>
        <h2 class="text-lg font-semibold">INTÉRÊTS</h2>
        <p class="text-md">{{ config.interests }}</p>
      </div>
    </div>

    <div class="w-2/3 pl-6">
      <div class="mb-4">
        <h2 class="text-2xl font-semibold">OBJECTIFS</h2>
        <p class="text-md">{{ config.objectives }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-2xl font-semibold">ÉDUCATION</h2>
        <p class="text-md">{{ config.education }}</p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold">EXPÉRIENCE PROFESSIONNELLE</h2>
        <p class="text-md font-medium">{{ config.professionalExperience }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CV",
  props: {
    config: { type: Object, default: () => ({}) },
    userName: { type: String, default: "" },
  },
  methods: {
    async exportPDF() {
      if (typeof window !== "undefined") {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = this.$refs.cvContent;
        const options = {
          margin: 0,
          filename: `CV_${this.userName.split(" ")[1]}_${
            this.userName.split(" ")[0]
          }_${new Date().toLocaleDateString("fr-FR").replace(/\s/g, "_")}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };
        html2pdf().from(element).set(options).save();
      } else {
        console.error(
          "Cette fonction ne peut être exécutée que dans un environnement de navigateur."
        );
      }
    },
    backHome() {
      this.$router.push("/");
    },
  },
};
</script>
