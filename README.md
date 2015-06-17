# typey
Do typography better.

### Features

* Use px to define font sizes and have them output in rem or em.
* Define font sizes inside a sass map as t-shirt sizes (m, l, xl, xxl, etc).
* Define line-height as multiples of the base line height OR as static values.
* Automatic px fallbacks when using rem as the base unit.
* Easily convert px values to rem or em.
* Define font weights inside a sass map.
* Ready to go web safe font stacks that are easy to extend.

### Requirements

Sass 3.3.0

### Installation

With RubyGems & Compass:

* Terminal: `gem install typey`
* config.rb: `require 'typey'`
* SCSS: `@import 'typey'`

Bower

* Terminal: `bower install typey`
* SCSS: `@import '../link_to_component_dir/typey'`

Vanilla Sass

* Terminal: 'git clone git@github.com:jptaranto/typey.git
* SCSS: `@import '../link_to_component_dir/typey/stylesheets/typey'`

### CSS units used in typey

`px`

By far the simplest unit you can use to size typography on the web. It translates very easily from mockups produced in a certain over-rated graphics suite. In typey, all base sizes are specified in `px` (or `pt`) and are automatically converted to your `$base-unit`.

`pt`

Translates equally well from design mockups as `px` but should be kept for use solely within print stylesheets. For the simplest approach when writing print stylesheets set your $base-unit as `pt` and define all base sizes as `pt`.

`rem`

Sets `font-size` as relative to the `html` element's `font-size` and allows you to resize fonts dynamically with media queries. It has one irritating caveat: no IE8 support! Fear not, typey can help.

`em`

In the way the `rem` unit is relative to the `html` element, `em` is relative to the parent `font-size`. It is supported in all browsers and also allows you to dynamically resize fonts with media queries. It can just get severely confusing when you have various nested elements - each with an `em` `font-size`. Typey functions and mixins accept a second parameter to help with this problem.

### Getting started

Just like in compass Vertical Rhythm we define our base font size and line height first. In typey, all sizes are defined in `px` or `pt` only.

```sass
$base-font-size:    16px;
$base-line-height:  24px;
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

The simplest way to set `font-size` is via the `font-size()` function.

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

If you are using rem as a base unit for its super lovely font resizing abilities, `px` fallbacks are added automatically when using the `font-size()` and `line-height()` mixins. Both mixins support exactly the same parameters as their function counterparts.

```sass
h4 {
  @include font-size(xl);
  @include line-height(2);
}
```

Or for short hand you can use the `type-layout()` mixin.

```sass
h4 {
  @include type-layout(xl, 2);
}
```

When using `em` as your `$base-unit`, each function accepts a second parameter so your `em` value will be relative to it's parent or element `font-size`. The second parameter can either accept a t-shirt size or a static value for granular control.

```sass
h4 {
  font-size: font-size(xl);

  span {
    font-size: font-size(s, xl);
    line-height: line-height(2, 14px);
  }
}
```

### Margin and padding examples

The same function that we have for `line-height` also exist for `margin` and `padding`, and works exactly the same way.

```sass
div {
  margin-top: margin(2);
  margin-right: margin(1);
  margin-bottom: margin(2);
  margin-left: margin(1);
}

