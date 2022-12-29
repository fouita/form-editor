<script>
  export let value;
  export let rounded = "rounded";
</script>

<div>
  <input
    class="p-2.5 border border-tertiary bg-transparent {rounded}  focus:outline-none focus:ring-2 focus:ring-quaternary w-full"
    type="time"
    bind:value
  />
</div>
