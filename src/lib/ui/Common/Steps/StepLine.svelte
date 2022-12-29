<script>
  import PlusIcon from "../../Icons/PlusIcon.svelte";
  import Switcher from "../Inputs/Switcher.svelte";
  import StepWrapper from "./StepWrapper.svelte";

  export let editable;
  export let stepInd;
  export let step;
  export let stepsList;
  export let stepper;
  export let numberOfSteps;
  export let label;
  export let withMessage;
</script>

<div>
  <StepWrapper
    bind:editable
    bind:stepInd
    bind:step
    bind:stepsList
    {numberOfSteps}
    on:mouseenter={() => {
      if (editable) {
        stepper = true;
      }
    }}
    on:mouseleave={() => {
      stepper = false;
    }}
  >
    <div class="flex items-center py-2 my-4 w-full">
      <div
        class="border-t-2 border-dashed border-gray-300 h-1 w-2/5 shrink-0"
      />
      <div
        on:click
        class="cursor-pointer flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 space-x-2 p-2 text-primary/40 px-8 capitalize"
      >
        <PlusIcon />
        <div class="">Add step</div>
      </div>

      <div class="flex-auto border-t-2 border-dashed border-gray-300 h-1" />
      <div class="mb-2">
        {#if stepInd == numberOfSteps - 1}
          <div
            class="flex justify-between space-x-2 cursor-pointer items-center text-sm p-2 capitalize text-gray-500 font-medium"
            on:click={() => {
              withMessage = !withMessage;
            }}
          >
            <span class=" text-sm font-medium ">
              {label}
            </span>
            <Switcher bind:value={withMessage} />
          </div>
        {/if}
      </div>
    </div>
  </StepWrapper>
</div>
