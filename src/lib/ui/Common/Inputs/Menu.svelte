<script>
  import { clickOutside } from "../../../utils/clickOutside";
  import Switcher from "./Switcher.svelte";
  export let menu;
  export let required;
  export let inline = false;
  export let label = "Required";

  function hideMenu(e) {
    menu = false;
  }
</script>

<div
  class="z-50 top-6 absolute bg-white hover:bg-gray-50 outline-gray-50 w-32 text-sm  capitalize  shadow text-gray-500"
  use:clickOutside
  on:click_outside={hideMenu}
>
  <div
    class="flex justify-between  cursor-pointer  items-center p-3"
    on:click={() => {
      inline = !inline;
    }}
  >
    <span class=" text-sm "> Inline </span>
    <Switcher bind:value={inline} />
  </div>
  {#if required !== undefined}
    <div
      class="flex justify-between  cursor-pointer  items-center p-3"
      on:click={() => {
        required = !required;
      }}
    >
      <span class=" text-sm ">
        {label}
      </span>
      <Switcher bind:value={required} />
    </div>
  {/if}
</div>
