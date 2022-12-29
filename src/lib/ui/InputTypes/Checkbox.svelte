<script>
  import CloseIcon from "../Icons/CloseIcon.svelte";
  import PlusIcon from "../Icons/PlusIcon.svelte";

  export let store;
  export let editable;
  export let value = [];
  // export let theme;

  let itemsNode;
  function addOption(e, i = -1) {
    let l = i == -1 ? store.length - 1 : i;
    if (e.key === "Enter") {
      l = l + 1;
      store.splice(l, 0, {
        option: "",
      });
      store = store;
      setTimeout(() => {
        const item = [...itemsNode.children][l];
        item?.children[1]?.focus();
      });
    }
  }

  function rmOption(e, i) {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      let l = i - 1;
      remove(i);
      setTimeout(() => {
        const item = [...itemsNode.children][l];
        item?.children[1]?.focus();
      });
    }
  }

  function remove(i) {
    store.splice(i, 1);
    store = store;
  }
</script>

{#if editable}
  <div bind:this={itemsNode} class="flex flex-col space-y-2 max-w-[350px]">
    {#each store as opt, i}
      <div class="flex items-center space-x-3 w-full">
        <input
          class="w-4 h-4 border-tertiary rtl:ml-2 form-checkbox text-blue-700"
          type="checkbox"
        />
        <input
          type="text"
          class="focus:outline-none bg-transparent border-0 rounded flex-auto placeholder:text-primary/40"
          placeholder="Type Option"
          on:keyup={(e) => addOption(e, i)}
          on:keydown={(e) => rmOption(e, i)}
          bind:value={opt.option}
        />
        <CloseIcon on:click={() => remove(i)} />
      </div>
    {/each}
  </div>
  <div
    class="flex items-center space-x-3 my-2 text-primary/40 hover:text-primary/60 cursor-pointer"
    on:click={(e) => {
      e.key = "Enter";
      addOption(e);
    }}
  >
    <PlusIcon />
    Add Option
  </div>
{:else}
  {#each store as opt}
    <label class="flex items-center space-x-3 max-w-fit my-2 cursor-pointer">
      <input
        class="border-tertiary rtl:ml-2 form-checkbox text-blue-700"
        type="checkbox"
        bind:group={value}
        value={opt.option}
      />
      <div>
        {@html opt.option}
      </div>
    </label>
  {/each}
{/if}
