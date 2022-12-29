<script>
  import VisiblityIcon from "../Icons/VisiblityIcon.svelte";
  export let label = "submit";
  export let editable;
  export let previous = false;
  export let buttonBgColor;
  export let buttonTextColor;
  export let noPrevious = false;
  export let rounded = "rounded";

  function togglePrev() {
    noPrevious = !noPrevious;
  }
</script>

<div style="--ft-primary:{buttonBgColor};--ft-secondary:{buttonTextColor};">
  {#if editable}
    <div class="relative mr-4">
      <div
        contenteditable
        bind:innerHTML={label}
        class=" {noPrevious
          ? 'opacity-50'
          : ''} {rounded} bg-primary/90 text-secondary border-tertiary/50 border hover:bg-primary
            max-w-fit text-center px-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-quaternary font-semibold"
      />
      {#if previous}
        <div
          on:click={togglePrev}
          class="rounded cursor-pointer text-xs p-1 bg-black text-white bg-opacity-75 border z-50  top-0 right-0 absolute"
        >
          <VisiblityIcon visible={!noPrevious} />
        </div>
      {/if}
    </div>
  {:else if !previous || !noPrevious}
    <div
      role="button"
      class="mr-4 bg-primary/90 hover:bg-primary border-tertiary/50 border text-secondary max-w-fit {rounded} text-center px-10 py-2.5 capitalize focus:outline-none focus:ring-2 focus:ring-quaternary font-semibold cursor-pointer  select-none  "
      on:click
    >
      {label}
    </div>
  {/if}
</div>
