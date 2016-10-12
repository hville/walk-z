<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->
# walk-z

*approximation of a random walk where any point in time can be reached without recursion*

• [Introduction](#introduction) • [API](#usage) • [License](#license) •

## Introduction

Made for Simulations where a full time serie is required for a given simulation.
Past values are retained to provide new random values that are consistent with previously returned pasts and futures.

This is not a true random walk but *a simulation for simulations*. You probably don't need this. Use with caution.

Like a random walk:

* `E( y(t) ) = 0`
* `V( y(t) ) = t`
* `Cov( y(t), y(t+1) ) = 1`

Shift and scale the results as required

## API

The factory function usually takes no parameters and returns a random time serie.

```javascript
var WalkZ = require('walk-z')
var walker = WalkZ()
var positionAtTime100 = walker(100)
var positionAtTime200 = walker(200)
var positionAtTime2 = walker(2)
```

For testing or for generating correlated curves, an option normal distribution generator can be provided:

```javascript
var WalkZ = require('walk-z')
//randomZ is a function that takes no parameter and returns a unit normal distribution
var walker = WalkZ(randomZ)
var positionAtTime3 = walker(3)
```

## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
