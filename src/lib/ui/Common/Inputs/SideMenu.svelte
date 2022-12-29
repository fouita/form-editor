<script>
  import { createEventDispatcher } from "svelte";
  import MenuIcon from "../../Icons/MenuIcon.svelte";
  import PlusIcon from "../../Icons/PlusIcon.svelte";
  import TrashIcon from "../../Icons/TrashIcon.svelte";
  import Menu from "./Menu.svelte";
  export let show_inputs;
  export let showDelete = false;
  export let showAdd = false;
  export let showMenu = false;
  export let key;
  export let menu;
  export let required;
  export let inline;
  const dispatch = createEventDispatcher();
  function add() {
    show_inputs = true;
    dispatch("add");
  }
  export let inputsStore;
  function removeInput() {
    if (!confirm("Are you sure you want to delete this input ?")) return;
    const inputIndex = inputsStore.findIndex((input) => input.key === key);
    if (~inputIndex) {
      inputsStore.splice(inputIndex, 1);
      inputsStore = inputsStore;
    }
  }
  inputsStore = inputsStore;
</script>

<div dir="ltr" class="flex">
  <!-- delete -->
  <div class="flex flex-col relative ">
    <div
      class=" cursor-pointer  text-primary/40 hover:text-primary/60"
      on:click|preventDefault={() => removeInput()}
      on:mouseenter={() => (showDelete = true)}
      on:mouseleave={() => (showDelete = false)}
    >
      <TrashIcon />
    </div>
    {#if showDelete}
      <div
        class="w-20 text-xs p-1 text-center capitalize bg-gray-600 text-white rounded absolute top-10 -left-3"
      >
        Delete input
      </div>
    {/if}
  </div>
  <!-- add -->

  <div class="flex flex-col relative ">
    <div
      class="cursor-pointer text-primary/40 hover:text-primary/60"
      on:click|preventDefault={add}
      on:mouseenter={() => (showAdd = true)}
      on:mouseleave={() => (showAdd = false)}
    >
      <PlusIcon />
    </div>
    {#if showAdd}
      <div
        class="w-20 text-xs bg-gray-600  p-1 text-center capitalize text-white rounded absolute top-10 -left-3"
      >
        Add input
      </div>
    {/if}
  </div>

  <!-- menu -->
  <div class="flex flex-col relative">
    <div
      data-name="showMenu"
      class="cursor-pointer text-primary/40 hover:text-primary/60"
      on:click|preventDefault={() => {
        menu = !menu;
        showMenu = false;
      }}
      on:mouseenter={() => {
        if (!menu) {
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

    {#if menu}
      <Menu bind:menu bind:required bind:inline />
    {/if}
  </div>
</div>
