var WZ = require('../walk-z'),
		plot = require('node-scatterplot'),
		rndZ = require('random-z')

var wz0 = WZ(), // internal random
		wz1 = WZ(), // external z seed
		wz2 = WZ(), // constant seed
		pts = []

// curves generated in both directions to see if any discontinuity near 500
for (var i=501; i<1000; ++i) {
	pts.push([i,wz0(i), wz1(i, rndZ()), wz2(i, 0.1)]) ///Math.sqrt(i)
}
for (var j=500; j>0; --j) {
	pts.push([j,wz0(j), wz1(j, rndZ()), wz2(j, 0.1)]) ///Math.sqrt(i)
}

pts.sort(function(a,b) { return a[0] - b[0 ]})
plot(pts)
