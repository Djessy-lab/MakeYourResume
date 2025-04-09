<template>
  <div
    class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg h-[calc(100vh-6rem)] relative"
  >
    <h2 class="text-2xl font-semibold mb-4 text-center">Création de CV</h2>
    <form
      @submit.prevent="handleSubmit"
      class="space-y-6 h-full flex flex-col justify-between"
    >
      <div v-if="currentStep === 1" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Qui êtes-vous ?</h3>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Nom du CV:</span>
          <input
            type="text"
            v-model="formData.configName"
            required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Nom:</span>
          <input
            type="text"
            v-model="formData.name"
            required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Poste:</span>
          <input
            type="text"
            v-model="formData.poste"
            required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
        <FileUpload
          label="Ajouter une photo"
          @file-selected="handleFileSelected"
        />
      </div>

      <div v-if="currentStep === 2" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Comment vous contacter ?</h3>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Téléphone:</span>
          <input
            type="text"
            v-model="formData.contact.phone"
            required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Email:</span>
          <input
            type="email"
            v-model="formData.contact.email"
            required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Localisation:</span>
          <input
            type="text"
            v-model="formData.contact.location"
            required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
      </div>

      <div v-if="currentStep === 3" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Présentez vous !</h3>
        <label class="block">
          <span class="text-gray-700 dark:text-white">Présentation :</span>
          <textarea
            v-model="formData.objectives"
            required
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </label>
      </div>

      <div v-if="currentStep === 4" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Quelles sont vos compétences ?</h3>
        <label class="block">
          <span class="text-gray-700 dark:text-white"
            >Compétences techniques:</span
          >
          <div class="flex items-center space-x-2">
            <input
              type="text"
              v-model="newHardSkill"
              placeholder="Ajouter une compétence"
              class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <button @click.prevent="addHardSkill">
              <Icon name="line-md:plus" class="h-5 w-5 items-center" />
            </button>
          </div>
          <ul class="mt-2">
            <li
              v-for="(skill, index) in formData.hardSkills"
              :key="index"
              class="text-gray-600"
            >
              {{ skill }}
            </li>
          </ul>
        </label>
        <label class="block">
          <span class="text-gray-700 dark:text-white"
            >Compétences interpersonnelles:</span
          >
          <div class="flex items-center space-x-2">
            <input
              type="text"
              v-model="newSoftSkill"
              placeholder="Ajouter une compétence"
              class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <button @click.prevent="addSoftSkill">
              <Icon name="line-md:plus" class="h-5 w-5 items-center" />
            </button>
          </div>
          <ul class="mt-2">
            <li
              v-for="(skill, index) in formData.softSkills"
              :key="index"
              class="text-gray-600"
            >
              {{ skill }}
            </li>
          </ul>
        </label>
      </div>

      <div v-if="currentStep === 5" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Quels sont vos centre d'intérêts ?</h3>
        <div class="flex items-center space-x-2">
          <input
            type="text"
            v-model="newInterest"
            placeholder="Ajouter un intérêt"
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <button @click.prevent="addInterest">
            <Icon name="line-md:plus" class="h-5 w-5 items-center" />
          </button>
        </div>
        <ul class="mt-2">
          <li
            v-for="(interest, index) in formData.interests"
            :key="index"
            class="text-gray-600"
          >
            {{ interest }}
          </li>
        </ul>
      </div>

      <div v-if="currentStep === 6" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">Au niveau de l'école ?</h3>
        <div class="flex items-center space-x-2">
          <input
            type="text"
            v-model="newEducation.title"
            placeholder="Ajouter une formation"
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div class="flex items-center space-x-2 mt-2">
          <textarea
            v-model="newEducation.description"
            placeholder="Ajouter une description"
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div class="flex items-center space-x-2 mt-2">
          <input
            type="text"
            v-model="newEducation.period.start"
            placeholder="Année de début"
            class="mt-1 block w-1/2 border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <input
            type="text"
            v-model="newEducation.period.end"
            placeholder="Année de fin"
            class="mt-1 block w-1/2 border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button @click.prevent="addEducation">
          <Icon name="line-md:plus" class="h-5 w-5 items-center" />
        </button>
        <div class="h-[35%] overflow-auto">
          <draggable
            v-if="formData.education.length"
            :list="formData.education"
            group="education"
            class="space-y-2"
            item-key="title"
          >
            <template #item="{ element, index }">
              <div
                v-if="element && element.title"
                class="border shadow rounded-lg p-1 w-[95%] dark:border-none dark:bg-gray-900 dark:text-gray-200 mb-2 relative cursor-move bg-white"
              >
                <button @click.prevent="removeEducation(index)">
                  <Icon
                    name="line-md:close"
                    class="h-5 w-5 absolute top-2 right-2"
                  />
                </button>
                <strong>{{ element.title }}</strong>
                <p>{{ element.description }}</p>
                <p class="text-sm text-gray-500">
                  {{ element.period.start }} - {{ element.period.end }}
                </p>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <div v-if="currentStep === 7" class="space-y-4 flex-grow">
        <h3 class="text-lg font-medium">
          Et pour finir les expériences professionnelles
        </h3>
        <div class="flex items-center space-x-2">
          <input
            type="text"
            v-model="newProfessionalExperience.title"
            placeholder="Ajouter une expérience"
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div class="flex items-center space-x-2 mt-2">
          <textarea
            v-model="newProfessionalExperience.description"
            placeholder="Ajouter une description"
            class="mt-1 block w-full border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div class="flex items-center space-x-2 mt-2">
          <input
            type="text"
            v-model="newProfessionalExperience.period.start"
            placeholder="Année de début"
            class="mt-1 block w-1/2 border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <input
            type="text"
            v-model="newProfessionalExperience.period.end"
            placeholder="Année de fin"
            class="mt-1 block w-1/2 border-gray-300 bg-gray-100 dark:bg-gray-700 p-1 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button @click.prevent="addProfessionalExperience">
          <Icon name="line-md:plus" class="h-5 w-5 items-center" />
        </button>
        <div class="h-[35%] overflow-auto">
          <draggable
            v-if="formData.professionalExperience.length"
            :list="formData.professionalExperience"
            group="professionalExperience"
            class="space-y-2"
            item-key="title"
          >
            <template #item="{ element, index }">
              <div
                v-if="element && element.title"
                class="border shadow rounded-lg p-1 w-[95%] dark:border-none dark:bg-gray-900 dark:text-gray-200 mb-2 relative cursor-move bg-white"
              >
                <button @click.prevent="removeProfessionalExperience(index)">
                  <Icon
                    name="line-md:close"
                    class="h-5 w-5 absolute top-2 right-2"
                  />
                </button>
                <strong>{{ element.title }}</strong>
                <p>{{ element.description }}</p>
                <p class="text-sm text-gray-500">
                  {{ element.period.start }} - {{ element.period.end }}
                </p>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <div
        class="flex justify-between absolute bottom-4 left-4 right-4 mt-4 mb-4"
      >
        <Button
          v-if="currentStep > 1"
          @click.prevent="prevStep"
          label="Précédent"
          :level="4"
        />
        <Button
          v-if="currentStep < 7"
          @click.prevent="nextStep"
          label="Suivant"
          :level="1"
          class="ml-auto"
        />
        <Button
          v-if="currentStep === 7"
          type="submit"
          label="Soumettre"
          :level="1"
          class="ml-auto"
        />
      </div>
    </form>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "CVForm",
  components: {
    draggable,
  },
  data() {
    return {
      currentStep: 1,
      newHardSkill: "",
      newSoftSkill: "",
      newInterest: "",
      newEducation: { title: "", description: "", period: { start: "", end: "" } },
      newProfessionalExperience: { title: "", description: "", period: { start: "", end: "" } },
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
    configToEdit: { type: Object, default: null },
  },
  mounted() {
    if (this.configToEdit) {
      this.formData = {
        ...this.formData,
        ...this.configToEdit,
        contact: {
          ...this.formData.contact,
          ...this.configToEdit.contact,
        },
        hardSkills: this.configToEdit.hardSkills || [],
        softSkills: this.configToEdit.softSkills || [],
        interests: this.configToEdit.interests || [],
        education: this.configToEdit.education || [],
        professionalExperience: this.configToEdit.professionalExperience || [],
      };
    }
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
      if (this.newEducation.title) {
        this.formData.education.push({
          title: this.newEducation.title.trim(),
          description: this.newEducation.description
            ? this.newEducation.description.trim()
            : "",
          period: {
            start: this.newEducation.period.start.trim(),
            end: this.newEducation.period.end.trim(),
          },
        });
        this.newEducation = { title: "", description: "", period: { start: "", end: "" } };
      }
    },
    addProfessionalExperience() {
      if (this.newProfessionalExperience.title) {
        this.formData.professionalExperience.push({
          title: this.newProfessionalExperience.title.trim(),
          description: this.newProfessionalExperience.description
            ? this.newProfessionalExperience.description.trim()
            : "",
          period: {
            start: this.newProfessionalExperience.period.start.trim(),
            end: this.newProfessionalExperience.period.end.trim(),
          },
        });
        this.newProfessionalExperience = { title: "", description: "", period: { start: "", end: "" } };
      }
    },
    handleFileSelected({ file }) {
      this.formData.photo = file;
    },
    async handleSubmit() {
      try {
        const { $supabase } = useNuxtApp();

        if (this.formData.photo && typeof this.formData.photo !== "string") {
          const timestamp = Date.now();
          const cleanedFileName = this.formData.photo.name.replace(
            /[^a-zA-Z0-9.-]/g,
            "_"
          );
          const uniqueFileName = `${timestamp}_${cleanedFileName}`;

          const { data, error } = await $supabase.storage
            .from("Make-your-resume-bucket")
            .upload(
              `photosCV/${this.userId}/${uniqueFileName}`,
              this.formData.photo
            );

          if (error) throw error;

          const { data: publicUrlData, error: urlError } = $supabase.storage
            .from("Make-your-resume-bucket")
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

        let updatedConfigs;
        if (this.configToEdit) {
          updatedConfigs = user.configs.map((config) =>
            config.configName === this.configToEdit.configName
              ? { ...this.formData }
              : config
          );
        } else {
          updatedConfigs = user.configs
            ? [...user.configs, { ...this.formData }]
            : [{ ...this.formData }];
        }

        const { error: updateError } = await $supabase
          .from("users")
          .update({ configs: updatedConfigs })
          .eq("id", this.userId);

        if (updateError) throw updateError;

        this.$router.go("/");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du CV:", error);
      }
    },
    removeProfessionalExperience(index) {
      this.formData.professionalExperience.splice(index, 1);
    },
    removeEducation(index) {
      this.formData.education.splice(index, 1);
    },
  },
};
</script>
