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
        var that = this;

        this.prev.addEventListener('click', function(e){
            e.stopPropagation();

            if(that.currentImg > 1){

                that.curMargin = that.curMargin + 959;
                that.imgs.style.marginLeft = that.curMargin + "px";

                that.currentImg--;
            }else{
                that.curMargin =  -(959 * (that.totalImgs - 1));
                that.imgs.style.marginLeft = that.curMargin + "px";

                that.currentImg = that.totalImgs;
            }
            that.setMoreHref();
        });
    },

    setNextEvent: function(){
        var that = this;
        this.next.addEventListener('click', function(e){
            e.stopPropagation();
            console.log(that.currentImg);
            if(that.currentImg < that.totalImgs){

                that.curMargin = that.curMargin - 959;
                that.imgs.style.marginLeft = that.curMargin + "px";

                that.currentImg++;
            }else{
                that.curMargin = 0;
                that.imgs.style.marginLeft = that.curMargin + "px";
                that.currentImg = 1;
            }
            that.setMoreHref();
        });
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