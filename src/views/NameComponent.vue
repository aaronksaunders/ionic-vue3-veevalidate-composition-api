<template>
  <div>
    <ion-item>
      <ion-label>First</ion-label>
      <ion-input name="name.first" v-model="first" />
    </ion-item>
    <p>{{ errors["name.first"] }}</p>

    <ion-item>
      <ion-label>Last</ion-label>
      <ion-input name="name.last" v-model="last" type="text" />
    </ion-item>
    <p>{{ errors["name.last"] }}</p>
  </div>
</template>

<script lang="ts">
import { useField, useFormErrors } from "vee-validate";
import { IonItem, IonInput, IonLabel } from "@ionic/vue";
import * as yup from "yup";

export const nameComponentSchema = yup
  .object({
    name: yup.object({
      first: yup.string().required("First Name Is Required"),
      last: yup.string().required("Last Name Is Required")
    })
  })
  .required();

export default {
  name: "NameComponent",
  setup() {
    // No need to define rules for fields
    const { value: first } = useField("name.first");
    const { value: last } = useField("name.last");

    return {
      last,
      first,
      errors: useFormErrors() as any
    };
  },
  components: {
    IonItem,
    IonInput,
    IonLabel
  }
};
</script>
