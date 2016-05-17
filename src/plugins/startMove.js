/**
 * mTween plugin
 */
function css(a, b, c) {
	if (2 == arguments.length) {
		if ("scale" == b || "rotate" == b || "rotateX" == b || "rotateY" == b || "scaleX" == b || "scaleY" == b || "translateY" == b || "translateX" == b || "translateZ" == b) switch (a.$Transform || (a.$Transform = {}), b) {
		case "scale":
		case "scaleX":
		case "scaleY":
			return "number" == typeof a.$Transform[b] ? a.$Transform[b] : 100;
		case "translateY":
		case "translateX":
		case "translateZ":
			return a.$Transform[b] ? a.$Transform[b] : 0;
		default:
			return a.$Transform[b] ? a.$Transform[b] : 0
		}
		var d = a.currentStyle ? a.currentStyle[b] : document.defaultView.getComputedStyle(a, !1)[b];
		return "opacity" == b ? Math.round(100 * parseFloat(d)) : parseInt(d)
	}
	if (3 == arguments.length) switch (b) {
	case "scale":
	case "scaleX":
	case "scaleY":
	case "rotate":
	case "rotateX":
	case "rotateY":
	case "translateY":
	case "translateX":
	case "translateZ":
		setCss3(a, b, c);
		break;
	case "width":
	case "height":
	case "paddingLeft":
	case "paddingTop":
	case "paddingRight":
	case "paddingBottom":
		c = Math.max(c, 0);
	case "left":
	case "top":
	case "marginLeft":
	case "marginTop":
	case "marginRight":
	case "marginBottom":
		a.style[b] = "string" == typeof c ? c : c + "px";
		break;
	case "opacity":
		a.style.filter = "alpha(opacity:" + c + ")";
		a.style.opacity = c / 100;
		break;
	default:
		a.style[b] = c
	}
	return function(b, c) {
		css(a, b, c)
	}
}
function setCss3(a, b, c) {
	var d = "",
		e = "",
		f = ["Webkit", "Moz", "O", "ms", ""];
	a.$Transform || (a.$Transform = {});
	a.$Transform[b] = parseInt(c);
	for (d in a.$Transform) switch (d) {
	case "scale":
	case "scaleX":
	case "scaleY":
		e += d + "(" + a.$Transform[d] / 100 + ") ";
		break;
	case "rotate":
	case "rotateX":
	case "rotateY":
		e += d + "(" + a.$Transform[d] + "deg) ";
		break;
	case "translateY":
	case "translateX":
	case "translateZ":
		e += d + "(" + a.$Transform[d] + "px) "
	}
	for (b = 0; b < f.length; b++) a.style[f[b] + "Transform"] = e
}
var Tween = {
	linear: function(a, b, c, d) {
		return c * a / d + b
	},
	easeIn: function(a, b, c, d) {
		return c * (a /= d) * a + b
	},
	easeOut: function(a, b, c, d) {
		return -c * (a /= d) * (a - 2) + b
	},
	easeBoth: function(a, b, c, d) {
		return 1 > (a /= d / 2) ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
	},
	easeInStrong: function(a, b, c, d) {
		return c * (a /= d) * a * a * a + b
	},
	easeOutStrong: function(a, b, c, d) {
		return -c * ((a = a / d - 1) * a * a * a - 1) + b
	},
	easeBothStrong: function(a, b, c, d) {
		return 1 > (a /= d / 2) ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b
	},
	elasticIn: function(a, b, c, d, e, f) {
		if (0 === a) return b;
		if (1 == (a /= d)) return b + c;
		f || (f = .3 * d);
		!e || e < Math.abs(c) ? (e = c, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(c / e);
		return -(e * Math.pow(2, 10 * --a) * Math.sin(2 * (a * d - c) * Math.PI / f)) + b
	},
	elasticOut: function(a, b, c, d, e, f) {
		if (0 === a) return b;
		if (1 == (a /= d)) return b + c;
		f || (f = .3 * d);
		if (!e || e < Math.abs(c)) {
			e = c;
			var h = f / 4
		} else h = f / (2 * Math.PI) * Math.asin(c / e);
		return e * Math.pow(2, -10 * a) * Math.sin(2 * (a * d - h) * Math.PI / f) + c + b
	},
	elasticBoth: function(a, b, c, d, e, f) {
		if (0 === a) return b;
		if (2 == (a /= d / 2)) return b + c;
		f || (f = .3 * d * 1.5);
		if (!e || e < Math.abs(c)) {
			e = c;
			var h = f / 4
		} else h = f / (2 * Math.PI) * Math.asin(c / e);
		return 1 > a ? -.5 * e * Math.pow(2, 10 * --a) * Math.sin(2 * (a * d - h) * Math.PI / f) + b : e * Math.pow(2, -10 * --a) * Math.sin(2 * (a * d - h) * Math.PI / f) * .5 + c + b
	},
	backIn: function(a, b, c, d, e) {
		"undefined" == typeof e && (e = 1.70158);
		return c * (a /= d) * a * ((e + 1) * a - e) + b
	},
	backOut: function(a, b, c, d, e) {
		"undefined" == typeof e && (e = 1.90158);
		return c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
	},
	backBoth: function(a, b, c, d, e) {
		"undefined" == typeof e && (e = 1.70158);
		return 1 > (a /= d / 2) ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
	},
	bounceIn: function(a, b, c, d) {
		return c - Tween.bounceOut(d - a, 0, c, d) + b
	},
	bounceOut: function(a, b, c, d) {
		return (a /= d) < 1 / 2.75 ? 7.5625 * c * a * a + b : a < 2 / 2.75 ? c * (7.5625 * (a -= 1.5 / 2.75) * a + .75) + b : a < 2.5 / 2.75 ? c * (7.5625 * (a -= 2.25 / 2.75) * a + .9375) + b : c * (7.5625 * (a -= 2.625 / 2.75) * a + .984375) + b
	},
	bounceBoth: function(a, b, c, d) {
		return a < d / 2 ? .5 * Tween.bounceIn(2 * a, 0, c, d) + b : .5 * Tween.bounceOut(2 * a - d, 0, c, d) + .5 * c + b
	}
};

function mTween(a, b, c, d, e, f) {
	var h = Tween[d],
		k = 0,
		l = {},
		m = {},
		n = c / 24,
		p = {},
		g = "";
	clearInterval(a.timer);
	for (g in b) l[g] = css(a, g), m[g] = b[g] - l[g], p[g] = 0;
	if (30 > c) for (g in b) css(a, g, b[g]);
	else a.timer = setInterval(function() {
		if (k < n) for (g in k++, b) p[g] = h(k, l[g], m[g], n), css(a, g, h(k, l[g], m[g], n));
		else {
			for (g in b) css(a, g, b[g]);
			clearInterval(a.timer);
			e && e.call(a)
		}
		f && f.call(a, l, p, k)
	}, 24)
};

module.exports = mTween;