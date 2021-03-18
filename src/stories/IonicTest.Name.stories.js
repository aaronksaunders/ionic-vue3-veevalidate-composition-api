import NameComponent, {
  nameComponentSchema
} from "../views/NameComponent.vue";

import { useForm, useField, useFormErrors } from "vee-validate";

export default {
  title: "Example/IonicTestName",
  component: NameComponent,
  argTypes: {
    onSave: { action: "onSave" },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NameComponent },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const f = useForm({
      validationSchema: nameComponentSchema,
    });

    const save = async () => {
      const resp = await f.validate();
      console.log(resp);

      console.log(f.values);
      if (resp.valid) {
        args.onSave(f.values);
      }
    };
    // Story args can be spread into the returned object
    return { args, save };
  },
  // Then, the spread values can be accessed directly in the template
  template:
    '<div class="ion-padding"><name-component v-bind="{...args}"/><button @click="save">SAVE</button></div>',
});

export const Default = Template.bind({});
Default.args = {};
