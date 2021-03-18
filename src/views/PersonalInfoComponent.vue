<template>
  <div>
    <ion-item>
      <ion-label>First</ion-label>
      <ion-input name="personalInfo.first" v-model="first" />
    </ion-item>
    <p>{{ errors["personalInfo.first"] }}</p>

    <ion-item>
      <ion-label>Last</ion-label>
      <ion-input name="personalInfo.last" v-model="last" type="text" />
    </ion-item>
    <p>{{ errors["personalInfo.last"] }}</p>

    <ion-item>
      <ion-label>Birthday</ion-label>
      <ion-datetime
        name="personalInfo.birthday"
        v-model="birthday"
        display-format="MM/DD/YYYY"
      />
    </ion-item>
    <p>{{ errors["personalInfo.birthday"] }}</p>
  </div>
</template>

<script lang="ts">
import { useField, useFormErrors } from "vee-validate";
import { IonItem, IonInput, IonLabel, IonDatetime } from "@ionic/vue";
import * as yup from "yup";

export const personalInfoComponentSchema = yup
  .object({
    personalInfo: yup.object({
      first: yup.string().required("First Name Is Required"),
      last: yup.string().required("Last Name Is Required"),
      birthday: yup.string().required("Birthday Is Required")
    })
  })
  .required();

export default {
  name: "PersonalInfo",
  setup() {
    // No need to define rules for fields
    const { value: first } = useField("personalInfo.first");
    const { value: last } = useField("personalInfo.last");
    const { value: birthday } = useField("personalInfo.birthday");

    return {
      last,
      first,
      birthday,
      errors: useFormErrors() as any
    };
  },
  components: {
    IonItem,
    IonInput,
    IonLabel,
    IonDatetime
  }
};
</script>
<style lang="css" scoped>
ion-item {
  --padding-start: 0;
}
</style>