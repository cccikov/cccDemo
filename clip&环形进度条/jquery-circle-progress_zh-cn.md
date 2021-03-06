圆形进度条
======================

使用方法
-----

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="jquery-circle-progress/dist/circle-progress.js"></script>

<div id="circle"></div>

<script>
  $('#circle').circleProgress({
    value: 0.75,
    size: 80,
    fill: {
      gradient: ["red", "orange"]
    }
  });
</script>
```


 配置参数
-------

下面是该圆形进度条插件的一些可用参数：

| 参数 | 描述 |
| ---- | ---- |
| **value** | 这是唯一一个必填参数。值从 `0.0` 到 `1.0` <br> 默认值为: `0` |
| size | canvas的大小，单位像素<br> Default: `100` |
| startAngle | 	初始角度 (for `0` value) <br> Default: `-Math.PI` |
| reverse | 是否反向绘制圆弧和动画 <br> Default: `false` |
| thickness | 进度条圆弧的宽度。 默认它自动为 `size` 的 `1/14` 大小，你可以设置你需要的值。 <br> Default: `"auto"` |
| lineCap | Arc line cap: `"butt"`, `"round"` or `"square"` - [read more](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineCap) <br> Default: `"butt"`
| fill | 圆弧填充的配置:  <br>- `"#ff1e41"` <br>- `{ color: "#ff1e41" }` <br>- `{ color: 'rgba(255, 255, 255, .3)' }` <br>- `{ gradient: ["red", "green", "blue"] }` <br>- `{ gradient: [["red", .2], ["green", .3], ["blue", .8]] }` <br>- `{ gradient: [ ... ], gradientAngle: Math.PI / 4 }` <br>- `{ gradient: [ ... ], gradientDirection: [x0, y0, x1, y1] }` <br>- `{ image: "http://i.imgur.com/pT0i89v.png" }`<br>- `{ image: imageInstance }`<br>- `{ color: "lime", image: "http://i.imgur.com/pT0i89v.png" }` <br> Default: `{ gradient: ["#3aeabb", "#fdd250"] }` |
| emptyFill | 空圆弧的颜色. 暂时仅支持填充1种颜色 <br> Default: `"rgba(0, 0, 0, .1)"` |
| animation | 动画配置。 可以参考 [jQuery animations](http://api.jquery.com/animate/). <br> 你可以设置为 `false` 来禁止动画 <br> Default: `{ duration: 1200, easing: "circleProgressEasing" }`  <br> `"circleProgressEasing"` *是一个ease-in-out-cubic easing动画效果* |
| animationStartValue | 默认进度条动画会在 `0.0` 开始，结束与`value`处。调用该参数可以直接动画。如果需要制作反向动画就将`animationStartValue`的值设置为`1.0`。你可以指定`0.0`到`1.0`之间的任何数值。<br> Default: `0.0`
| insertMode | Canvas insertion mode: append or prepend it into the parent element? <br> Default: `"prepend"` |

From version `1.1.3` you can specify any config option as HTML `data-` attribute.

It will work *only on init*, i.e. after the widget is inited you may update its properties only via `.circleProgress({/*...*/})` method. `data-` attributes will be ignored.

Also, object options like `"fill"` or `"animation"` should be valid JSON (and don't forget about HTML-escaping):

```html
<div
  class="circle"
  data-value="0.9"
  data-size="60"
  data-thickness="20"
  data-animation-start-value="1.0"
  data-fill="{
    &quot;color&quot;: &quot;rgba(0, 0, 0, .3)&quot;,
    &quot;image&quot;: &quot;http://i.imgur.com/pT0i89v.png&quot;
  }"
  data-reverse="true"
></div>
```

事件
------

| 事件 | Description | Handler |
| ---- | ---- | ---- |
| `circle-inited` | Triggered on init or re-init. | `function(event)`: <br>- `event` - jQuery event |
| `circle-animation-start` | Triggered once the animation is started. | `function(event)`: <br>- `event` - jQuery event |
| `circle-animation-progress` | Triggered on each [animation tick](http://api.jquery.com/animate/#step). | `function(event, animationProgress, stepValue)`: <br>- `event` - jQuery event <br>- `animationProgress` - from `0.0` to `1.0` <br>- `stepValue` - current step value: from `0.0` to `value` |
| `circle-animation-end` | Triggered once the animation is finished. | `function(event)`: <br>- `event` - jQuery event |

Browsers support
----------------

The library uses `<canvas>` which is supported by all modern browsers *(including mobile browsers)*
and Internet Explorer 9+ ([Can I Use](http://caniuse.com/#search=canvas)).

I haven't implemented any fallback / polyfill for unsupported browsers yet
*(i.e. for Internet Explorer 8 and older / misc browsers)*.

UMD
---

I use [UMD template for jQuery plugin](https://github.com/umdjs/umd/blob/d31bb6ee7098715e019f52bdfe27b3e4bfd2b97e/templates/jqueryPlugin.js) which combines three things:

* works fine with _browser globals_
* works fine with AMD
* works fine with CommonJS

### Browser globals

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="jquery-circle-progress/dist/circle-progress.js"></script>
<script>
  $('#circle').circleProgress({
    value: 0.75,
  });
</script>
```

### AMD

