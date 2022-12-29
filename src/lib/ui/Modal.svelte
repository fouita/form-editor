<script>
  import { createEventDispatcher } from "svelte";
  import { clickOutside } from "../utils/clickOutside";
  import CloseIcon from "./Icons/CloseIcon.svelte";
  export let show = false;

  const dispatch = createEventDispatcher();
  function close() {
    show = false;
    dispatch("close");
  }
</script>

<div>
  {#if show}
    <main
      class="fixed md:p-6 p-4 top-0 left-0 w-screen text-gray-800 h-screen bg-black 
            bg-opacity-50 flex items-center justify-center z-50 "
    >
      <div
        class="relative p-5 rounded-lg shadow bg-white max-w-2xl max-h-fit w-full "
        use:clickOutside
        on:click_outside={close}
      >
        <div
          class="absolute top-0 right-0 m-5 cursor-pointer"
          on:click|stopPropagation={close}
        >
          <CloseIcon />
        </div>

        <div class="mt-4 pb-5 min-h-fit">
          <slot />
        </div>
      </div>
    </main>
  {/if}
</div>
