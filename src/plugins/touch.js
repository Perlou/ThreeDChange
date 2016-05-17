/**
 * @author Perlou
 * @touch.js
 */

document.addEventListener("touchmove", function(a) {
	a.preventDefault()
}, !1);

function Touch(a) {
	var b = this;
	this.obj = a;
	this.bTap = !1;
	this.start = {
		x: 0,
		y: 0
	};
	this.obj.addEventListener("touchstart", function(a) {
		b.fnStart(a)
	}, !1);
	this.obj.addEventListener("touchmove", function(a) {
		b.fnMove(a)
	}, !1);
	this.obj.addEventListener("touchend", function(a) {
		b.fnEnd(a)
	}, !1)
}
Touch.prototype = {
	fnStart: function(a) {
		a = a.changedTouches[0];
		this.bTap = !0;
		this.start = {
			x: a.pageX,
			y: a.pageY
		}
	},
	fnMove: function(a) {
		a = a.changedTouches[0];
		this.Move = {
			x: a.pageX,
			y: a.pageY
		};
		this.bTap = !1
	},
	fnEnd: function(a) {
		this.bTap && this.fnTap && this.fnTap.call(this.obj);
		this.Move && (50 < Math.abs(this.Move.x - this.start.x) && (0 > this.Move.x - this.start.x ? this.fnSwipeLeft && this.fnSwipeLeft.call(this.obj) : this.fnSwipeRight && this.fnSwipeRight.call(this.obj)), 50 < Math.abs(this.Move.y - this.start.y) && (0 > this.Move.y - this.start.y ? this.fnSwipeUp && this.fnSwipeUp.call(this.obj) : this.fnSwipeDown && this.fnSwipeDown.call(this.obj)), this.Move = {})
	},
	tap: function(a) {
		this.fnTap = a
	},
	swipeLeft: function(a) {
		this.fnSwipeLeft = a
	},
	swipeRight: function(a) {
		this.fnSwipeRight = a
	},
	swipeUp: function(a) {
		this.fnSwipeUp = a
	},
	swipeDown: function(a) {
		this.fnSwipeDown = a
	}
};

function nTouch(a) {
	return new Touch(a)
};

module.exports = {
	Touch: Touch,
	nTouch: nTouch
};

