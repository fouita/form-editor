<script>
  import CloseIcon from "../Icons/CloseIcon.svelte";
  import PlusIcon from "../Icons/PlusIcon.svelte";

  export let editable;
  export let store;
  export let rounded = "rounded";

  let itemsNode;

  export let selected = store[0].option;
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

  function remove(i) {
    store.splice(i, 1);
    store = store;
  }
</script>

<div class="space-y-2">
  {#if editable}
    <div class="flex flex-col my-3">
      <div
        class="p-3 px-5 border border-tertiary {rounded} focus:outline-none max-w-[350px]"
      >
        <ul bind:this={itemsNode}>
          {#each store as opt, i}
            <li class="flex space-x-1 my-2">
              <input
                type="text"
                class="focus:outline-none placeholder:text-primary/40 border-0 flex-auto bg-transparent"
                placeholder="Type Option"
                on:keyup={(e) => addOption(e, i)}
                on:keydown={(e) => rmOption(e, i)}
                bind:value={opt.option}
              />
              <CloseIcon on:click={() => remove(i)} />
            </li>
          {/each}
        </ul>
        <div
          class="text-primary/40 hover:text-primary/60 flex items-center cursor-pointer "
          on:click={(e) => {
            e.key = "Enter";
            addOption(e);
          }}
        >
          <PlusIcon />
          Add Option
        </div>
      </div>
    </div>
  {:else}
    <select
      bind:value={selected}
      multiple
      class="block w-full mt-1 p-2.5 border border-tertiary {rounded} bg-transparent  focus:outline-none focus:ring-2 focus:ring-quaternary "
    >
      {#each store as opt}
        <option value={opt.option}>{opt.option}</option>
      {/each}
    </select>
  {/if}
</div>
