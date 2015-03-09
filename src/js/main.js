var isRegister = false; 
var menuFirst = document.querySelector(".menu-first");
var hidden = true;

function response(){
	if(this.readyState === this.DONE && this.status === 200){
		var data = JSON.parse(this.responseText);
		gallery.init('gallery', data);
		return;
	}else{
		console.log(this.readyState);
		console.log(this.status);
	}
}


function error(e){
	console.log(e);
}


function loadGalleryData(){
	var rq = new XMLHttpRequest();
	rq.onreadystatechange = response;
	rq.open('GET', 'server/gallery_json.js');
	rq.setRequestHeader('Content-Type', 'application/json');
	rq.addEventListener('error', error, false);
	rq.send();
}


function buttonCollapser(){
	var btnMenuColl = document.querySelector(".menu-collapse");
	var height = 0;

	console.log("__ " + height);
	
	btnMenuColl.addEventListener('click', function(){
		if(hidden){
		   menuFirst.style.display = "block";           
           hidden = false;
		}else{
			menuFirst.style.display = "none";
			hidden = true;
		}

	});
}

function itemSubMenu(){
	var linkSubMenu = document.querySelectorAll(".item-container");
	var length = linkSubMenu.length;
	setDisplaySubMenu("none", ".items-sub-menu");
	for(var i = 0; i < length; i++){
		console.log(linkSubMenu);
		linkSubMenu[i].addEventListener('click', function(e){

			subMenuListener(this, ".items-sub-menu");
			
		});
	}
}

function subMenuListener(item, className){
	console.log(item);
	setDisplaySubMenu("none", className);
	item.childNodes[1].style.display = "block";
}

function setDisplaySubMenu(display, className){
	var subMenu = document.querySelectorAll(className);
	console.log(subMenu);
	var length = subMenu.length;
	for(var i = 0; i < length; i++){
		subMenu[i].style.display = display;
	}
}

function footerTitles(){
	var footerTitle = document.querySelectorAll(".footer-section");
	var length = footerTitle.length;
	setDisplaySubMenu("none", ".footer-section-links");
	for(var i = 0; i < length; i++){
	
		footerTitle[i].addEventListener('click', function(e){

			subMenuListener(this, ".footer-section-links");
			
		});
	}
}

function onResize(e){
	
	console.log(window.innerWidth);
	if(window.innerWidth < 769 && !isRegister){
		buttonCollapser();
		itemSubMenu();
		footerTitles();
		isRegister = true;
	}else if(window.innerWidth >= 769){
		setDisplaySubMenu("", ".footer-section-links");
		setDisplaySubMenu("", ".items-sub-menu");
	}else if(window.innerWidth < 769){
		setDisplaySubMenu("none", ".footer-section-links");
		setDisplaySubMenu("none", ".items-sub-menu");
		menuFirst.style.display = "";
		hidden = true;
	}
}

(function initReady(){
	loadGalleryData();
	window.onresize = onResize;
})();

window.onload = function(){
	onResize();
};

