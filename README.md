# typey

A complete framework for working with typography on the web.

## Requirements

libsass 3.3.0 / ruby-sass 3.3.0

## Installation

With npm, node-sass & eyeglass

* Terminal: `npm install typey --save-dev`
* SCSS: `@import 'typey'`

RubyGems & Compass

* Terminal: `gem install typey --pre`
* config.rb: `require 'typey'`
* SCSS: `@import 'typey'`

Bower

* Terminal: `bower install typey --save`
* SCSS: `@import 'bower_components/typey/typey'`

## Getting started

### How do I tell typey what to do?

Firstly, all values you input to typey are expressed with `px` as the unit, and
only `px` as the unit. This allows us to be completely consistent when dealing
with typography in our stylesheets.

Secondly, all strings in typey are expressed without quotes. Yes no quotes. This
makes for leaner and cleaner code.

### Decide how you want typey to output

First you'll need to choose the unit typey outputs your values in. You have three
choices: `rem`, `em`, or `px`. Each has it's own pros and cons. We don't quite
have enough space here to go over them so do your research before you jump in.
Generally speaking, it is actually quite easy to change this value in typey later on.

```sass
$base-unit: rem;
```

Now we define our base font size and line height.

```sass
$base-font-size:    16px;
$base-line-height:  24px;
```

Ok, so we have our base sizing, now we need to choose the approach that we are going
to layout type with. We have two options available to us: `rhythm` and `ratio`. Rhythm
allows us to specify line-heights as a multiple of $base-line-height, where as ratio
allows us to specify line-heights as a multiple of our elements font-size. Rhythm is
the default, but for many people working with web typography the simplest approach
is to use ratio.

```sass
$line-height-method: rhythm;
// or
$line-height-method: ratio;
```

If you are using ratio, you should set your base ratio as so. Ignore this one
if you are using rhythm.

```sass
$base-line-height-ratio: 1.5
```

By default typey will create print friendly stylesheets by adding a print media
query to the `html` element with a font-size defined in `pt`. This is really only
effective when you are using a relative unit as your `$base-unit` (rem or em). You
can override the base print size with this variable.

```sass
$print-font-size: 12pt;
```

Ok on to the fun stuff. Defining font sizes! You should define as many of your
font-sizes as possible inside the `$font-size` map with t-shirt sizes (which are
easier to keep track of than individual values). You can have as many as you like
and they can be any size you like. Use values taken from a design or roll your
own using a modular scale. T-shirt sizes are best practice here  but you can use
any naming scheme you like.

```sass
$font-size: (
  xl:   32px,
  l:    24px,
  m:    16px,
  s:    12px,
);
```

Now we are all set, we need to define our defaults for the `html` element. We can
do this easily:

```sass
html {
  @include define-type-sizing;
}
```

## Define typefaces. New in typey 1.0

Defining typefaces helps us keep track of a few common properties a typeface is
likely to need, ensuring they are all used together where ever the font is used
in our stylesheets.

First you need to define the font families you are going to use as variables.

```sass
$helvetica: Helvetica, sans-serif;
$garamond: Garamond, serif;
$monaco: Monaco, monospace, monospace;
```

Now you can define the $typefaces map. It accepts keyed values and lets you set
a font-family, letter-spacing, weight and case. It also uses shorthand and it
does not matter what order you list properties in when using shorthand but best
practice is [font-family] [letter-spacing] [weight] [case]. You may not want to
set these all globally, so font-family is the only required value.

```sass
$typefaces: (
  sans-serif: (
    font-family: $helvetica,
    letter-spacing: -.5px,
  ),
  serif: $garamond,
  monospace: (
    font-family: $monaco,
    letter-spacing: .5px,
    weight: bold,
    case: uppercase,
  )
);
```

Keep in mind the value for weight, is actually a key in the font-size map. By
default typey defines these with bold, normal and lighter, but if you need your
own weights, define the `$font-weight` map yourself.

Embedding a typeface is now really straightforward. You can sleep safe knowing
that all important defaults for your font have been included where ever the
typeface has been.

```sass
h1, h2, h3 {
  @include typeface(helvetica);
}
```

## Advanced typesetting. New in typey 1.0

You can now define all your font-sizes and line-heights (amongst other things) together
in a lovely, easy to read (and re-call) map.

```sass
$typestyles: (
  heading-1: (
    font-size: xl,
    line-height: 1.25,
    weight: bold,
    case: uppercase  
  ),
  heading-2: (
    font-size: l,
    line-height: 1.25,
    weight: normal
  )
)
```

