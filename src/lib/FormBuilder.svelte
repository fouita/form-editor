<script>
  import Editor from "tailwind-editor";
  import Step from "./Step.svelte";
  import { randomString } from "./utils/random";
  import StepLine from "./ui/Common/Steps/StepLine.svelte";
  import { createEventDispatcher } from "svelte";

  export let editable;
  export let stepper;
  export let label = "'thank you' Page";
  export let stepInd = 0;
  export let buttonBgColor;
  export let buttonTextColor;
  export let rounded = "rounded";
  export let size = "2xl";
  export let formStore = null;
  export let rtl = false;
  export let transparent = false;
  export let btnsPosition;

  const dispatch = createEventDispatcher();
  let oldEditable = false;

  $: if (editable !== oldEditable && !editable) {
    oldEditable = editable;
  }

  $: if (editable !== oldEditable && editable) {
    oldEditable = editable;
    stepInd = 0;
    withMessage = false;
    // change formStore version, this will make the update go through
    if (formStore) {
      formStore.version = "" + (+(formStore.version ?? 0) + 1);
    }
  }

  const arr_msg = [
    {
      html: "Thank you!! Your submission has been sent.",
      klass: "text-center md:text-xl text-lg",
    },
  ];
  export let withMessage = false;
  export let theme = "simple";

  export let form = {
    steps: [
      {
        key: randomString(),
        inputs: [],
      },
    ],
    props: {
      withMessage: false,
      message: arr_msg,
    },
    theme: theme,
  };

  async function initForm(formInputs) {
    form = formStore;
    if (!form?.props || !form?.props?.message) {
      form.props = {
        withMessage: false,
        message: arr_msg,
      };
    }
    formStore = form;

    for (let s of formStore.steps) {
      if (!s.inputs?.length) {
        s.inputs = [];
      }
    }
  }

  function addStep(index) {
    let step = {
      key: randomString(),
      inputs: [],
      props: {
        nextBtn: "Next",
        previousBtn: "Back",
      },
    };
    formStore.steps.splice(index + 1, 0, step);
    formStore = formStore;
  }

  async function submitForm() {
    if (!formStore?.steps) {
      console.error("No steps found!");
      return;
    }
    formStore.steps.forEach((element) => {
      element.inputs.forEach((e) => {
        if (typeof e.value !== "string") {
          e.value = e.value?.toString() ?? "";
        }
      });
    });

    dispatch("submit", formStore);
    if (formStore.props.withMessage) {
      withMessage = true;
    }
  }
  initForm();
</script>

<div
  dir={rtl ? "rtl" : "ltr"}
  class="p-5 {transparent
    ? 'bg-transparent'
    : 'bg-secondary'} text-primary mx-auto"
>
  {#if editable}
    <div class="relative pt-4 pb-10">
      {#each formStore?.steps ?? [] as step, i}
        <Step
          {size}
          {editable}
          {rounded}
          bind:step
          bind:numberOfSteps={formStore.steps.length}
          bind:stepsList={formStore.steps}
          stepInd={i}
          {buttonBgColor}
          {buttonTextColor}
          on:submit={submitForm}
          {btnsPosition}
        />
        <StepLine
          {editable}
          bind:withMessage={formStore.props.withMessage}
          stepInd={i}
          bind:step
          {stepper}
          {label}
          bind:numberOfSteps={formStore.steps.length}
          bind:stepsList={formStore.steps}
          on:click={() => addStep(i)}
        />
      {/each}

      {#if formStore?.props.withMessage}
        <div class="px-4">
          <Editor bind:arr_html={formStore.props.message} {editable} />
        </div>
      {/if}
    </div>
  {:else if !editable && !withMessage}
    <Step
      {size}
      {editable}
      {rounded}
      bind:step={formStore.steps[stepInd]}
      bind:numberOfSteps={formStore.steps.length}
      bind:stepsList={formStore.steps}
      bind:stepInd
      {buttonBgColor}
      {buttonTextColor}
      on:submit={submitForm}
      {btnsPosition}
    />
  {:else if !editable && withMessage}
    <Editor arr_html={formStore.props.message} {editable} />
  {/if}
</div>
