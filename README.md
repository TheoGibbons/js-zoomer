# JS Zoomer

JS Zoomer is a simple JavaScript package for adding image zooming functionality to your web applications. It allows users to zoom in and out of images within a container, providing a more detailed view of the image content.

## Features

 - Mobile friendly
 - Click to zoom
 - Pinch to zoom (touch screens)
 - Mouse wheel to zoom
 - Pan around the image using the mouse or touch
 - Works for any image size

## Installation

You can install Zoomer via npm or yarn:

```bash
npm install js-zoomer
```
or
```bash
yarn add js-zoomer
```

Make sure you have jQuery installed as well, as it's a dependency of Zoomer.

## Demo
A simple demo is provided in the [demo-simple.html](demo-simple.html) file. You can open this file in your browser to see Zoomer in action.

A more complex demo is provided in the [demo-complex.html](demo-complex.html) file. Which displays multiple images on the same page with different sizes.

## Usage
```html
<link href="path/to/zoomer.css" rel="stylesheet">
```
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="path/to/zoomer.js"></script>
```

Then, add the zoomer-container class to the container element that holds your image:

```html
<div class="zoomer-container">
    <img src="path/to/your/image.jpg" alt="Your Image">
</div>
```
That's it! Zoomer will automatically apply zooming functionality to the img in the element with the zoomer-container class.

## Configuration
You can configure Zoomer by modifying the options in the zoomer.js file. Some of the configurable options include the maximum scale, initial scale when clicked, and more. Refer to the comments in the zoomer.js file for detailed explanations of each option.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