form {
  padding-top: padding(2);
  padding-right: padding(1);
  padding-bottom: padding(2);
  padding-left: padding(1);
}
```

We also have a pair of mixins which (you guessed it!) automatically add fallback for `rem`. They also have the convenient ability to handle shorthand values for both margin and padding (and it works in exactly the same way as the CSS margin and padding property).

```sass
div {
  @include margin(2 1);
  @include padding(2 1);
}
```

If you are using `em`, both the `margin()` and `padding()` functions/mixins accept a second parameter.

```sass
div {
  font-size: font-size(s)

  span {
    @include margin(1 2, s);
    @include padding(1 2, s);
  }
}
```

### Extras

Grab one of the web-safe font stacks included and extend it with your own fonts.

```sass
$your-font-stack: extend-font-stack("Open sans", $sans-serif-stack);
```

If you are using a web font that has multiple different weights, you can express these as numerical values, inside a sass map. Then if things change later on, it's easy as pie to change them site-wide.

```sass
$font-weight: (
  bold:    700,
  normal:  400,
  lighter: 200
);
```

You can then use typey's built in `weight()` function to call these values in an easy and readable way.

```sass
strong {
  font-weight: weight(bold)
}
```

## Reference

### Variables

```sass
$browser-font-size:        16px;
```

The browser font size default. No need to change this.


```sass
$base-font-size:           16px !default;
```

The base font size will be used for most calculations involving font-size.
Allowed units: px or pt


```sass
$base-line-height:         21px !default;
```

The base line height will be used for most calculations involving height.
Allowed units: Must be the same as $base-line-height


```sass
$base-unit:                rem !default;
```

Allowed units: px, pt, em or rem.


```sass
$rem-fallback:             true !default;
```

By default we will provide fallbacks when rem is the base unit.


```sass
$font-size: (
  xxxl:                    60px,
  xxl:                     46px,
  xl:                      32px,
  l:                       24px,
  m:                       16px,
  s:                       14px,
  xs:                      12px
) !default;
```

Default font sizes
Once you redefine the $font-size map it will overwrite all sizes here.
Allowed units: Must be the same as $base-line-height


```sass
$font-weight: (
  bold:                    700,
  normal:                  400,
  lighter:                 200
) !default;
```

Default font weights
This map and accompanying function help provide granular control over setting and retrieving static font weights.

### Mixins

```sass
define-type-sizing($base-font-size: $base-font-size, $base-line-height: $base-line-height)
```

Outputs the base font-size property and the base line-height property. Font-size is outputted as a % of the base browser font size. A fallback for rem is provided for the line-height property.

*@param number $base-font-size*  
(optional) Use to set to anything other than the base value. Allowed units: px or pt

*@param number $base-line-height(optional)*  
Use to set to anything other than the base value. Allowed units: px or pt


```sass
type-layout($size, $x, $context: $size)
```

Outputs both line-height and font-size properties, providing fallbacks when rem is the base unit.

*@param number|string $size*  
A size from the $font-size map or a px/pt value.

*@param number $x*  
Multiple of line height to be used or px/pt value to be converted.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.


```sass
font-size($size, $context: $base-font-size)
```

Outputs font-size property, providing fallbacks when rem is the base unit.

*@param number|string $size*  
A size from the $font-size map or px/pt value to be converted

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the parent font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.


```sass
line-height($x, $context: $base-font-size)
```

Outputs line-height property, providing fallbacks when rem is the base unit.

*@param number $x*
Multiple of line height to be used or px/pt value to be converted.

*@param number|string $context*
(optional) Only used if em is the $base-unit. The value of the elements/parentsfont-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.


```sass
margin($x, $context: $base-font-size)
```

Outputs margin property, providing fallbacks when rem is the base unit.

*@param number|list $x*  
Multiple of line height to be used or px/pt value to be converted.  
Uses the same parameters as the CSS margin property:  
i.e. top right bottom left, 1 0 2 0.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.


```sass
padding($x, $context: $base-font-size)
```

Outputs padding property, providing fallbacks when rem is the base unit.

*@param number|list $x*  
Multiple of line height to be used or px/pt value to be converted.  
Uses the same parameters as the CSS margin property:  
i.e. top right bottom left, 1 0 2 0.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.


```sass
margin-top($x, $context: $base-font-size)
margin-right($x, $context: $base-font-size)
margin-bottom($x, $context: $base-font-size)
margin-left($x, $context: $base-font-size)
```

Outputs corresponding margin property, providing fallbacks when rem is the base unit.

*@param number|list $x*  
Multiple of line height to be used or px/pt value to be converted.  

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.


```sass
padding-top($x, $context: $base-font-size)
padding-right($x, $context: $base-font-size)
padding-bottom($x, $context: $base-font-size)
padding-left($x, $context: $base-font-size)
```

Outputs corresponding padding property, providing fallbacks when rem is the base unit.

*@param number|list $x*  
Multiple of line height to be used or px/pt value to be converted.  

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.

### Functions

```sass
font-size($size, $context: $base-font-size)
```

*@param number|string $size*  
A size from the $font-size map or px/pt value to be converted

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the parent font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.

*@return number*  
The selected font-size in $base-unit.


```sass
line-height($x, $context: $base-font-size)
```

*@param number $x*  
Multiple of line height to be used or px/pt value to be converted.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parentsfont-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.

*@return number*  
The calculated height in $base-unit.


```sass
margin($x, $context: $base-font-size)
```

*@param number $x*  
Multiple of line height to be used or px/pt value to be converted.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.

*@return number*  
The calculated height in $base-unit.


```sass
padding($x, $context: $base-font-size)
```

*@param number $x*  
Multiple of line height to be used or px/pt value to be converted.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in the same unit as the $font-size map.

*@return number*  
The calculated height in $base-unit.


```sass
weight($weight)
```

*@param string $weight*  
A weight from the $font-weight map.

*@return string*  
The selected font-weight.


```sass
extend-font-stack($font, $font-stack)
```

*Example usage:*  
$new-font-stack: extend-font-stack("Open sans", $sans-serif-stack);

*@param string $font*  
The name of the font. Use inverted commas if there are spaces in the font name. i.e "Open sans"

*@param list $font-stack*  
The font stack variable to extend.

### Included font stacks

```sass
// Three standard do-all stacks.
$serif-stack:         TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
$sans-serif-stack:    "Helvetica Neue", Helvetica, Arial, sans-serif;
$monospaced-stack:    "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;

// Specific font stacks.
$arial-stack:         Arial, "Helvetica Neue", Helvetica, sans-serif;
$helvetica-stack:     "Helvetica Neue", Helvetica, Arial, sans-serif;
$baskerville-stack:   Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
$monaco-stack:        Monaco, Consolas, "Lucida Console", monospace;
$trebuchet-ms-stack:  "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif;
```
