let Zoomer = function ($) {

    return {

        /**
         * Execute when the DOM is fully loaded
         */
        init: function () {

            // Iterate over each container with the class '.zoomer-container'
            $('.zoomer-container').each(function () {

                // Constants and variables initialisation
                let SCALE_WHEN_CLICKED = 5.0,
                    MAX_SCALE = 20,
                    scale = 1.0,
                    $container = $(this),
                    $img = $container.find('img'),
                    percentX = 0.5,
                    percentY = 0.5,
                    loaded = false,
                    pinchStartDistance = 0,
                    initialScale = 1;

                // calculate the minimum scale for the image
                function getMinScale() {
                    let containerWidth = $container.width(),
                        containerHeight = $container.height(),
                        imgWidth = $img.width(),
                        imgHeight = $img.height();

                    return Math.min(containerWidth / imgWidth, containerHeight / imgHeight);
                }

                // repaint the image
                function repaint() {
                    if (loaded) {
                        scaleUpdated();
                        updateOrigin();
                    }
                }

                // Update the scale of the image
                function scaleUpdated() {
                    let minScale = getMinScale();

                    scale = Math.min(MAX_SCALE, Math.max(minScale, scale));

                    // Update container background colour and cursor based on the scale
                    $container.css({backgroundColor: scale === minScale ? '' : '#f7f7f7'})
                    $container.css({cursor: scale === minScale ? 'zoom-in' : 'zoom-out'})
                    $img.css({transform: 'scale(' + scale + ')'});
                }

                // Update the image position based on the scale
                function updateOrigin() {
                    let containerWidth = $container.width(),
                        containerHeight = $container.height(),
                        imgWidth = $img.width() * scale,
                        imgHeight = $img.height() * scale,
                        top,
                        left;

                    percentX = Math.min(1, Math.max(0, percentX));
                    percentY = Math.min(1, Math.max(0, percentY));

                    if (imgHeight <= containerHeight) {
                        top = (containerHeight - imgHeight) / 2;
                    } else {
                        let minY = containerHeight - imgHeight;
                        let maxY = 0;

                        top = minY - (minY + (maxY - minY) * percentY);
                    }

                    if (imgWidth <= containerWidth) {
                        left = (containerWidth - imgWidth) / 2;
                    } else {
                        let minX = containerWidth - imgWidth;
                        let maxX = 0;

                        left = minX - (minX + (maxX - minX) * percentX);
                    }

                    // Update image position
                    // console.log(`X: ${percentX * 100}% maps to ${left}px`);
                    // console.log(`Y: ${percentY * 100}% maps to ${top}px`);
                    $img.css({
                        top: top + 'px',
                        left: left + 'px',
                    });
                }

                // Event handlers for mousemove, click, and wheel events
                $container
                    .off('mousemove.zoomer touchmove.zoomer')
                    .on('mousemove.zoomer touchmove.zoomer', function (e) {
                        // Handle mouse movement or touch
                        e.preventDefault(); // Prevent default touch behavior
                        let containerLeft = $container.offset().left;
                        let containerTop = $container.offset().top;
                        let offsetX, offsetY;

                        if (e.type === 'mousemove') {
                            offsetX = e.pageX - containerLeft;
                            offsetY = e.pageY - containerTop;
                        } else if (e.type === 'touchmove') {
                            offsetX = e.originalEvent.touches[0].pageX - containerLeft;
                            offsetY = e.originalEvent.touches[0].pageY - containerTop;
                        }

                        percentX = offsetX / $container.width();
                        percentY = offsetY / $container.height();

                        // Trigger repaint
                        repaint();
                    })
                    .off('click.zoomer')
                    .on('click.zoomer', function (e) {
                        // Handle click event
                        e.preventDefault();
                        let minScale = getMinScale($container);

                        if (scale === minScale) {
                            scale = SCALE_WHEN_CLICKED;
                        } else {
                            scale = minScale;
                        }

                        // Trigger repaint
                        repaint();
                    })
                    .off('wheel.zoomer')
                    .on('wheel.zoomer', function (e) {
                        // Handle mousewheel zoom
                        e.preventDefault();

                        let delta = e.originalEvent.deltaY || -e.originalEvent.detail;

                        delta = delta > 0 ? 0.9 : 1.1;
                        scale = scale * delta;

                        // Trigger repaint
                        repaint();
                    })
                    .off('touchstart.zoomer')
                    .on('touchstart.zoomer', function (e) {
                        if (e.originalEvent.touches.length === 2) {
                            // Pinch gesture detected
                            let touch1 = e.originalEvent.touches[0];
                            let touch2 = e.originalEvent.touches[1];

                            pinchStartDistance = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));
                            initialScale = scale;
                        }
                    })
                    .off('touchmove.zoomer')
                    .on('touchmove.zoomer', function (e) {
                        if (e.originalEvent.touches.length === 2) {
                            // Pinch gesture ongoing
                            let touch1 = e.originalEvent.touches[0];
                            let touch2 = e.originalEvent.touches[1];

                            let pinchCurrentDistance = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));

                            scale = initialScale * (pinchCurrentDistance / pinchStartDistance);

                            // Trigger repaint
                            repaint();
                        }
                    });

                // Event handler for image load
                const imageIsLoaded = function () {
                    loaded = true;
                    repaint();
                };
                if ($img[0].complete) {
                    imageIsLoaded();
                } else {
                    $img.on('load', imageIsLoaded);
                }

                // Repaint the image on window resize
                $(window).resize(repaint);

            })

        }

    };

}(jQuery);


jQuery(Zoomer.init)