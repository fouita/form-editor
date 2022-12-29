<script>
  export let editable;
  export let value = "";
  export let required;
  export let placeholder;
  export let rounded = "rounded";
</script>

<div class="flex flex-col w-full">
  {#if editable}
    <textarea
      rows="5"
      placeholder="Type placeholder .."
      class="text-primary/40 placeholder:text-primary/40 p-2.5 border border-tertiary bg-transparent {rounded}  focus:outline-none focus:ring-2 focus:ring-quaternary w-full"
      bind:value={placeholder}
    />
  {:else}
    <textarea
      rows="5"
      class="p-2.5 border border-tertiary placeholder:text-primary/40 {rounded} bg-transparent  focus:outline-none focus:ring-2 focus:ring-quaternary w-full"
      {placeholder}
      bind:value
      {required}
    />
  {/if}
</div>
