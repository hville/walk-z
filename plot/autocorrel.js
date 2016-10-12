var Wk = require('../walk-z'),
		plot = require('node-scatterplot')

var wk = Wk(),
		pts=[]
for (var i=501; i<1000; ++i) {
	pts.push([wk(i), wk(i+1)])
}
for (var j=500; j>1; --j) {
	pts.push([wk(j), wk(j+1)])
}
pts.sort(function(a,b) {return a[0] - b[0]})
plot(pts)
