# typey
Do typography better.

*This repo contains alpha code that is likely to change at any point. Use at your own risk ;)*

### Features

* Use px (for screen) and pt (for print) and then output in px, pt, rem or em.
* Define font sizes inside a sass map as t-shirt sizes (m, l, xl, xxl).
* Define line-height as multiples of the base line height OR as static values.
* Automatic px fallbacks when using rem as the base unit.
* Define font weights inside a sass map.
* Ready to go web safe font stacks that are easy to extend.

### CSS units used in typey

`px`
By far the simplest unit you can use to size typography on the web. It translates very easily from mockups produced in a certain over-rated graphics suite. In typey, all base sizes are specified in `px` (or `pt`) and are automatically converted to your `$base-unit`.

`pt`
Translates equally well from design mockups as `px` but should be kept for use solely within print stylesheets. For the simplest approach when writing print stylesheets set your $base-unit as `pt` and define all base sizes as `pt`.

`rem`
Sets `font-size` as relative to `$base-font-size` and allows you to resize fonts dynamically with media queries by altering the default font size of the `html` element. It has one irritating caveat: no IE8 support! Fear not, typey can help.

`em`
In the way the `rem` unit is relative to `$base-font-size`, `em` is relative to the parent `font-size`. It is supported in all browsers and also allows you to dynamically resize fonts with media queries. It can just get severely confusing when you have various nested elements - each with an `em` `font-size`. Typey functions and mixins accept a second argument to help with this problem.

### Getting started

Just like in compass Vertical Rhythm (how does one spell rythym?) we define our base font size and line height first.

```sass
$base-font-size:    16px;
$base-line-height:  21px;
```

We also need to define the base unit that the functions and mixins will output. you can use `px`, `pt` (for print stylesheets), `rem` or `em`.

```sass
$base-unit: rem;
```

You can now setup your type defaults like so:

```sass
html {
  @include define-type-sizing;
}
```

Define the `$font-size` map using `px` (or `pt`) - which are easy to read and keep track of (not to mention convert from a design mockup) and t-shirt sizes (which are even easier to keep track of).

```sass
$font-size: (
  xxxl: 60px,
  xxl:  46px,
  xl:   32px,
  l:    24px,
  m:    16px,
  s:    14px,
  xs:   12px
);
```

### Line height and font sizing examples

The simplest way to set `font-size` is via this function.

```sass
h1 {
  font-size: font-size(xxxl);
}
```

You can specify `line-height` as a multiple of `$base-line-height` (for a vertical rhythm approach).

```sass
h2 {
  line-height: line-height(3);
}
```

Or for those finicky designs, you can just use a static `px` value for granular control.

```sass
h3 {
  line-height: line-height(43px);
}
```

If you are using rem as a base unit for its super lovely font resizing abilities `px` fallbacks are added automatically when using the `font-size()` and `line-height()` mixins. Both mixins support exactly the same parameters as their function counterparts.

```sass
h4 {
  @include font-size(l);
  @include line-height(2);
}
```

When using `em` as your `$base-unit`, use each functions second parameter so you can set the `em` value relative to the parent or element `font-size`. This second argument accepts t-shirt sizes to keep things simple.

```sass
h4 span {
  font-size: font-size(s, l);
  line-height: line-height(2, s);
}
```

The second parameter can either accept a t-shirt size or a static value for granular control.

```sass
h4 span {
  font-size: font-size(s, l);
  line-height: line-height(2, 14px);
}
```

### Extras

Grab one of the web-safe font stacks included and extend it with your own fonts. Font stacks are courtesy of John Albin and his Zen theme.

```sass
$your-font-stack: extend-font-stack("Open sans", $sans-serif-stack);
```