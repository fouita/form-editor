<script>
  import { createEventDispatcher } from "svelte";
  import inputs, { textContent } from "./Common/inputs";
  import TextContentIcon from "./Icons/TextContentIcon.svelte";

  const dispatch = createEventDispatcher();
  let basicInputs = inputs().slice(0, 13);
  function select(input) {
    dispatch("select", input);
  }
</script>

<div class="flex flex-row justify-center relative">
  <div class="font-semibold text-gray-800 capitalize p-2 text-2xl ">
    choose content
  </div>
</div>
<div dir="ltr" class="mt-4 overflow-auto h-3/4 ">
  <div>
    <div
      class="flex flex-row justify-center items-center py-2 px-3 sm:px-4 mb-4 mx-2 shadow rounded text-sm sm:text-basic text-gray-700 hover:text-indigo-700 border border-transaparent hover:border-indigo-700 cursor-pointer"
      on:click={() => select(textContent())}
    >
      <TextContentIcon />
      <div class="ml-2">{textContent().label}</div>
    </div>
  </div>
  <div class="grid grid-cols-3 ">
    {#each basicInputs as input}
      <div
        class="flex flex-row items-center py-2 px-3 sm:px-4 mb-4 mx-2 shadow rounded text-sm sm:text-basic text-gray-700 hover:text-indigo-700 border border-transaparent hover:border-indigo-700 cursor-pointer"
        on:click={() => select(input)}
      >
        {#if input?.props?.icon}
          <svelte:component this={input.props.icon} />
        {/if}
        <div class="ml-2">
          {input.label}
        </div>
      </div>
    {/each}
  </div>
</div>
