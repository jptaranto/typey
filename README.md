# typey

A complete framework for working with typography on the web.

## Requirements

Sass 3.3.0

## Installation

With RubyGems & Compass:

* Terminal: `gem install typey --pre`
* config.rb: `require 'typey'`
* SCSS: `@import 'typey'`

Bower

* Terminal: `bower install typey`
* SCSS: `@import '../link_to_component_dir/typey'`

Vanilla Sass

* Terminal: `git clone git@github.com:jptaranto/typey.git`
* SCSS: `@import '../link_to_component_dir/typey/stylesheets/typey'`

## Getting started

### How do I tell typey what to do?

Firstly, all values you input to typey are expressed with `px` as the unit, and
only `px` as the unit. This allows us to be completely consistent when dealing
with typography in our stylesheets.

Secondly, all strings in typey are expressed without quotes. Yes no quotes. This
makes for leaner and cleaner code.

### Decide how you want typey to output

Now you'll need to choose the unit typey outputs your values in. You have three
choices: `rem`, `em`, or `px`. Each has it's own pros and cons. We don't quite
have enough space here to go over them so do your research before you jump in.
Generally speaking, it is actually quite easy to change this value in typey later on.

```sass
$base-unit: rem;
```

Just like in compass Vertical Rhythm we define our base font size and line height.

```sass
$base-font-size:    16px;
$base-line-height:  24px;
```

Ok, so we have our base sizing, now we need to choose the approach that we are going
to layout type with. We have two options available to us: `rhythm` and `ratio`. Rhythm
allows us to specify line-heights as a multiple of $base-line-height, where as ratio
allows us to specify line-heights as a multiple of our elements font-size. Rhythm is
the default, but for beginners working with web typography the simplest approach
is to use ratio. Each example below will tell you which method it is for.

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
easier to keep track of than individual values).

```sass
$font-size: (
  xl:   32px,
  l:    24px,
  m:    16px,
  s:    12px,
);
```

Now we are all set, we need to define our defaults for the `html` element. We can
do this as easily as below:

```sass
html {
  @include define-type-sizing;
}
```

## The quickest way to lay out type. Ever.

### Rhythm method

In the example below, we are taking a heading, giving it an extra-large font-size and
setting it's line-height to be 2x the $base-line-height.

```sass
h1 {
  @include type-layout(xl, 2);
}
```

### Ratio method

As we have already set a base ratio, we don't really need to worry about setting
the line-height as all elements will just inherit from the `html` element.

```sass
h1 {
  @include font-size(xl);
}
```

But if we did want to override the base ratio, we can do it like so:

```sass
h1 {
  @include type-layout(xl, 1.75);
}
```

All ratios are outputted as unitless values instead of your base unit.

## Add some margins or padding

A key component of typography is the space between elements. Typey always uses
a vertical rhythm approach for margins and padding regardless of whether you are
using the ratio method. This way margins and padding will always be consistent
in your stylesheets. You can specify these using the various margin and padding mixins.

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

All of typey's mixins accept a px value instead of a multiple/ratio or key from
the $font-size map.

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

If we are using the type-layout() mixin we can do the same thing like below:

```sass
h2 {
  @include type-layout(l, 2);

  span {
    @include type-layout(m, 2, l);
  }
}
```

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

Grab a copy of the source code (make sure you get the same version you have installed) and look in the examples folder to see typey in action.
## Reference

The reference section has been removed for now in favour of the better detailed examples above. For explanation on all the individual functions and mixins inside typey you can just download the source code and ogle at the documentation contained within. Once the typey website launches it will include a complete reference section. Stay tuned.
