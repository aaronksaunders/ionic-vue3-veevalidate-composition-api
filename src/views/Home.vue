<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <create-account-form @createAccount="doCreateAccount" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import { defineComponent } from "vue";
import CreateAccountForm from "./CreateAccountForm.vue";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    CreateAccountForm
  },
  setup() {
    return {
      doCreateAccount: (params: any) => {
        console.log("doCreateAccount", params);
      }
    };
  }
});
</script>

<style scoped>
</style>