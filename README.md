# Stylex

![npm](https://img.shields.io/npm/v/stylex?style=flat-square)
![NPM](https://img.shields.io/npm/l/stylex?style=flat-square)
![npm](https://img.shields.io/npm/dt/stylex?style=flat-square)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/ryanhefner/stylex?style=flat-square)

Utility for converting CSS styles in the DOM to Javascript, and back.

## Install

Via [NPM](https://npmjs.com/package/stylex)

```sh
npm install --save stylex
```

Via [Yarn](https://yarnpkg.fyi/stylex)

```sh
yarn add stylex
```

## Methods

Below are the static methods available on the `Stylex` class, along with examples how
each could be used.

### `Stylex.findDOMStyles(selector)`

Method that will return the `CSSRule.cssText` for the specified CSS selector.

_Example_

```js
const stylesText = Stylex.findDOMStyles('.example-class-name');
```

### `Stylex.convertCssText(CSSRule.cssText)`

Converts a `CSSRule.cssText` string to a JSON object that can be used/manipulated
in Javascript.

_Example_

```js
const styles = Stylex.convertCssText(Stylex.findDOMStyles('.example-class-name'));
```

### `Stylex.convertJsonStyles(object)`

In the event you need to go the opposite direction, you can convert a JSON object
of CSS styles to a string that could be applied as a `CSSRule.cssText`.

_Example_

```js
const stylesText = Stylex.convertJsonStyles({
    fontSize: '16px',
    backgroundColor: '#fff',
});
```

## Examples

This class spawned from the need to animate styles via Javascript, but with the
goal of being able to keep the styles defined in CSS as much as possible. It allows
you to find styles that are available in the DOM and convert those to JSON object(s)
that can be manipulated and applied to elements via Javascript.

And, in the event that you need to go the opposite direction—Javascript JSON style object
to CSS text—it supports that too! ;)

__Obtain Class Styles__

Pull the start and end styles for a given element, but calculate the current styles
based on a value only available via JS. This could be a progress that is provided
via a scroll position, time, or whatever else you might want to use to base the style
changes off of. The goal of this being, you don’t have to know the style attributes that
are being manipulated, which makes both the javascript and the way you manage styles
more flexible.

[View Example on Codepen](https://codepen.io/ryanhefner/project/details/ALYdOn/)

## Name Origin

In case anyone is curious, the name of this package has a dual meaning to me.
One, I think it pretty succinctly sums up what this class does, but it has a second
reference that is just as cool, to me at least. I went to school at Bowling Green
State University, where I was more into bands than school, but I still made it out
in 4 years, with good grades. I just didn’t make school my priority while I was there,
but back to the bands/music.

While attending school, there was a band that was based out of the BG/Toledo area called, Stylex.
They were a new wave band who made some great records, played some equally great shows, and
who I occassionally partied with. If you’re looking for some new/old tunes to listen to,
I would definitely recommend you check them out! [Stylex (the band)](https://stylex.bandcamp.com).

🐺 !!PARTY HOWL!! 🐺

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
