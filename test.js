var ct = require('cotest'),
		TZ = require('./')

function normTest(first, last, fab, ttl) {
	var sum = 0,
			sum2 = 0,
			sumi = 0,
			sumij = 0,
			sumii = 0,
			delta = last < first ? -1 : +1,
			M = 500,
			N = M * (1 + (last < first ? (first - last) : (last - first)))
	for (var j = 0; j<M; j++) {
		var wk = fab()
		for (var i = first; i !== last; i += delta) {
			var xi = wk(i),
					xj = wk(j),
					rnd = xi / Math.sqrt(i)
			sum += rnd
			sum2 += rnd * rnd
			sumi += xi
			sumij = xi * xj
			sumii = xi * xi
		}
	}
	var scaledAverage = sum / N,
			average = sumi / N,
			scaledVariance = sum2 / N - scaledAverage * scaledAverage,
			variance = sumii / N - average*average,
			autocorrel = (sumij / N - average*average) / variance
	ct(ttl + ': ave, var, cor', t => {
		t('<', Math.abs(scaledAverage), 0.1)
		t('<', Math.abs(scaledVariance - 1), 0.1)
		t('<', Math.abs(autocorrel - 1), 0.05)
	})
}

normTest(1, 500, TZ, 'continuous, ascending')
normTest(500, 1, TZ, 'continuous, decending')
