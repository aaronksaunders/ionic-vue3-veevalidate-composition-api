import CredentialsComponent, {
  credentialsComponentSchema,
} from "../views/CredentialsComponent";

import { useForm} from "vee-validate";

export default {
  title: "Example/IonicTestCredentials",
  component: CredentialsComponent,
  argTypes: {
    onSave: { action: "onSave" }
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CredentialsComponent },

  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const f = useForm({
      validationSchema: credentialsComponentSchema,
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
    '<div class="ion-padding"><credentials-component v-bind="{...args}"/><button @click="save">SAVE</button></div>',
});

export const Default = Template.bind({});
Default.args = {};
