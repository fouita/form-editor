<script>
    import Editor from "tailwind-editor";

    export let arr_content = [];
    export let editable;
</script>

<!-- just empty -->
<Editor bind:arr_html={arr_content} {editable} />
