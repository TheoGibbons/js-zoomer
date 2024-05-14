# JS Zoomer

JS Zoomer is a lightweight JavaScript package designed to seamlessly integrate image zooming functionality into web applications, providing users with an enhanced viewing experience.

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

## Simple Demo
A simple demo is provided in the **demo-simple.html** file. You can open this file in your browser to see Zoomer in action.

## Complex Demo
A more complex demo is provided in the **demo-complex.html** file, showcasing multiple images on the same page with different sizes.

## Usage
To enable zooming functionality, add the zoomer-container class to the container element that wraps your image:
```html
<div class="zoomer-container">
    <img src="path/to/your/image.jpg" alt="Your Image">
</div>
```

Add links to the `zoomer.css` and `zoomer.js` files
```html
<link href="path/to/zoomer.css" rel="stylesheet">
```
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="path/to/zoomer.js"></script>
```

That's it! Zoomer will automatically apply zooming functionality to the img in the element with the zoomer-container class.

## Configuration
You can configure Zoomer by modifying the options in the zoomer.js file. Some of the configurable options include the maximum scale, initial scale when clicked, and more. Refer to the comments in the zoomer.js file for detailed explanations of each option.


## Links to git an npm
- GitHub repository: [https://github.com/TheoGibbons/js-zoomer](https://github.com/TheoGibbons/js-zoomer)
- NPM Package: [https://www.npmjs.com/package/js-zoomer](https://www.npmjs.com/package/js-zoomer)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