Assuming that you have `jquery`, `jquery-circle-progress` and `requirejs` in `libs/` directory:

```html
<script src="libs/requirejs/require.js"></script>
<script>
  requirejs.config({
    paths: {
      'jquery': 'libs/jquery/dist/jquery', // 'jquery' path is required - 'jquery-circle-progress' requires it
      'jquery-circle-progress': 'libs/jquery-circle-progress/dist/circle-progress' // and this one is for your convenience
    }
  });
  requirejs(['jquery', 'jquery-circle-progress'], function($) {
    $('#circle').circleProgress({
      value: 0.75
    });
  });
</script>
```

You can [configure RequireJS](http://requirejs.org/docs/api.html) as you wish, just make `'jquery'` dependency reachable.

### CommonJS

```js
// script.js
require('jquery-circle-progress');
var $ = require('jquery');
$('#circle').circleProgress({
  value: 0.75
});
```

```sh
some-js-bundler < script.js > script.bundle.js
```

```html
<script src="script.bundle.js"></script>
```

You can use any JS bundler ([Webpack](https://webpack.github.io/), [Browserify](http://browserify.org/), etc) - no specific configuration required.

API
---

### 获取/设置 参数值

获取参数值:

```js
$('.circle').circleProgress({ value: 0.5 });
var value = $('.circle').circleProgress('value'); // 0.5
```

It will return the *first* item's value (by *first* I mean when `$('.circle').length >= 1`).
*It works only if the widget is already inited. Raises an error otherwise*.

设置参数值:

```js
$('.circle').circleProgress('value', 0.75); // set value to 0.75 & animate the change
```

It will update *all* selected items value and animate the change.
It doesn't *redraw* the widget - it updates the value & animates the changes.
For example, it may be an AJAX loading indicator, which shows the loading progress.

### 获取 `<canvas>`

```js
$('.circle').circleProgress({ value: 0.5 });
var canvas = $('.circle').circleProgress('widget');
```

It will return the *first* item's `<canvas>` (by *first* I mean when `$('.circle').length >= 1`).
*It works only if the widget is already inited. Raises an error otherwise*.

### 你可以获取 `CircleProgress` 对象实例

```js
var instance = $('#circle').data('circle-progress');
```

### 重新绘制

```js
$('#circle').circleProgress({ value: 0.5, fill: { color: 'orange' }});
$('#circle').circleProgress('redraw'); // use current configuration and redraw
$('#circle').circleProgress(); // alias for 'redraw'
$('#circle').circleProgress({ size: 150 }); // set new size and redraw
```

*It works only if the widget is already inited. Raises an error otherwise*.

### 改变默认的参数配置：

```js
$.circleProgress.defaults.size = 50;
```

FAQ
---

<dl>
<dt>How to start the animation only when the circle appears in browser's view (on scrolling)?
<dd>Here is <a href="https://github.com/kottenator/jquery-circle-progress/issues/8">my proposed solution</a>.
<dt>How to make the size flexible?
<dd>E.g. for responsive design, you can do it <a href="https://github.com/kottenator/jquery-circle-progress/issues/17">in the following way</a>.
<dt>What if I need it to run in IE8?
<dd>There is no full-feature support for IE8 (actually, I didn't imlpement IE8 support at all). But you may follow <a href="https://github.com/kottenator/jquery-circle-progress/issues/35">my recommendations</a>.
<dt>How to stop the animation?
<dd>Here is <a href="https://github.com/kottenator/jquery-circle-progress/issues/37">what you can do</a>.
<dt>Can I handle "click" event?
<dd>It's not in the "core" but you can use <a href="http://output.jsbin.com/fetequ/5">my example of mouse/touch events handling</a>.
<dt>May I customize the shape somehow?
<dd>It's a bit "tricky" but possible. Here is <a href="https://github.com/kottenator/jquery-circle-progress/wiki/Custom-layouts">my little collection</a>.
</dl>

Development
-----------

### Install

```sh
git clone git@github.com:kottenator/jquery-circle-progress.git
npm install
```

### Modify

You need to update `dist/circle-progress.min.js` after any change to `dist/circle-progress.js`:
 
```sh
npm run build-min
```

If you're using one of JetBrains IDEs - you can configure a File Watcher.
It's also possible to use some CLI tool like [Watchman](https://facebook.github.io/watchman/).

### Test

```sh
npm test
```

SauceLabs:

```sh
export SAUCE_USERNAME=...
export SAUCE_ACCESS_KEY=...
export BUILD_NUMBER=...
npm test -- karma-saucelabs.conf.js
```

### Build docs

The API docs are not complete yet but you can build them:

```sh
npm run build-docs
```

They will be generated in `docs/api/`.

### Release new version

* finalize the code
* update the version in `package.json`, `bower.json` and `dist/circle-progress.js` docstring
* update min dist: `npm run build-min`
* update `docs/index.html` - link to the latest dist version _(which doesn't exist yet)_
* push the changes to `master` branch
* release on Bower: just create a Git tag (e.g.): `git tag v1.2.3 && git push --tags`
* release on GitHub - add release notes to the Git tag
* release on NPM: `npm publish`, but be aware:
  
  > Once a package is published with a given name and version, that specific name and version combination can never be used again - [NPM docs](https://docs.npmjs.com/cli/publish)
