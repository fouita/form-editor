<script>
  import MenuIcon from "../../Icons/MenuIcon.svelte";
  import TrashIcon from "../../Icons/TrashIcon.svelte";
  import StepMenu from "./StepMenu.svelte";

  export let showDelete = false;
  export let showMenu = false;
  export let stepMenu;
  export let stepInd;
  export let stepsList;
  export let step;
  export let numberOfSteps;
  function deleteStep() {
    if (!confirm("Are you sure you want to delete this step?")) return;
    stepsList.splice(stepInd + 1, 1);
    stepsList = stepsList;
  }
</script>

<div class="flex">
  <!-- delete -->
  {#if numberOfSteps !== 1}
    <div class="flex flex-col relative ">
      <div
        class=" cursor-pointer  text-primary/40 hover:text-primary/60"
        on:click={deleteStep}
        on:mouseenter={() => (showDelete = true)}
        on:mouseleave={() => (showDelete = false)}
      >
        <TrashIcon />
      </div>
      {#if showDelete}
        <div
          class="w-20 text-xs p-2 text-center capitalize bg-gray-600 text-white rounded absolute top-10 -left-3"
        >
          Delete Step
        </div>
      {/if}
    </div>
  {/if}
  <!-- menu -->
  <div class="flex flex-col relative">
    <div
      data-name="showMenu"
      class="  cursor-pointer text-primary/40 hover:text-primary/60"
      on:click|preventDefault={() => {
        stepMenu = !stepMenu;
        showMenu = false;
      }}
      on:mouseenter={() => {
        if (!stepMenu) {
          showMenu = true;
        }
      }}
      on:mouseleave={() => (showMenu = false)}
    >
      <MenuIcon />
    </div>
    {#if showMenu}
      <div
        class="w-20 text-xs bg-gray-600 text-white rounded absolute top-10 p-1 text-center capitalize -left-3"
      >
        Show menu
      </div>
    {/if}
    {#if stepMenu}
      <StepMenu
        {numberOfSteps}
        bind:stepMenu
        bind:stepInd
        bind:stepsList
        bind:step
        on:deleteStep={deleteStep}
      />
    {/if}
  </div>
</div>
