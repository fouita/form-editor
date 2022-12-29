<script>
  import SideStepMenu from "./SideStepMenu.svelte";
  export let editable;
  export let stepper;
  export let stepMenu;
  export let stepInd;
  export let stepsList;
  export let step;
  export let numberOfSteps;
</script>

<div
  class=" relative my-3 p-3 "
  on:mouseenter={() => {
    if (editable) {
      stepper = true;
    }
  }}
  on:mouseleave={() => {
    if (stepMenu) {
      stepper = true;
    } else {
      stepper = false;
    }
  }}
>
  <slot />

  {#if stepper && stepInd < numberOfSteps - 1}
    <div
      class="absolute {numberOfSteps == 1
        ? ' left-0.5 top-10 '
        : ''} {stepInd == numberOfSteps - 1
        ? ' bottom-10 -left-6'
        : 'bottom-5 -left-6 '} space-x-0.5  flex  items-center justify-center m-1 pl-5"
    >
      <SideStepMenu
        bind:stepMenu
        bind:stepInd
        {numberOfSteps}
        bind:stepsList
        bind:step
      />
    </div>
  {/if}
</div>
