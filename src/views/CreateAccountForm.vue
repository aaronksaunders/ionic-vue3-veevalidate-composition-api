<template>
  <div>CREATE ACCOUNT FORM</div>
  <ion-card>
    <ion-card-header
      ><ion-card-title>Credentials</ion-card-title></ion-card-header
    >
    <ion-card-content>
      <credentials-component />
    </ion-card-content>
  </ion-card>
  <ion-card>
    <ion-card-header
      ><ion-card-title>Personal Information</ion-card-title></ion-card-header
    >
    <ion-card-content>
      <personal-info-component />
    </ion-card-content>
  </ion-card>
  <ion-button @click="handleCreateAccount">CREATE ACCOUNT</ion-button>
</template>

<script lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from "@ionic/vue";
import { defineComponent } from "vue";

import { useForm } from "vee-validate";
import PersonalInfoComponent, {
  personalInfoComponentSchema
} from "./PersonalInfoComponent.vue";
import CredentialsComponent, {
  credentialsComponentSchema
} from "./CredentialsComponent.vue";

export default defineComponent({
  name: "LoginForm",
  emits: ["login", "createAccount"],
  setup(props, { emit }) {
    // Create a form context with the validation schema
    const theForm = useForm({
      validationSchema: personalInfoComponentSchema.concat(
        credentialsComponentSchema
      )
    });

    return {
      handleCreateAccount: async () => {
        const resp = await theForm.validate();
        if (resp.valid) {

          // need to unwrap the references to get a plain json object
          const { personalInfo, credentials } = theForm.values;
          emit("createAccount", {
            personalInfo: { ...personalInfo },
            credentials: { ...credentials }
          });
        }
      }
    };
  },
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    CredentialsComponent,
    PersonalInfoComponent
  }
});
</script>

<style lang="scss" scoped>
</style>