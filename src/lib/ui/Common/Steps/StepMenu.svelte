<script>
  import { clickOutside } from "../../../utils/clickOutside";
  import { createEventDispatcher } from "svelte";
  import TrashIcon from "../../Icons/TrashIcon.svelte";
  import CloneIcon from "../../Icons/CloneIcon.svelte";
  const dispatch = createEventDispatcher();
  export let stepInd;
  export let stepMenu;
  export let step;
  function deleteStep() {
    dispatch("deleteStep", stepInd);
  }
  export let stepsList;
  export let numberOfSteps;

  function duplicate() {
    stepsList.splice(stepInd + 1, 0, step);
    stepsList = stepsList;
  }
</script>

<div
  class="flex flex-col z-20 absolute top-10 -left-3 rounded "
  use:clickOutside
  on:click_outside={() => {
    stepMenu = false;
  }}
>
  <!-- Delete -->
  {#if numberOfSteps !== 1}
    <div
      class="flex space-x-3 bg-white hover:bg-gray-50 cursor-pointer  items-center w-32 text-sm  p-3  capitalize  shadow text-gray-500 "
      on:click={deleteStep}
    >
      <TrashIcon />
      <span class=" text-sm "> delete </span>
    </div>
  {/if}
  <!-- duplicate -->
  <div
    class="flex space-x-3  bg-white hover:bg-gray-50 cursor-pointer  items-center w-32 text-sm p-3  capitalize  shadow text-gray-500 "
    on:click={duplicate}
  >
    <CloneIcon />
    <span class=" text-sm "> duplicate </span>
  </div>
</div>
