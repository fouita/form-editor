<script>
	import formSimple from "../demo/formSimple";
	import FormBuilder from "./lib/FormBuilder.svelte";

	export let editable = true;
	export let textColor = "250 250 250";
	export let bgColor = "0 0 0";
	export let outlineColor = "165 180 252";
	export let buttonBgColor = "79 70 229";
	export let buttonTextColor = "255 255 255";
	export let borderColor = "200 200 200";
	export let form = formSimple;
	export let rounded = "rounded-none";
	export let size = "full";
	export let rtl = false;
	export let transparent = false;
	export let btnsPosition = "start"; // start, end, center
</script>

<main
	style="--ft-primary:{textColor};--ft-secondary:{bgColor};--ft-tertiary:{borderColor};--ft-quaternary:{outlineColor}"
>
	<FormBuilder
		{size}
		{rtl}
		{transparent}
		bind:formStore={form}
		{rounded}
		{editable}
		{buttonBgColor}
		{buttonTextColor}
		{btnsPosition}
		on:submit
	/>
</main>