Or you can use the even easier to express shorthand.

```sass
$typestyles: (
  heading-1: xl 1.25 bold uppercase,
  heading-2: l 1.25 normal
)
```

The shorthand is very forgiving. It only requires that the first value be a
font-size. After that you can enter any combination of line-height, font-weight,
and case (in any order and all properties are optional). You can also use a
combination of shorthand and keyed maps if you like!

The value for weight, is also a key from the `$font-weight` map.

To take a defined typestyle and then apply that to an element, all you need do
is:

```sass
h1 {
  @include typeset(heading-1);
}
```

In the beta versions of typey, the `type-layout` mixin was used to accomplish
virtually the same thing. While you can still use this method fine the new
`typeset` mixin provides a much cleaner solution and will be expanded to support
things like responsive type in the future.

```sass
h1 {
  @include type-layout(xl, 1.5);
}
```

### Using rhythm line-height

Using rhythm as the $line-height-method, you must make sure to set all line-height
values as multiples of $base-line-height. As so:

```sass
$typestyles: (
  heading-1: (
    font-size: xl,
    line-height: 2
  )
)
```

### Using ratio line-height

Using ratio as the $line-height-method, you must make sure to set all line-height
values as a ratio of the font-size. As so:

```sass
$typestyles: (
  heading-1: (
    font-size: xl,
    line-height: 1.25
  )
)
```

The advantage of ratio line-height is you can always skip out on adding a line-height
and just inherit the base ratio.

```sass
$typestyles: (
  heading-1: (
    font-size: xl
  )
)
```

All ratios are outputted as unitless values instead of your base unit.

## Add some margins or padding

Typey always uses a vertical rhythm approach for margins and padding regardless
of whether you are using the ratio method. This way margins and padding will
always be consistent in your stylesheets. You can specify these using the various
margin and padding mixins.

```sass
div {
  @include margin-top(2);
  @include margin-right(1);
  @include margin-bottom(2);
  @include margin-left(1);
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

## Slightly tricky stuff

Every now and then you aren't going to want to specify a size or height as a multiple,
ratio, or even a value from the `$font-size` map. You are going to want the ability
to override things with actual `px` values and have them output properly in your
base unit of choice. This is particularly useful for things like buttons or nav
bars when you want to have an exact px height.

```sass
button {
  @include line-height(50px);
}
```

Or for fidely, one-off font sizes.

```sass
.nav__dropdown-link {
  @include font-size(22px);
}
```

Or for some spacing you want to set manually.

```sass
li {
  @include margin(5px 0);
  @include padding(2px 0);
}
```

All of typey's font-size, line-height, type-layout, margin and padding mixins
accept a px value instead of a multiple/ratio or key from the $font-size map.

## Really quite tricky stuff (em as the $base-unit)

Ok so what if you are really adventurous and want to use `em` as your base unit.
Being relative to the element or parent's font-size, `em` can be particularly tricky when you
have nested elements that you want to set a font-size or line-height for. To do
this, each typey mixin has a $context argument that can be used to correctly
set what the sizing should be relative too.

In the below example we want to set the font size of a heading, and then give
the nested span element a smaller font size. We do this by passing the font-size
of the parent as the second argument to the mixin.

```sass
h2 {
  @include font-size(l);

  span {
    @include font-size(m, l);
  }
}
```

As you any nested element can have it's font-size changed, all of typeys sizing
mixins accept a context argument, including `typeset` and `type-layout`.

## Extras

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

## Debug grid

You can turn the debug grid on or off with the global variable below (and also choose
a custom color!).

```sass
$typey-debug: true;
$typey-debug-color: red;
```

Now the grid will show whenever a type-layout() or line-height() mixin is used and will
be sized to the element's line-height automatically. If you want to output it
manually you can use the typey-debug-grid() mixin, which takes a few arguments -
the line-height (as a ratio, multiplier or px value), and the context (only used
for ems), and also a custom color.

```sass
h1 {
  @include typey-debug-grid(2, $context: xl, $color: blue);
}
```

## More examples

Grab a copy of the source code and look in the examples folder to see typey in action.

## Reference

The reference section has been removed for now in favour of the better detailed examples above. For explanation on all the individual functions and mixins inside typey you can just download the source code and ogle at the documentation contained within. Once the typey website launches it will include a complete reference section. Stay tuned.
