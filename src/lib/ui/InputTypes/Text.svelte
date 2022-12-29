<script>
  export let value;
  export let required = false;
  export let placeholder;
  export let editable = false;
  export let rounded = "rounded";
</script>

<div class="flex flex-col w-full relative">
  {#if editable}
    <input
      type="text"
      placeholder="Type placeholder .."
      class="placeholder:text-primary/40 tex-right text-primary/40 bg-transparent  p-2.5 border border-tertiary {rounded} 
      focus:outline-none focus:ring-2 focus:ring-quaternary w-full"
      bind:value={placeholder}
    />
  {:else}
    <input
      type="text"
      class="p-2.5 border border-tertiary placeholder:text-primary/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-quaternary w-full {rounded}"
      {placeholder}
      bind:value
      {required}
    />
  {/if}
</div>
