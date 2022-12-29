<script>
  import EditorSteps from "./ui/EditorSteps.svelte";
  import cmpsRegistry from "./utils/cmpsRegistry";
  import { randomString } from "./utils/random";
  import InputWrapper from "./ui/Common/Inputs/InputWrapper.svelte";
  import Submit from "./ui/InputTypes/Submit.svelte";
  import { createEventDispatcher } from "svelte";
  import InputAddButton from "./ui/Common/Inputs/InputAddButton.svelte";
  export let stepsList;
  export let numberOfSteps;
  const dispatch = createEventDispatcher();

  export let step;
  step.props ||= {};
  step.props.previousBtn ||= "Back";
  step.props.nextBtn ||= "Next";

  export let editable;
  export let rounded;
  export let size;
  export let show_inputs = false;
  export let stepInd = stepsList.indexOf(step);
  export let buttonBgColor;
  export let buttonTextColor;
  export let btnsPosition; // start, end, center

  $: inputsStore = step?.inputs;
  $: inputIndex = inputsStore?.length;

  export let errorMsg;

  function showInputs(evt) {
    let index = evt.detail.top ? 0 : inputIndex;
    inputIndex = index;
    show_inputs = true;
  }

  function saveInput(evt) {
    const elem = { ...evt.detail, key: randomString() };
    inputsStore.splice(inputIndex, 0, elem);
    inputsStore = inputsStore;
    inputIndex++;
  }

  function validate() {
    let valid = true;
    for (const input of step.inputs) {
      if (input.props.fields.validation.required == true) {
        if (input.value === "" || input.value == undefined) {
          valid = false;
          input.props.fields.validation.errorMsg = "Field is required";
        } else {
          input.props.fields.validation.errorMsg = "";
        }
      }
    }
    step = step;
    return valid;
  }

  function next() {
    let valid = validate();
    if (valid) stepInd++;
  }

  function previous() {
    stepInd--;
  }

  function submitForm() {
    let valid = validate();
    if (valid) dispatch("submit");
  }

  function getIndex(indexGrp, index) {
    let cindex = 0;
    for (let i = 0; i < indexGrp; i++) {
      cindex += inputGroups[i].length - 1;
    }
    cindex += indexGrp + index;
    inputIndex = cindex + 1;
  }

  let inputGroups = [];

  $: maxLine = inputGroups.reduce(
    (g1, g2) => (g2.length > g1.length ? g2 : g1),
    []
  )?.length;

  $: if (inputsStore) {
    const groups = [];
    let cgroup = [];
    for (let i = 0; i < inputsStore.length; i++) {
      const inp = inputsStore[i];
      cgroup.push(inp);
      if (!inp.props.inline) {
        groups.push(cgroup);
        cgroup = [];
      }
    }
    if (cgroup?.length) {
      groups.push(cgroup);
    }
    inputGroups = groups;
  }
</script>

<div>
  <InputAddButton top {editable} on:click={showInputs} />

  {#each inputGroups as inputs, indexGrp}
    <div class="sm:flex items-start sm:space-x-5 space-x-0">
      {#each inputs as input, index}
        <InputWrapper
          {size}
          key={input.key}
          {editable}
          bind:show_inputs
          bind:inputsStore
          bind:inline={input.props.inline}
          bind:required={input.props.fields.validation.required}
          validation={input.props.fields.validation}
          bind:arr_html={input.props.arr_html}
          bind:help_html={input.props.help_html}
          type={input.type}
          {maxLine}
          {index}
          lineLength={inputs.length}
          on:clickAdd={() => getIndex(indexGrp, index)}
        >
          <svelte:component
            this={cmpsRegistry[input?.type]}
            {editable}
            {rounded}
            bind:selected={input.value}
            bind:store={input.props.fields.store}
            bind:placeholder={input.props.fields.placeholder}
            bind:label={input.label}
            {...input?.props?.fields ?? {}}
            bind:value={input.value}
            bind:errorMsg
          />
        </InputWrapper>
      {/each}
    </div>
  {/each}
  {#if inputGroups.length}
    <InputAddButton {editable} on:click={showInputs} />
  {/if}
  <div class="{editable ? 'pl-16' : ''} mb-4 mt-10">
    <div class="flex justify-{btnsPosition}">
      {#if stepInd == numberOfSteps - 1 && numberOfSteps !== 1}
        <Submit
          {editable}
          {rounded}
          previous
          bind:label={step.props.previousBtn}
          bind:noPrevious={step.props.noPrevious}
          on:click={previous}
          buttonBgColor={buttonTextColor}
          buttonTextColor={buttonBgColor}
        />
        <Submit
          {editable}
          {rounded}
          bind:label={step.props.nextBtn}
          on:click={submitForm}
          {buttonBgColor}
          {buttonTextColor}
        />
      {:else if stepInd == numberOfSteps - 1 && numberOfSteps == 1}
        <Submit
          {editable}
          {rounded}
          bind:label={step.props.nextBtn}
          on:click={submitForm}
          {buttonBgColor}
          {buttonTextColor}
        />
      {:else if stepInd == 0}
        <Submit
          {editable}
          {rounded}
          bind:label={step.props.nextBtn}
          on:click={next}
          {buttonBgColor}
          {buttonTextColor}
        />
      {:else}
        <Submit
          {editable}
          {rounded}
          previous
          bind:label={step.props.previousBtn}
          bind:noPrevious={step.props.noPrevious}
          on:click={previous}
          buttonBgColor={buttonTextColor}
          buttonTextColor={buttonBgColor}
        />
        <Submit
          {editable}
          {rounded}
          bind:label={step.props.nextBtn}
          on:click={next}
          {buttonBgColor}
          {buttonTextColor}
        />
      {/if}
    </div>
  </div>

  {#if show_inputs}
    <EditorSteps bind:show={show_inputs} on:complete={saveInput} />
  {/if}
</div>
