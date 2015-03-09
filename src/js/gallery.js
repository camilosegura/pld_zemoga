var gallery = {
	gal:'',	
	mainCont : document.createElement('div'),
	imgsCont: document.createElement('div'),
    imgs: document.createElement('ul'),
    imgCont: document.createElement('li'),
    img: document.createElement('img'),
    prev: document.createElement('div'),
    next: document.createElement('div'),
    more: document.createElement('a'),
    moreText: document.createTextNode('LEARN MORE'),
    totalImgs: 0,
    currentImg:1,
    curMargin: 0,
    data:'',
    init: function(obj, data){
        this.data = data;

    	this.gal = document.getElementById(obj);
    	this.gal.style.display = 'none';
    	this.mainCont.className = 'gallery-container';
    	this.imgsCont.className = 'gallery-imgs-container';
    	this.imgs.className = 'gallery-imgs';
    	this.imgCont.className = 'gallery-img-container';
    	this.img.className = 'gallery-img';
    	this.prev.className = 'gallery-prev';
    	this.next.className = 'gallery-next';
        this.more.className = 'gallery-more';
    	
        

    	this.totalImgs = data.images.length;

        console.log(this.totalImgs);

        this.setImages(data.images);
    	this.setPrevEvent();
        this.setNextEvent();

        this.more.setAttribute('href', data.images[0].url);
        this.more.appendChild(this.moreText);
        this.imgsCont.appendChild(this.more);
    	this.imgsCont.appendChild(this.imgs);
    	this.mainCont.appendChild(this.imgsCont);
        this.mainCont.appendChild(this.prev);
        this.mainCont.appendChild(this.next);
    	this.gal.appendChild(this.mainCont);
    	
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
    },

    setPrevEvent: function(){
        this.prev.addEventListener('click', this.prevEventListener.bind(this));
    },
    prevEventListener: function(e){
        e.stopPropagation();

        if(this.currentImg > 1){

        	this.curMargin = this.curMargin + 959;
        	this.imgs.style.marginLeft = this.curMargin + "px";

        	this.currentImg--;
        }else{
        	this.curMargin =  -(959 * (this.totalImgs - 1));
        	this.imgs.style.marginLeft = this.curMargin + "px";

        	this.currentImg = this.totalImgs;
        }
        this.setMoreHref();
    },
    setNextEvent: function(){
        this.next.addEventListener('click',this.nextEventListener.bind(this));
    },
    nextEventListener:function(e){
    	e.stopPropagation();
        console.log(this.currentImg);
        if(this.currentImg < this.totalImgs){

            this.curMargin = this.curMargin - 959;
            this.imgs.style.marginLeft = this.curMargin + "px";

            this.currentImg++;
        }else{
            this.curMargin = 0;
            this.imgs.style.marginLeft = this.curMargin + "px";
            this.currentImg = 1;
        }
        this.setMoreHref();
    },
    setMoreHref: function(){
        setTimeout(this.changeMoreVisibility(1), 0);
        setTimeout(this.changeMoreVisibility(0.8), 400);
        setTimeout(this.changeMoreVisibility(0.4), 900);
        setTimeout(this.changeMoreVisibility(0), 1200);
        setTimeout(this.changeMoreVisibility(0.4), 1400);
        setTimeout(this.changeMoreVisibility(0.8), 1800);
        setTimeout(this.changeMoreVisibility(1), 2000);
        this.more.setAttribute("href", this.data.images[this.currentImg - 1].url);
    },
    changeMoreVisibility:function(opacity){
        console.log(opacity);
        this.more.style.opacity = opacity;
    }

};