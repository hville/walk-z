var WZ = require('../walk-z'),
		plot = require('node-scatterplot')

var wz0 = WZ(),
		wz1 = WZ(),
		wz2 = WZ(),
		pts = []

// curves generated in both directions to see if any discontinuity near 500
for (var i=501; i<1000; ++i) {
	pts.push([i,wz0(i), wz1(i), wz2(i)]) ///Math.sqrt(i)
}
for (var j=500; j>0; --j) {
	pts.push([j,wz0(j), wz1(j), wz2(j)]) ///Math.sqrt(i)
}

pts.sort(function(a,b) { return a[0] - b[0 ]})
plot(pts)
