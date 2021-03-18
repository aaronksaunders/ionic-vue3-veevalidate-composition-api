<template>
  <ion-card>
    <ion-card-content>
      <div>LOGIN FORM</div>
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input type="text" name="email" id="email" v-model="email" />
      </ion-item>
      <p>{{ errors.email }}</p>
      <ion-item>
        <ion-label>Password</ion-label>
        <ion-input
          v-model="password"
          type="password"
          name="password"
          id="password"
          autocomplete="new-password"
        />
      </ion-item>
      <p>{{ errors.password }}</p>
      <div>
        <name-component />
      </div>
      <ion-button @click="handleLogin">LOGIN</ion-button>
      <ion-button @click="handleCreateAccount">CREATE ACCOUNT</ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonLabel
} from "@ionic/vue";
import { defineComponent } from "vue";
import * as yup from "yup";

import { useForm, useField, useFormErrors } from "vee-validate";
import NameComponent, { nameComponentSchema } from "./NameComponent.vue";

export const simpleSchema = yup
  .object({
    email: yup
      .string()
      .required()
      .email(),
    password: yup
      .string()
      .required()
      .min(8)
  })
  .required()
  .concat(nameComponentSchema);

export default defineComponent({
  name: "LoginForm",
  emits: ["login", "createAccount"],
  setup(props, { emit }) {
    // Create a form context with the validation schema
    const f = useForm({
      validationSchema: simpleSchema
    });

    // define fields to be used in this form context
    const { value: email } = useField("email");
    const { value: password } = useField("password");

    /**
     *
     */
    const handleLogin = async () => {
      const resp = await f.validate();
      console.log(resp);

      console.log(f.values)
      if (resp.valid) {
        emit("login", f.values);
      }
    };

    return {
      errors: useFormErrors(),
      email,
      password,
      handleLogin,
      handleCreateAccount: () => {
        emit("createAccount", null);
      }
    };
  },
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonLabel,
    NameComponent
  }
});
</script>

<style lang="scss" scoped>
</style>