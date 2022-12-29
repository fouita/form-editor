<script>
  export let value;
  export let rounded = "rounded";
</script>

<div class="">
  <input
    class="p-2.5 border bg-transparent  border-tertiary {rounded} focus:outline-none focus:ring-2 focus:ring-quaternary w-full"
    type="date"
    bind:value
  />
</div>
