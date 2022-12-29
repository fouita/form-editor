<script>
  import CloseIcon from "../Icons/CloseIcon.svelte";

  export let editable = false;
  export let store;
  export let selected;
  export let rounded = "rounded";

  let itemsNode;

  function remove(i) {
    store.splice(i, 1);
    store = store;
  }

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
        item?.children[0]?.focus();
      });
    }
  }

  function rmOption(e, i) {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      let l = i - 1;
      remove(i);
      setTimeout(() => {
        const item = [...itemsNode.children][l];
        item?.children[0]?.focus();
      });
    }
  }
</script>

<div class="space-y-2">
  {#if editable}
    <div
      class="p-3 px-5 border border-tertiary {rounded}  focus:outline-none focus:ring-2 focus:ring-quaternary w-1/2"
    >
      <ul bind:this={itemsNode}>
        {#each store as opt, i}
          <li class="flex justify-between space-x-1 my-2">
            <input
              placeholder="Type Option"
              type="text"
              class="focus:outline-none border-0 placeholder:text-primary/40 bg-transparent"
              on:keyup={(e) => addOption(e, i)}
              on:keydown={(e) => rmOption(e, i)}
              bind:value={opt.option}
            />
            <CloseIcon on:click={() => remove(i)} />
          </li>
        {/each}
      </ul>
      <div
        class="text-primary/40 hover:text-primary/60 cursor-pointer "
        on:click={(e) => {
          e.key = "Enter";
          addOption(e);
        }}
      >
        Add Option
      </div>
    </div>
  {:else}
    <select
      class="w-full p-2.5 border border-tertiary {rounded} bg-transparent  focus:outline-none focus:ring-2 focus:ring-quaternary "
      bind:value={selected}
    >
      {#each store as opt}
        <option value={opt.option}>{opt.option}</option>
      {/each}
    </select>
  {/if}
</div>
