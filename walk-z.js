var rndZ = require('random-z')

module.exports = walker

function walker(seed) {
	var rnd = seed || rndZ,
			xs = [0, 1],
			ys = [0, rnd()]

	return function walk(time) {
		if (time === 0) return 0
		var xx = time,
				j = upperBound(xs, xx)
		if (xs[j] === xx) return ys[j]
		var yy = rnd(),
				dxi = xx - xs[j-1]

		// normal case, memoryless, going on without a purpose
		if (j === xs.length) {
			yy *= Math.sqrt(dxi)
			yy += ys[j-1]

			xs[j] = xx
			ys[j] = yy
			return yy
		}

		// the future is already set try to get in line
		/*
			fa(y) = Ka * exp(- (y-ya)^2 / 2(x-xa) )
			fb(y) = Kb * exp(- (yb-y)^2 / 2(xb-x) )
			fab(y) = Kab * 1/exp( (yb-y)^2 / 2(xb-x) + (y-ya)^2 / 2(x-xa) )
			fab(y) = Kab * 1/exp( [ (x-xa)(yb-y)^2 + (xb-x)(y-ya)^2 ] / 2(xb-x)(x-xa) )
			fab(y) = ... (xb-xa)[ y^2 - y(2yb(x-xa)+2ya(xb-x))/(xb-xa) + (yb^2*(x-xa)+ya^2*(xb-x))/(xb-xa) ] / 2(xb-x)(x-xa)
			fab(y) = ... (xb-xa)[ y^2 - 2*y * (yb(x-xa)+ya(xb-x))/(xb-xa) + (yb^2*(x-xa)+ya^2*(xb-x))/(xb-xa) ] / 2(xb-x)(x-xa)
			average : (yb(x-xa)+ya(xb-x))/(xb-xa) === (yj*dxi + yi*dxj) / dx
			variance: (xb-x)(x-xa) / (xb-xa) === dxj * dxi / dx
		*/
		var dx = xs[j] - xs[j-1],
				dxj = xs[j] - xx
		yy *= Math.sqrt(dxi * dxj / dx)
		yy += (dxj * ys[j-1] + dxi * ys[j]) / dx

		xs.splice(j, 0, xx)
		ys.splice(j, 0, yy)
		return yy
	}
}
// binary search, return index<=target or arr.length
function upperBound(arr, v) {
	var low = 0,
			high = arr.length
	while (low < high) {
		var mid = (low + high) >>> 1
		if (arr[mid] < v) low = mid + 1
		else high = mid
	}
	return high
}
