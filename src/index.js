/**
 * @author Perlou
 * @index.js
 */

'use strict';

// css
require('./styles/App.css')

// js
require('core-js/fn/object/assign');
var mTween = require('./plugins/startMove.js');
var nTouch = require('./plugins/touch.js').nTouch;

var imgUrls=['images/img1.jpeg','images/img2.jpeg','images/img3.jpeg','images/img4.jpeg'];

setSize();
window.addEventListener('resize',setSize,false);
window.addEventListener('orientationchange',setSize,false);

window.onload = loadFn();

function loadFn(){
	setLayout();
	var list=id('imgList'),
		boxs=list.getElementsByClassName('div'),
		now=0,
		timer=0,
		off=false;

	// 向左滑动
	nTouch(list).swipeLeft(function(){
			if(off)
			{
				return;
			}
			off=true;
			now++;
			var i=0;
			clearInterval(timer);
			timer=setInterval(
				function (){
					if(i==3)
					{
						clearInterval(timer);
					}
					tabImg(i,-1);
					i++;
				},
				30
			);
			tabNav();
	});

	// 向右滑动
	nTouch(list).swipeRight(function(){
			if(off)
			{
				return;
			}
			off=true;
			now--;
			var i=0;
			clearInterval(timer);
			timer=setInterval(
				function (){
					if(i==3)
					{
						clearInterval(timer);
					}
					tabImg(i,1);
					i++;
				},
				30
			);
			tabNav();
	});

	function tabImg(rows,dis){
		var timer2=0;
		var start= dis>0? rows*4 : (rows+1)*4-1;
		var end= dis>0?  (rows+1)*4-1 : rows*4;
		timer2=setInterval(
			function() {
				if(start == end)
				{
					clearInterval(timer2);
				}
				if(rows==3 && start == end)
				{
					mTween(boxs[start],{rotateY:-90*now},600,"backOut",
						function (){
							off=false;
						}
					);
				}
				else
				{
					mTween(boxs[start],{rotateY:-90*now},600,"backOut");
				}
				start+=dis;
			},
			60
		);
	}
	function tabNav(){
		var navs=id("navs").children;
		var nub=now%navs.length;
		if(nub<0){
			nub+=navs.length;
		}
		for(var i=0; i<navs.length; i++){
			navs[i].className="";
		}
		navs[nub].className="active";
	}

}

function setLayout(){
	var list=id('imgList');
	var li=list.getElementsByTagName('li');
	var css=id('css');
	var str='';
	var listH=list.clientHeight;
	var liH=listH/4;
	for( var i=0; i<16; i++){
		str+='<li><div class="div"><div><span></span><div><span></span><div><span></span><div><span></span></div></div></div></div></div></li>';
	}
	list.innerHTML=str;
	css.innerHTML+='#imgList li{height:'+liH+'px}';
	for(var i=0; i<li.length; i++){
		var span=li[i].getElementsByTagName('span');
		for(var j=0; j<span.length; j++){
			span[j].style.backgroundImage='url('+imgUrls[j]+')';
			span[j].style.backgroundPosition=-(i%4)*4+'rem -'+parseInt(i/4)*liH+'px';
		}
	}
}

function id(idName) {
	return document.getElementById(idName); 
}

function setSize(){
	var oHtml = document.getElementsByTagName('html')[0],
		iWidth = oHtml.getBoundingClientRect().width || document.documentElement.clientWidth;
	oHtml.style.fontSize = iWidth/16 + 'px';	
}

