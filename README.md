# typey

A complete framework for working with typography on the web.

### Features

Supports outputting in rem, em and px.

```sass
$base-unit: rem;
```

Define font sizes inside a sass map as t-shirt sizes.

```sass
$font-size: (
  xl:   32px,
  l:    24px,
  m:    16px,
  s:    14px,
);

h1 {
  @include font-size(xl);
}
```

Automatic px fallbacks when using rem as the base unit.

```css
h1 {
  font-size: 32px;
  font-size: 2rem;
}
```

Easily convert px values to rem or em.

```sass
button {
  @include font-size(29px);
}
```

Automatic print media font sizing when using rem or em.

```css
@media print {
  html {
    font-size: 12pt;
  }
}
```

Define line-height, margin and padding as multiples of the base line height OR as static values.

```sass
h2 {
  @include line-height(3);
  @incude margin(10px 0);
}
```

Define font weights inside a sass map.

```sass
$font-weight: (
  bold:    700,
  normal:  400,
  lighter: 200
);

strong {
  font-weight: weight(bold)
}
```

Ready to go web safe font stacks that are easy to extend.

```sass
$your-font-stack: extend-font-stack("Open sans", $sans-serif-stack);
```

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

### Getting started

Just like in compass Vertical Rhythm we define our base font size and line height first. In typey, all sizes are defined in `px` only.

```sass
$base-font-size:    16px;
$base-line-height:  24px;
```

We also need to define the base unit that the functions and mixins will output. you can use `rem`, `em` or `px`.

```sass
$base-unit: rem;
```

You can now setup your type defaults like so:

```sass
html {
  @include define-type-sizing;
}
```

Define the `$font-size` map with t-shirt sizes (which are easier to keep track of then individual values).

```sass
$font-size: (
  xl:   32px,
  l:    24px,
  m:    16px,
  s:    14px,
);
```

To create print friendly stylesheets you must use a relative base unit (rem or em) - then all the work is taken care of for you. Optionally you can set the base print size like so:

```sass
$print-font-size: 12pt;
```

### Line height and font sizing examples

The simplest way to set font size is via the `font-size` mixin.

```sass
h1 {
  @include font-size(xl);
}
```

You can specify line height as a multiple of `$base-line-height` (for a vertical rhythm approach).

```sass
h2 {
  @include line-height(2);
}
```

Or for those finicky designs, you can just use a static `px` value for granular control.

```sass
h3 {
  @include line-height(35px);
}
```

And for short hand, do it all with the `type-layout` mixin.

```sass
h4 {
  @include type-layout(xl, 2);
}
```

When using `em` as your `$base-unit`, each mixin accepts a `$context` parameter so your `em` value will be relative to it's parent or element `font-size`. The `$context` parameter can either accept a t-shirt size or a static value in px. See the reference section below for more information.

```sass
h4 {
  @include type-layout(xl, 2);

  span {
    @include type-layout(s, 2, xl);
  }
}
```

### Margin and padding examples

The same mixins that we have for `line-height` also exist for `margin` and `padding`, and work exactly the same way.

```sass
div {
  @include margin-top(2);
  @include margin-right(1);
  @include margin-bottom(2);
  @include margin-left(1);
}

form {
  @include padding-top(2);
  @include padding-right(1);
  @include padding-bottom(2);
  @include padding-left(1);
}
```

You can use regular CSS short hand too.

```sass
div {
  @include margin(2 1);
  @include padding(2 1);
}
```

If you are using `em`, both the `margin()` and `padding()` functions/mixins accept a `$context` parameter.

```sass
div {
  @include font-size(s)
  @include margin(1 2, s);
  @include padding(1 2, s);
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
$browser-font-size:        16px !default;
```

The browser font size default. No need to change this.


```sass
$base-font-size:           16px !default;
```

The base font size will be used for most calculations involving font-size.
Allowed units: px


```sass
$base-line-height:         21px !default;
```

The base line height will be used for most calculations involving height.
Allowed units: px


```sass
$base-unit:                rem !default;
```

Allowed units: rem, em or px.


```sass
$rem-fallback:             true !default;
```

By default we will provide fallbacks when rem is the base unit.

