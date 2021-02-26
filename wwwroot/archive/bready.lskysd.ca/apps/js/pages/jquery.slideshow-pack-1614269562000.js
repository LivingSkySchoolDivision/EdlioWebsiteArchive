(function(e){function g(l,j){var k=e.extend({controlMarkup:'<div class="slideshow-controls"><a class="slideshow-control-playpause">'+f("Pause")+'</a><a class="slideshow-control-enlarge">'+f("Enlarge")+"</a></div>",transition:5000},j);this.init(l,k)}g.prototype.init=function(m,p){var w=this;this.isEdgeToEdge="full"===p.data.width;this.$el=e(m);this.settings=p;this.items=this.settings.data.items;this.currentSlide=0;this.$el.addClass("slideshow-wrapper");var y;if(this.isEdgeToEdge){y="slideshow-stage-ete"}else{y="slideshow-stage"}this.$el.html('<div class="'+y+'"></div>');this.$stage=this.$el.find("."+y);this.$controls=e(this.settings.controlMarkup);this.$controls.on("click",".slideshow-control-playpause",function(j){j.preventDefault();w.playPause();if(w.ticker.isActive){e(this).html(f("Pause"))}else{e(this).html(f("Play"))}});this.$controls.on("click",".slideshow-control-enlarge",function(j){j.preventDefault();e.proxy(w._modalVersion,w,w.items[w.currentSlide])()});this.$el.append(this.$controls);var o=[];for(var s=0;s<this.items.length;s++){o.push(this.items[s].versions[0].width)}var t=Math.max.apply(Math,o);var u=-1;for(var q=0;q<this.items.length;q++){var v=this.items[q].versions[0].width/this.items[q].versions[0].height;var l=t/v;u=Math.max(u,l);if(t/v>=u){this.tallestIndex=q}}this.$stage.html=('<div class="slide hidden-slide slide'+this.tallestIndex+'" />');const x=e('<div class="slide hidden-slide slide'+this.tallestIndex+'" />').appendTo(this.$stage);const n=new Image();const k=x.parents(".collapsible-content");if(k.length){k.css("display","block")}n.onload=function(){x.append(this);const z=x.find("img");const j=z.height();x.remove();if(k.length){k.css("display","none")}w.$stage.height(j);w.$stage.data("originalHeight",j);w.$stage.data("originalWidth",w.$stage.width());w.transitionTo(0,false)};n.src=this.items[this.tallestIndex].versions[0].url;if(this.items.length<2){this.$controls.find(".slideshow-control-playpause").remove();return}this.ticker=new a(this.settings.transition);this.ticker.start();this.ticker.bind("advance",function(){w.transitionTo()});var r=JSON.stringify({template:"apps/js/slideshow"});h(r,this.$controls);e(window).resize(c)};function c(){i(function(){e('[class^="slideshow-stage"]').each(function(){const l=e(this).data("originalHeight");const m=e(this).data("originalWidth");const k=e(this).width();const j=l/m*k;e(this).height(j)})},200,"slideshow-stage-resize")}var i=(function(){var j={};return function(m,k,l){if(!l){l="Don't call this twice without a uniqueId"}if(j[l]){clearTimeout(j[l])}j[l]=setTimeout(m,k)}})();g.prototype._getVersionByWidth=function(j,m){var n=0;for(var l=0;l<j.versions.length;l++){var k=j.versions[l];if(k.width>m){return k}if(k.width>j.versions[n].width){n=l}}return j.versions[n]};g.prototype.playPause=function(j){if(!this.ticker){return}if(this.ticker.isActive){this.ticker.stop()}else{if(!!j){this.transitionTo()}this.ticker.start()}};g.prototype.showControls=function(j){if(j){this.$controls.stop(true,true).fadeIn()}else{this.$controls.show()}};g.prototype.hideControls=function(j){if(j){this.$controls.stop(true,true).fadeOut()}else{this.$controls.hide()}};g.prototype.transitionTo=function(l,k){var m=this;if(isNaN(l)){l=this.getNextNatural()}if(l>=this.items.length){return}var o=this.$stage.find(".slide"+this.currentSlide);var n=this.$stage.find(".slide"+l);this.currentSlide=l;if(n.length==0){n=this.insertSlide(l)}var p="";if(this.items[l].hasOwnProperty("largerVersion")){if(k===false){enlargeAction="show"}else{enlargeAction="fadeIn"}}else{if(k===false){enlargeAction="hide"}else{enlargeAction="fadeOut"}}if(k===false){n.removeClass("slide-offstage")}else{var j=new b({effect:"crossFade"});j.animate(o,n)}m.$controls.find(".slideshow-control-enlarge")[enlargeAction]()};g.prototype.insertSlide=function(o){var r=this,j=this.items[o],p=this._getVersionByWidth(j,this.settings.stageWidth);var k=1.5*this.settings.stageWidth;var n=this._getVersionByWidth(j,k);if(n.width>this.settings.stageWidth){j.largerVersion=n}var m='<div class="slide slide'+o+' slide-offstage">';if(this.isEdgeToEdge){var q=j.versions[j.versions.length-1].url;if(""==q){q="/apps/svg/image-broken.svg#image-broken"}m+='<img src="'+q+'" alt="'+j.altText+'">'}else{m+='<img src="'+p.url+'" alt="'+j.altText+'">'}if(j.caption!=""){m+='<p class="slide-caption">'+j.caption+"</p>"}m+="</div>";var l=e(m);if(j.hasOwnProperty("largerVersion")){l.data("larger-version-url",j.largerVersion.url);l.addClass("has-larger-version");l.on("click",e.proxy(r._modalVersion,r,j))}this.$stage.append(l);return l};g.prototype._modalVersion=function(j){var k=this;window.edlio.openPopup(j.largerVersion.url,j.caption,j.altText,this.$stage.find(".slide"+this.currentSlide+" img"),function(){k.playPause(false)});this.playPause()};g.prototype.getNextNatural=function(){var j=this.currentSlide+1;if(j===this.items.length){j=0}return j};function b(j){this.effect=j.effect}MicroEvent.mixin(b);b.prototype.animate=function(k,l){var j=this;l.css({opacity:0,display:"block"}).removeClass("slide-offstage");this.animations[this.effect](k,l,function(){k.css("display","none");j.trigger("done")})};b.prototype.animations={crossFade:function(k,l,j){k.animate({opacity:0});setTimeout(function(){l.animate({opacity:1},j)},300)}};function a(j){this.intervalPeriod=j;this.interval=-1;this.isActive=false;return this}MicroEvent.mixin(a);a.prototype.start=function(){if(this.isActive===true){return}var j=this;this.isActive=true;this.interval=setInterval(function(){j.trigger("advance")},this.intervalPeriod)};a.prototype.stop=function(){clearInterval(this.interval);this.isActive=false};e.fn.slideShow=function(j,k){return this.each(function(){var m=this;if(typeof j==="string"){var l=e.data(this,"slideShow");var n=l[j];if(j.charAt(0)!=="_"&&typeof n==="function"){n.call(l,this,k)}else{console.log("API call not defined or no show instantiated")}}else{e.data(this,"slideShow",new g(this,j))}})};var d={};function f(j){if(d!=undefined&&j in d){return d[j]}return j}function h(k,j){e.post("/apps/localization",k).then(function l(m,n){if(n!=="success"){console.log("there was a problem while localizing this template")}d=JSON.parse(m).localizations;var o=e(j)[0].innerHTML;o=o.replace("Pause",f("Pause"));o=o.replace("Enlarge",f("Enlarge"));e(j).html(o)})}})((typeof jq111=="function")?jq111:jQuery);