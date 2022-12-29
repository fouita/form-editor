<script>
    import { createEventDispatcher } from "svelte";
    import PlusIcon from "../../Icons/PlusIcon.svelte";

    const dispatch = createEventDispatcher();
    export let editable;
    export let top = false;

    function showInputs() {
        dispatch("click", { top });
    }
</script>

{#if editable}
    <div class="ml-16 flex">
        <div
            class=" flex items-center text-lg my-4 text-primary/40 hover:text-primary/60 capitalize cursor-pointer space-x-2"
            on:click={showInputs}
        >
            <PlusIcon />
            <div>Add Input</div>
        </div>
    </div>
{/if}
