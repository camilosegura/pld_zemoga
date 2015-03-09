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
	rq.open('GET', '../server/gallery_json.js');
	rq.setRequestHeader('Content-Type', 'application/json');
	rq.addEventListener('error', error, false);
	rq.send();
}


function buttonCollapser(){
	var btnMenuColl = document.querySelector(".menu-collapse");
	var menuFirst = document.querySelector(".menu-first");
	var hidden = true;
	var height = 0;
	
	height = menuFirst.offsetHeight;
	menuFirst.style.height = "0";

	console.log("__ " + height);
	
	btnMenuColl.addEventListener('click', function(){
		if(hidden){
		   menuFirst.style.height = height + "px";           
           hidden = false;
		}else{
			menuFirst.style.height = "0px";
			hidden = true;
		}

	});
}

(function initReady(){
	loadGalleryData();
})();

window.onload = function(){
    buttonCollapser();
}

