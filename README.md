## Form Builder With Svelte & Tailwindcss

NoCode Customizable Form Editor

### Demo 
[Demo Form Builder](https://fouita.com/explore/form-builder/forms/0x57341/edit) 


### Screenshots

![Form Builder Fouita](https://cdn.fouita.com/0x2713/media/imgs/form-builder-2-1672321442528.png)

![Form builder Fouita](https://cdn.fouita.com/0x2713/media/imgs/form-builder-6-1672322223740.png)

![Form builder Fouita](https://cdn.fouita.com/0x2713/media/imgs/form-builder-5-1672322203693.png)


## Features

- Customize text and inputs (WYSIWYG)
- Multi Steps Forms
- Customize colors 
- RTL support
- Add images and videos by inserting a link inside the text
- Form Schema is exported so you can manipulate the data yourself
- Form data is dispatched when user click on the Submit of the last step



### Install

```bash
npm i @fouita/form-editor
```

### How to use

Inside your svelte app

```html
<script>
  import FormEditor from "@fouita/form-editor"

  // you can create a button to toggle the editable variable
  let editable = true

  // initial form schema needed
  let form =  {
    "name": "My Form",
    "version": "1",
    "steps": [{
        "index": 0,
        "props": {
            "previousBtn": "Back",
            "nextBtn": "Next"
        },
        "inputs": [
            
        ]
    }]
  }

  const settings = {
	  textColor: "250 250 250",
	  bgColor: "0 0 0",
	  outlineColor: "165 180 252",
	  buttonBgColor: "79 70 229",
	  buttonTextColor: "255 255 255",
	  borderColor: "200 200 200",
	  form: form,
	  rounded: "rounded-none",
	  size: "full",
	  rtl: false,
	  transparent: false,
	  btnsPosition: "start", // start, end, center
  }

  // get updated data
  $: if(form) {
    // form is updated
  }

  function handleSubmit(evt) {
    // send data to your server
  }
</script>

<FormEditor bind:form {editable} {...settings} on:submit={handleSubmit} />
```


### Generate CSS
To be able to see the styled Editor, you can either use `form-editor.css` in your index.html or you can build the CSS using tailwind

1. Copy the file `tailwind.config.js`
2. Generate a seperate CSS for the Form Editor using the following command in your project 

```bash
npx tailwindcss -i ./src/global.css -o ./public/form-editor.css --minify
```

( change `global.css` to your css file that includes `@tailwind`) 

`gloabl.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Include the file in your HTML index file

```html
<link rel="stylesheet" href="/form-editor.css" />
```



## Use it as widget

You can use the form-editor in your project as an external widget, with backend data collection at [Fouita](https://fouita.com/explore/form-builder) for Free


