import CredentialsComponent, {
  credentialsComponentSchema,
} from "../views/CredentialsComponent";
import NameComponent, { nameComponentSchema } from "../views/NameComponent.vue";
import { useForm } from "vee-validate";

/**
 * default test
 */
export default {
  title: "Example/IonicTestCombined",
  component: CredentialsComponent,
  subcomponents: { NameComponent },
  argTypes: {
    onSave: { action: "onSave" },
  },
};


const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NameComponent, CredentialsComponent },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const theForm = useForm({
      validationSchema: credentialsComponentSchema.concat(nameComponentSchema),
      initialValues: { ...args.initialValues },
    });

    /**
     * onsave validate the form, if it is all good then get the
     * values and emit the onSave event from the form
     */
    const save = async () => {
      const resp = await theForm.validate();
      if (resp.valid) {
        args.onSave(theForm.values);
      }
    };
    // Story args can be spread into the returned object
    return { args, save };
  },
  // Then, the spread values can be accessed directly in the template
  template: `<div class="ion-padding">
      <ion-card>
         <ion-card-content>
            <credentials-component v-bind="{...args}"/>
         </ion-card-content>
      </ion-card>
      <ion-card>
         <ion-card-content>
            <name-component v-bind="{...args}"/>
         </ion-card-content>
      </ion-card>
      <ion-button @click="save">SAVE</ion-button>
    </div>`,
});

/**
 * default test
 */
export const Default = Template.bind({});
Default.args = {};

export const InitialValues = Template.bind({});
InitialValues.args = {
  initialValues: {
    credentials: {
      email: "bademail",
    },
    name: {
      first: "Aaron",
      last: "Saunders",
    },
  },
};
