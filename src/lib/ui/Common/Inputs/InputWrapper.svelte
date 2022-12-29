<script>
  import Editor from "tailwind-editor";
  import SideMenu from "./SideMenu.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let showDrag = false;
  export let showElement = true;
  export let menu = false;
  export let editable;
  export let validation;
  export let required = false;
  export let inline = false;
  export let key;
  export let show_inputs;
  export let inputsStore;
  export let arr_html = [];
  export let help_html = [];
  export let size = "2xl"; // full, auto, md, lg, xl, 2xl
  export let type;
  export let maxLine = 1;
  export let index = 0;
  export let lineLength = 1;

  $: isTextContent = type === "TextContent";

  $: widthClass =
    index === 0
      ? maxLine > 1 && lineLength > 1
        ? `sm:w-1/${maxLine} shrink-0`
        : `w-full`
      : `flex-auto`;

  function indexInput() {
    dispatch("clickAdd");
  }
</script>

<div class={widthClass}>
  {#if showElement}
    <div
      class="relative {editable ? 'pl-16' : ''}"
      on:mouseenter={() => {
        if (editable) {
          showDrag = true;
        }
      }}
      on:mouseleave={() => {
        if (menu) {
        } else {
          showDrag = false;
        }
      }}
    >
      {#if !isTextContent}
        <Editor bind:arr_html {editable} />
      {/if}
      <div class="flex">
        <div
          class="relative w-full max-w-{!isTextContent ? size : 'full'}"
          style={validation.errorMsg && !editable
            ? "--ft-tertiary: 220 38 38;"
            : ""}
        >
          <slot />

          {#if showDrag}
            <div
              class="absolute top-0 space-x-0.5 z-20 flex -left-20 items-center justify-center mt-2 m-1"
            >
              <SideMenu
                bind:inputsStore
                bind:required
                bind:inline
                bind:menu
                {key}
                bind:show_inputs
                on:add={indexInput}
              />
            </div>
          {/if}
        </div>
      </div>
      {#if !editable && validation.errorMsg}
        <div class="text-red-500 text-sm mt-2">
          {validation.errorMsg}
        </div>
      {/if}

      {#if help_html !== undefined}
        <Editor bind:arr_html={help_html} {editable} />
      {/if}
    </div>
  {/if}
</div>
