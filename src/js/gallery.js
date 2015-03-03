var gallery = {
	gal:'',	
	mainCont : document.createElement('div'),
	imgsCont: document.createElement('div'),
    imgs: document.createElement('ul'),
    imgCont: document.createElement('li'),
    img: document.createElement('img'),
    prev: document.createElement('div'),
    next: document.createElement('div'),
    init: function(obj, data){
    	this.gal = document.getElementById(obj);
    	this.gal.style.display = 'none';
    	this.mainCont.className = 'gallery-container';
    	this.imgsCont.className = 'gallery-imgs-container'
    	this.imgs.className = 'gallery-imgs';
    	this.imgCont.className = 'gallery-img-container';
    	this.img.className = 'gallery-img';
    	this.prev.className = 'gallery-prev';
    	this.next.className = 'gallery-next';
    	
    	this.setImages(data.images);
    	
    	this.imgsCont.appendChild(this.imgs);
    	this.mainCont.appendChild(this.imgsCont);
    	this.gal.appendChild(this.mainCont);
    	this.gal.appendChild(this.prev);
    	this.gal.appendChild(this.next);
    	
    	this.gal.style.display = 'block';
    },
    setImages: function(srcs){
    	var cloneImgCont = "";
    	var cloneImg = "";
    	
    	for(var src in srcs){
    		cloneImgCont = this.imgCont.cloneNode(true);
    		cloneImg = this.img.cloneNode(true);
    		
    		cloneImg.src = srcs[src].image;
    		
    		cloneImgCont.appendChild(cloneImg);
    		this.imgs.appendChild(cloneImgCont);
    	}
    }
};