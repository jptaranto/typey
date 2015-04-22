# typey
Do typography better.

*This repo contains alpha code and is likely to change at any point. Use at your own risk ;)*

### Features

* Use px (for screen) and pt (for print) and then output in px, pt, rem or em.
* Define font sizes inside a sass map as t-shirt sizes (m, l, xl, xxl).
* Define line-height as multiples of the base line height OR as static values.
* Automatic px fallbacks when using rem as the base unit.
* Define font weights inside a sass map.
* Ready to go web safe font stacks that are easy to extend.

### Getting started

Just like in the compass Vertical Rhythm (how does one spell rythym?) we define our base font-size and line-height first.

```sass
$base-font-size:    16px;
$base-line-height:  21px;
````

We also need to define the base unit that the functions and mixins will output. you can use px, pt (for print stylesheets), rem or em.

```sass
$base-unit: rem;
````

You can now setup your type defaults like so:

```sass
html {
  @include default-type-sizing;
}
```

Define your font-size map like below and use px (or pt) - which are easy to read and keep track of (not to mention convert from a design mockup).

```sass
$font-size: (
  xxxl: 60px,
  xxl:  46px,
  xl:   32px,
  l:    24px,
  m:    16px,
  s:    14px,
  xs:   12px
)
```

The t-shirt sizes make the px (or pt) values even easier to remember and calling them is as simple as this:

```sass
h1 {
  font-size: font-size(xxxl);
}
```

You can specify line-height as a multiple of $base-line-height (if you are using vertical rhythm).

```sass
h2 {
  line-height: line-height(3);
}
```

Or for those finicky designs, you can just use a static px value and have it output the correct unit.

```sass
h3 {
  line-height: line-height(43px);
}
```

Want to use rem for super lovely font resizing abilities? Px fallbacks are added automatically when using the mixins:

```sass
h4 {
  @include font-size(l);
  @include line-height(2);
}
```