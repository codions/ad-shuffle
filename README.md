# AdShuffle

This JavaScript package allows for both random and sequential rotation of banners on a webpage based on configured frequency, start, and end dates, with optional automatic rotation.

## Features

- Randomly rotates banners based on frequency.
- Sequential banner rotation when specified.
- Control display with start and end dates.
- Manage multiple banner containers on the same page.
- Easily integrates into HTML via the generated library.
- Automatically applies default styles when using the `ads-styled` class.
- Option to automatically rotate banners at a set interval.

### Usage of Compiled Version

If you just want to use the compiled package, add the generated file `https://ad-shuffle.codions.dev/dist/ad-shuffle.es.js` to your HTML page:

```html
<script src="https://ad-shuffle.codions.dev/dist/ad-shuffle.es.js"></script>
```

## How to Use

After including the script, add the following HTML structure to include banners on your page.

### HTML Implementation Example

Add the `ads-styled` class to your banner to apply the default styles provided by the package:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AdShuffle - Demo</title>
    <script src="https://ad-shuffle.codions.dev/dist/ad-shuffle.es.js"></script>
</head>
<body>
    <!-- Container with auto-rotation every 5 seconds -->
    <div class="rb-ads" data-auto-rotate="true" data-interval="5">
        <div class="rb-random-ads ads-styled" data-frequency="50" data-start-date="2024-09-09 09:31:00" data-end-date="2024-10-10 12:35:00">
            <div class="ads-info">Advertisement</div>
            Banner 1 - Frequency 50%
        </div>
        <div class="rb-random-ads ads-styled" data-frequency="25" data-end-date="2024-09-09 13:00:00">
            <div class="ads-info">Advertisement</div>
            Banner 2 - Frequency 25%
        </div>
        <div class="rb-random-ads ads-styled" data-frequency="25" data-start-date="2024-09-01 00:00:00">
            <div class="ads-info">Advertisement</div>
            Banner 3 - Frequency 25%
        </div>
    </div>

    <!-- Container without auto-rotation (default behavior) -->
    <div class="rb-ads">
        <div class="rb-random-ads ads-styled" data-frequency="75">
            <div class="ads-info">Advertisement</div>
            Banner 1 - Frequency 75%
        </div>
        <div class="rb-random-ads ads-styled" data-frequency="25" data-start-date="2024-09-10 00:00:00">
            <div class="ads-info">Advertisement</div>
            Banner 2 - Frequency 25%
        </div>
    </div>
</body>
</html>
```

### Attributes

- `data-frequency`: Defines the probability of a banner being shown. The value is relative to the other banners in the same container.
- `data-start-date` (optional): Defines the start date when the banner will be eligible for display.
- `data-end-date` (optional): Defines the end date after which the banner will no longer be displayed.
- `class="ads-styled"`: Applies the default style provided by the package.

### Auto-Rotation Parameters

You can enable auto-rotation of banners by adding the following attributes to the `.rb-ads` container:

- `data-auto-rotate="true"`: Enables automatic banner rotation.
- `data-interval="X"`: Defines the interval in seconds between banner switches.

Example usage:

```html
<div class="rb-ads" data-auto-rotate="true" data-interval="5">
    <div class="rb-random-ads ads-styled" data-frequency="50">
        <div class="ads-info">Advertisement</div>
        Banner 1 - Frequency 50%
    </div>
    <div class="rb-random-ads ads-styled" data-frequency="25">
        <div class="ads-info">Advertisement</div>
        Banner 2 - Frequency 25%
    </div>
</div>
```

In this example, banners will rotate automatically every 5 seconds.

### Sequential Rotation

If you prefer to rotate banners in sequential order (rather than randomly), add the `data-sequential="true"` attribute to the `.rb-ads` container:

```html
<div class="rb-ads" data-auto-rotate="true" data-interval="3" data-sequential="true">
    <div class="rb-random-ads ads-styled">
        <div class="ads-info">Advertisement</div>
        Banner 1
    </div>
    <div class="rb-random-ads ads-styled">
        <div class="ads-info">Advertisement</div>
        Banner 2
    </div>
    <div class="rb-random-ads ads-styled">
        <div class="ads-info">Advertisement</div>
        Banner 3
    </div>
</div>
```

In this example, banners will rotate sequentially every 3 seconds.


### Installation via NPM (for development)

If you want to develop or customize the package:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Build the package with `npm run build`.

## License

This project is licensed under the MIT License.