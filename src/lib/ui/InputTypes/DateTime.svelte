<script>
  export let value;
  export let rounded = "rounded";
</script>

<input
  type="datetime-local"
  class="p-2.5 border border-tertiary bg-transparent {rounded} focus:outline-none focus:ring-2 focus:ring-quaternary w-full"
  name="datetime"
  bind:value
/>
