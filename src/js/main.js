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

window.onload = function(){
	loadGalleryData();
}