```sass
$auto-print-sizing:        true !default;
```

By default, when rem or em are the base unit we will output a print suitable media query with the define-type-sizing() mixin. This will take care of all print media type sizing effortlessly.

```sass
$print-font-size:          12pt !default;
```

The pt font-size to be used with the print media query when $auto-print-sizing is enabled.
Allowed units: pt


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
Allowed units: px


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
(optional) Use to set to anything other than the base value. Allowed units: px

*@param number $base-line-height(optional)*  
Use to set to anything other than the base value. Allowed units: px


```sass
type-layout($size, $x, $context: $size)
```

Outputs both line-height and font-size properties, providing fallbacks when rem is the base unit.

*@param number|string $size*  
A size from the $font-size map or a px value.

*@param number $x*  
Multiple of line height to be used or px value to be converted.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.


```sass
font-size($size, $context: $base-font-size)
```

Outputs font-size property, providing fallbacks when rem is the base unit.

*@param number|string $size*  
A size from the $font-size map or px value to be converted

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the parent font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.


```sass
line-height($x, $context: $base-font-size)
```

Outputs line-height property, providing fallbacks when rem is the base unit.

*@param number $x*
Multiple of line height to be used or px value to be converted.

*@param number|string $context*
(optional) Only used if em is the $base-unit. The value of the elements/parentsfont-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.


```sass
margin($x, $context: $base-font-size)
```

Outputs margin property, providing fallbacks when rem is the base unit.

*@param number|list $x*  
Multiple of line height to be used or px value to be converted.  
Uses the same parameters as the CSS margin property:  
i.e. top right bottom left, 1 0 2 0.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.


```sass
padding($x, $context: $base-font-size)
```

Outputs padding property, providing fallbacks when rem is the base unit.

*@param number|list $x*  
Multiple of line height to be used or px value to be converted.  
Uses the same parameters as the CSS margin property:  
i.e. top right bottom left, 1 0 2 0.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.


```sass
margin-top($x, $context: $base-font-size)
margin-right($x, $context: $base-font-size)
margin-bottom($x, $context: $base-font-size)
margin-left($x, $context: $base-font-size)
```

Outputs corresponding margin property, providing fallbacks when rem is the base unit.

*@param number|list $x*  
Multiple of line height to be used or px value to be converted.  

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.


```sass
padding-top($x, $context: $base-font-size)
padding-right($x, $context: $base-font-size)
padding-bottom($x, $context: $base-font-size)
padding-left($x, $context: $base-font-size)
```

Outputs corresponding padding property, providing fallbacks when rem is the base unit.

*@param number|list $x*  
Multiple of line height to be used or px value to be converted.  

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.

### Functions

```sass
font-size($size, $context: $base-font-size)
```

*@param number|string $size*  
A size from the $font-size map or px value to be converted

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the parent font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.

*@return number*  
The selected font-size in $base-unit.


```sass
line-height($x, $context: $base-font-size)
```

*@param number $x*  
Multiple of line height to be used or px value to be converted.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parentsfont-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.

*@return number*  
The calculated height in $base-unit.


```sass
margin($x, $context: $base-font-size)
```

*@param number $x*  
Multiple of line height to be used or px value to be converted.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.

*@return number*  
The calculated height in $base-unit.


```sass
padding($x, $context: $base-font-size)
```

*@param number $x*  
Multiple of line height to be used or px value to be converted.

*@param number|string $context*  
(optional) Only used if em is the $base-unit. The value of the elements/parents font-size if it differs from $base-font-size. Specified as a t-shirt size or value in px.

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

Three standard do-all stacks.

```sass
$serif-stack:         TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
$sans-serif-stack:    "Helvetica Neue", Helvetica, Arial, sans-serif;
$monospaced-stack:    "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
```

Specific font stacks.

```sass
$arial-stack:         Arial, "Helvetica Neue", Helvetica, sans-serif;
$helvetica-stack:     "Helvetica Neue", Helvetica, Arial, sans-serif;
$baskerville-stack:   Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
$monaco-stack:        Monaco, Consolas, "Lucida Console", monospace;
$trebuchet-ms-stack:  "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif;
```
