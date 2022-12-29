<script>
  export let editable;
  export let value;
  export let placeholder;
  export let rounded = "rounded";
</script>

<div>
  {#if editable}
    <input
      class="bg-transparent text-primary/40 placeholder:text-primary/40  p-2.5 border border-tertiary {rounded} focus:outline-none focus:ring-2 focus:ring-quaternary w-full"
      placeholder="Type placeholder .."
      type="email"
      bind:value={placeholder}
    />
  {:else}
    <input
      class="p-2.5 border border-tertiary placeholder:text-primary/40 bg-transparent {rounded} focus:outline-none focus:ring-2 focus:ring-quaternary w-full"
      {placeholder}
      type="email"
      bind:value
    />
  {/if}
</div>
