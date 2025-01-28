<template>
  <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg h-[calc(100vh-6rem)] relative">
    <h2 class="text-2xl font-semibold mb-4 text-center">Création de CV</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6 h-full flex flex-col justify-between">
      <div v-if="currentStep === 1" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Informations personnelles</h3>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Nom du CV:</span>
          <input type="text" v-model="formData.configName" required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Nom:</span>
          <input type="text" v-model="formData.name" required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Poste:</span>
          <input type="text" v-model="formData.poste" required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </label>
        <FileUpload label="Ajouter une photo" @file-selected="handleFileSelected" />
      </div>

      <div v-if="currentStep === 2" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Contact</h3>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Téléphone:</span>
          <input type="text" v-model="formData.contact.phone" required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Email:</span>
          <input type="email" v-model="formData.contact.email" required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Localisation:</span>
          <input type="text" v-model="formData.contact.location" required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </label>
      </div>

      <div v-if="currentStep === 3" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Compétences</h3>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Compétences techniques:</span>
          <div class="flex items-center space-x-2">
            <input type="text" v-model="newHardSkill" placeholder="Ajouter une compétence"
              class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <button @click.prevent="addHardSkill">
              <Icon name="line-md:plus" class="h-5 w-5 items-center" />
            </button>
          </div>
          <ul class="mt-2">
            <li v-for="(skill, index) in formData.hardSkills" :key="index" class="text-gray-600">
              {{ skill }}
            </li>
          </ul>
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Compétences interpersonnelles:</span>
          <div class="flex items-center space-x-2">
            <input type="text" v-model="newSoftSkill" placeholder="Ajouter une compétence"
              class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <button @click.prevent="addSoftSkill">
              <Icon name="line-md:plus" class="h-5 w-5 items-center" />
            </button>
          </div>
          <ul class="mt-2">
            <li v-for="(skill, index) in formData.softSkills" :key="index" class="text-gray-600">
              {{ skill }}
            </li>
          </ul>
        </label>
      </div>

      <div v-if="currentStep === 4" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Intérêts</h3>
        <div class="flex items-center space-x-2">
          <input type="text" v-model="newInterest" placeholder="Ajouter un intérêt"
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          <button @click.prevent="addInterest">
            <Icon name="line-md:plus" class="h-5 w-5 items-center" />
          </button>
        </div>
        <ul class="mt-2">
          <li v-for="(interest, index) in formData.interests" :key="index" class="text-gray-600">
            {{ interest }}
          </li>
        </ul>
      </div>

      <div v-if="currentStep === 5" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Objectifs</h3>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Objectifs:</span>
          <textarea v-model="formData.objectives" required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
        </label>
      </div>

      <div v-if="currentStep === 6" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Éducation</h3>
        <div class="flex items-center space-x-2">
          <input type="text" v-model="newEducation" placeholder="Ajouter une formation"
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          <button @click.prevent="addEducation">
            <Icon name="line-md:plus" class="h-5 w-5 items-center" />
          </button>
        </div>
        <ul class="mt-2">
          <li v-for="(education, index) in formData.education" :key="index" class="text-gray-600">
            {{ education }}
          </li>
        </ul>
      </div>

      <div v-if="currentStep === 7" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Expérience professionnelle</h3>
        <div class="flex items-center space-x-2">
          <input type="text" v-model="newProfessionalExperience" placeholder="Ajouter une expérience"
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          <button @click.prevent="addProfessionalExperience">
            <Icon name="line-md:plus" class="h-5 w-5 items-center" />
          </button>
        </div>
        <ul class="mt-2">
          <li v-for="(experience, index) in formData.professionalExperience" :key="index" class="text-gray-600">
            {{ experience }}
          </li>
        </ul>
      </div>
      <div class="flex justify-between absolute bottom-4 left-4 right-4 mt-4 mb-4">
        <Button v-if="currentStep > 1" @click.prevent="prevStep" label="Précédent" :level="4" />
        <Button v-if="currentStep < 7" @click.prevent="nextStep" label="Suivant" :level="1" class="ml-auto" />
        <Button v-if="currentStep === 7" type="submit" label="Soumettre" :level="1" class="ml-auto" />
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentStep: 1,
      newHardSkill: "",
      newSoftSkill: "",
      newInterest: "",
      newEducation: "",
      newProfessionalExperience: "",
      formData: {
        configName: "",
        photo: null,
        name: "",
        poste: "",
        contact: {
          phone: "",
          email: "",
          location: "",
        },
        hardSkills: [],
        softSkills: [],
        interests: [],
        objectives: "",
        education: [],
        professionalExperience: [],
      },
    };
  },
  props: {
    userId: { type: String, default: "" },
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    prevStep() {
      this.currentStep--;
    },
    addHardSkill() {
      if (this.newHardSkill) {
        this.formData.hardSkills.push(this.newHardSkill.trim());
        this.newHardSkill = "";
      }
    },
    addSoftSkill() {
      if (this.newSoftSkill) {
        this.formData.softSkills.push(this.newSoftSkill.trim());
        this.newSoftSkill = "";
      }
    },
    addInterest() {
      if (this.newInterest) {
        this.formData.interests.push(this.newInterest.trim());
        this.newInterest = "";
      }
    },
    addEducation() {
      if (this.newEducation) {
        this.formData.education.push(this.newEducation.trim());
        this.newEducation = "";
      }
    },
    addProfessionalExperience() {
      if (this.newProfessionalExperience) {
        this.formData.professionalExperience.push(
          this.newProfessionalExperience.trim()
        );
        this.newProfessionalExperience = "";
      }
    },
    handleFileSelected({ file }) {
      this.formData.photo = file;
    },
    async handleSubmit() {
      try {
        const { $supabase } = useNuxtApp();

        if (this.formData.photo) {
          const timestamp = Date.now();
          const cleanedFileName = this.formData.photo.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const uniqueFileName = `${timestamp}_${cleanedFileName}`;

          const { data, error } = await $supabase.storage
            .from('Make-your-resume-bucket')
            .upload(`photosCV/${this.userId}/${uniqueFileName}`, this.formData.photo);

          if (error) throw error;

          const { data: publicUrlData, error: urlError } = $supabase.storage
            .from('Make-your-resume-bucket')
            .getPublicUrl(data.path);

          if (urlError) throw urlError;
          this.formData.photo = publicUrlData.publicUrl; 
        }

        const { data: user, error: fetchError } = await $supabase
          .from("users")
          .select("configs")
          .eq("id", this.userId)
          .single();

        if (fetchError) throw fetchError;

        const updatedConfigs = user.configs
          ? [...user.configs, { ...this.formData }]
          : [{ ...this.formData }];

        const { error: updateError } = await $supabase
          .from("users")
          .update({ configs: updatedConfigs })
          .eq("id", this.userId);

        if (updateError) throw updateError;

        console.log("CV enregistré avec succès");
        this.$router.go("/");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du CV:", error);
      }
    },
  },
};
</script>
