(function(b){var a=(window.edlio!==undefined&&window.edlio.mobile===true);b.fn.imageLightbox=function(){return this.each(function(){if(a){return}var d=this;var e=b(this).find("img").first();var c=false,f=null;b(d).on("click",function(k){k.preventDefault();var g=b(this).prop("href"),h=b(this).find("figcaption").html(),m=k.target.alt;var i=function(){c=true;if(f){f.stop()}window.edlio.openPopup(g,h,m,e);b(d).removeClass("lightbox-image-is-loading")};if(!c){var l=new Image();var j={lines:9,length:5,width:6,radius:13,corners:1,rotate:0,direction:1,color:"#fff",speed:1,trail:72,shadow:false,hwaccel:true,className:"spinner",zIndex:2000000000,top:"auto",left:"auto"};setTimeout(function(){if(c){return}f=new Spinner(j).spin(b(d).parent()[0]);b(d).addClass("lightbox-image-is-loading")},300);l.onload=i;l.src=g}else{i()}})})};if(typeof window.edlio!="object"){window.edlio={}}window.edlio.openPopup=function(g,e,d,f,c){b.magnificPopup.open({items:{src:g,title:e,alt:d},type:"image",closeOnContentClick:true,mainClass:"mfp-with-zoom",image:{verticalFit:true},zoom:{enabled:true,duration:300,opener:function(h){return f}},callbacks:{close:function(){if(typeof c=="function"){c()}}}},0)}})((typeof jq111=="function")?jq111:jQuery);