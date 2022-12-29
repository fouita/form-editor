import TextIcon from "../Icons/TextIcon.svelte"
import TextareaIcon from "../Icons/TextareaIcon.svelte"
import NumberIcon from "../Icons/NumberIcon.svelte"
import EmailIcon from "../Icons/EmailIcon.svelte"
import PasswordIcon from "../Icons/PasswordIcon.svelte"
import DateIcon from "../Icons/DateIcon.svelte"
import TimeIcon from "../Icons/TimeIcon.svelte"
import DateTimeIcon from "../Icons/DateTimeIcon.svelte"
import SelectIcon from "../Icons/SelectIcon.svelte"
import MultichoiceIcon from "../Icons/MultichoiceIcon.svelte"
import RadioIcon from "../Icons/RadioIcon.svelte"
import CheckboxIcon from "../Icons/CheckboxIcon.svelte"
import TextContentIcon from "../Icons/TextContentIcon.svelte"

const required = false;

export const textContent = () => ({
  label: "Text Content",
  type: "TextContent",
  props: {
    icon: TextContentIcon,
    fields: {
      arr_content: [
        { html: "Text content to update!", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      validation: {
        
      },
    },
  }
})

export default () => [
  {
    label: "Text Input",
    type: "Text", // need to be the same component name
    value: "",
    props: {
      icon: TextIcon,
      arr_html: [
        { html: "Text", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Textarea",
    type: "Textarea",
    value: "",
    props: {
      icon: TextareaIcon,
      arr_html: [
        { html: "Paragraph", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        placeholder: "",
        rows: "5",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Number",
    type: "Number",
    value: "",
    props: {
      icon: NumberIcon,
      arr_html: [
        { html: "Number", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Email",
    type: "Email",
    value: "",
    props: {
      icon: EmailIcon,
      arr_html: [
        { html: "Email", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Password",
    value: "",
    type: "Password",
    props: {
      icon: PasswordIcon,
      arr_html: [
        { html: "Password", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Date",
    type: "Date",
    value: "",
    props: {
      icon: DateIcon,
      arr_html: [
        { html: "Date", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Time",
    type: "Time",
    value: "",
    props: {
      icon: TimeIcon,
      arr_html: [
        { html: "Time", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        placeholder: "",
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "DateTime",
    type: "DateTime",
    value: "",
    props: {
      icon: DateTimeIcon,
      arr_html: [
        { html: "DateTime", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Select",
    type: "Select",
    value: "",
    props: {
      icon: SelectIcon,
      arr_html: [
        { html: "Select", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],

      fields: {
        store: [
          { option: "" },
        ],
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Multi-choice",
    type: "Multichoice",
    value: "",
    props: {
      icon: MultichoiceIcon,
      arr_html: [
        {
          html: "Multichoice",
          klass: "md:text-xl text-lg leading-loose md:leading-loose",
        },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        store: [
          { option: "" },
        ],
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "Radio",
    type: "Radio",
    value: "",
    props: {
      icon: RadioIcon,
      arr_html: [
        { html: "Radio", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        store:[
          { option: "" },
        ],
        validation: {
          required: required,
        },
      },
    },
  },
  {
    label: "CheckBox",
    type: "Checkbox",
    value: "",
    props: {
      icon: CheckboxIcon,
      arr_html: [
        { html: "Checkbox", klass: "md:text-xl text-lg leading-loose md:leading-loose" },
      ],
      help_html: [
        { html: "Help text", klass: "md:text-sm text-sm leading-loose md:leading-loose" },
      ],
      fields: {
        store: [
          { option: "" },
        ],
        validation: {
          required: required,
        },
      },
    },
  },
];
