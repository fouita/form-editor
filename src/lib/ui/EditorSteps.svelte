<script>
  import { createEventDispatcher } from "svelte";
  import ListInputs from "./ListInputs.svelte";
  import Modal from "./Modal.svelte";
  const dispatch = createEventDispatcher();
  export let show = true;
  function saveInput(evt) {
    show = false;
    dispatch("complete", evt.detail);
  }
</script>

<Modal bind:show>
  <ListInputs on:select={saveInput} />
</Modal>
