<script>
    let klass = "w-6 h-6 cursor-pointer";
    export { klass as class };
</script>

<svg
    on:click
    on:keypress
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class={klass}
>
    <slot />
</svg>
