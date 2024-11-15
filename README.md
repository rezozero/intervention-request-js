![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Intervention Request JS
Web component for building HTML picture tags using [Intervention Request](https://github.com/ambroisemaupate/intervention-request) images

## Installation
### From npm registry
```sh
yarn add @rezo-zero/intervention-request
```
or
```sh
npm install @rezo-zero/intervention-request
```

## Framework integration
See details on [StencilJS documentation](https://stenciljs.com/docs/overview)

## Usage
```html
<intervention-request
    src="folder/filename.jpg"
    alt="My sample image"
    baseUrl="https://intervention-request.test"
    width="1280"
    height="768"
    formats='{
         "width": 1024,
         "height": 768,
         "media": [
             {"srcset":[{"format":{"fit":"1920x980","quality":80},"rule":"1x"}, {"format":{"fit":"3840x1960","quality":80},"rule":"2x"}], "rule":"(min-width: 1280px)"},
             {"srcset":[{"format":{"fit":"768x320","quality":80},"rule":"1x"}], "rule":"(min-width: 768px)"},
             {"srcset":[{"format":{"fit":"400x280","quality":80},"rule":"1x"}]}
         ]
     }'>
</intervention-request>
```
## Attributes
See all available components attributes [here](src/components/intervention-request/readme.md)

## Styling
CSS variables applied to image
```css
:root {
    --ir-object-fit: fill;
    --ir-object-position: inherit;
    --ir-width: 100%;
    --ir-height: auto;
    --ir-aspect-ratio: inherit;
}
```

## Global configurations & overrides
A common configuration can be defined via the global variable `interventionRequestJS` as follows
```javascript
/**
 * Override intervention request default configurations
 * @type InterventionRequestConfigurations
 */
window.interventionRequestJS = {
    /**
     * Enable debug mode
     */
    debug: true,

    /**
     * Default strategy
     * Applied on each element without strategy props provided
     */
    strategy: 'default',

    /**
     * Default loading typee
     */
    loading: 'lazy',

    /**
     * Strategies config overrides
     */
    strategies: {
        default: { baseUrl: 'http://intervention.local/assets' },
        cloudinary: { baseUrl: 'https://res.cloudinary.com/demo/image/upload' }

        /**
         * New strategy can be added here
         * @type InterventionRequestStrategy
         */
    },

    /**
     * Default media options
     * Applied on every media if no props override provided
     */
    mediaOptions: {
        quality: 100,
        progressive: 0
    }
}
```
