(function(b){function a(d,c){this.init(d,c)}a.prototype.init=function(e,d){var c=this;this.data=null;this.settings={videoId:null,debug:(window.location.search.indexOf("debug=1")>-1||window.location.search.indexOf("debug=true")>-1),triggerStart:false,afterInit:function(i,h){},countViews:true,showTitleWithPlaceholder:false};b.extend(this.settings,d);if(this.settings.videoId==null){var g=b(e).data("video-id");var f=parseInt(g,10);if(isNaN(f)){c.debug("no video ID");return false}this.settings.videoId=f}b.ajax({type:"GET",url:"/apps/video/details",data:{v:this.settings.videoId},dataType:"json"}).done(function(h){if(h.success===true){c.debug(h);this.data=h.video;c.insertVideo(b(e),this.data)}else{c.debug("failure on server")}})};a.prototype.debug=function(d){if(this.settings.debug&&window.console){try{window.console.log(d)}catch(c){}}};a.prototype.insertVideo=function(m,s){var o=this;var c='<video id="video_placeholder" class="video-js vjs-default-skin vjs-big-play-centered" preload="none">';var h="</video>";if(navigator.appVersion.indexOf("MSIE 7.")!=-1){if(s.versions.length>2){var i=s.versions[s.versions.length-2]["url"]}else{var i=s.versions[0]["url"]}m.html('<p class="unsupported">:( Sorry, you are using an unsupported browser. You can download the video here: <a style="color: #fff" href="'+i+'">download</a></p>');return}var e=m.height();var p=e;var l=m.width();var d=(s.isAudio===true);this.aspectRatio=s.versions[0].width/s.versions[0].height;if(!d){var p=m.width()/this.aspectRatio}else{p=360}if(p>e){p=e}if(p<150){p="100%"}m.height(p);this.singleVideo=j(s,d,this.settings.showTitleWithPlaceholder);if(d){m.append(c+k(this.singleVideo)+r(s,this.settings.forEditingCaptions)+h)}else{m.append(c+t(this.singleVideo)+r(s,this.settings.forEditingCaptions)+h)}var f={controls:true,height:p,width:l,poster:this.singleVideo.image,plugins:{resolutionSelector:{default_res:"360"}}};var g={controls:f.controls,height:f.height,width:"100%",poster:f.poster,plugins:f.plugins};this.myPlayer=videojs("video_placeholder",g);var n;if(this.settings.showTitleWithPlaceholder){n='<div class="vjs-info-bar vjs-control-bar"><a href="/apps/video/watch.jsp?v='+s.videoId+'" target="_top">'+this.singleVideo.title+"</a></div>"}else{n="<div></div>"}b("#video_placeholder").append(n);if(this.settings.triggerStart==true){this.myPlayer.load();this.myPlayer.play()}var q=document.fullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled;this.myPlayer.on("fullscreenchange",function(){if(q){return}var u=$parent.parents();var v=[];if(this.isFullscreen()){u.each(function(w,x){var y=b(x).css("z-index");v[w]=y;if(y!=="auto"){b(x).css("z-index",2147483647)}})}else{u.each(function(x,y){var w=v[x];if(w!=="auto"){b(y).css("z-index",w)}})}});if(o.settings.countViews===true){o._initializeViewCounting(o.myPlayer)}if(b("#go_hd").length>0){o._initializeHDButton(o.myPlayer)}o.settings.afterInit.call(o,s,o.myPlayer);function j(x,y,w){var u={};if(!y){var z=x.placeholders.PH720;if(!z){z=x.placeholders.PH360}if(!z){z=x.placeholders.THUMB}u={image:z,sources:v()}}else{u={image:"/apps/pics/audio_largethumb.png",sources:[{file:x.versions[0].url,label:x.versions[0].height}]}}if(w){u.title=x.title}return u;function v(){var A=new Array();b.each(x.versions,function(C,B){var D={file:B.url,label:B.height};if(B.height==360){D["default"]=true}A.push(D)});return A}}function t(u){var v="";b.each(u.sources,function(w,x){v+='<source src="'+x.file+'" type="video/mp4" data-res="'+x.label+'" />\n'});return v}function k(u){var v="";b.each(u.sources,function(w,x){v+='<source src="'+x.file+'" type="video/mp4" />'});return v}function r(z,x){var y={en:"English",es:"Spanish",fr:"French"};var w="English";var v="en";if(z.audioLanguage){var A=z.audioLanguage.substring(0,z.audioLanguage.indexOf("-"));w=y[A];v=A}var u="";u+='<track src="/apps/video/'+z.videoId+"/captions.vtt"+(x===true?'?populateIfEmpty" ':'" ')+'kind="captions"srclang="'+v+'" label="'+w+'" default>\n';return u}window.edlioVjsPlayer=this.myPlayer;this.myPlayer.ready(function(){window.dispatchEvent(new Event("edlio.video.ready"))})};a.prototype._initializeViewCounting=function(f){var h=this;var g=0,c=30,d=false,e=true;f.refreshIntervalId=setInterval(function(){if(!e&&!d&&!f.paused()){var i=f.duration();if(i>0&&(0.65*i)<c){c=i*0.65}h.debug("threshold: "+c);g++;if(g>c){h.incrementCount();d=true}h.debug("view count check "+g)}},1000);f.on("firstplay",function(){e=false})};a.prototype._initializeHDButton=function(d){var g=this;if(d.getResolutionsCount()<2){return}var c=true;d.on("firstplay",function(){if(c){if(b("#go_hd").length>0){if(d.getCurrentRes()==d.getHighestRes()){f()}b("#go_hd").show()}c=false}});d.on("changeRes",function(){if(d.getCurrentRes()==d.getHighestRes()){f()}else{e()}});b("#go_hd").on("click",function(h){d.trigger("changeToHd");h.preventDefault();if(b(this).hasClass("in-hd-mode")){if(d.hasDefaultRes()){d.trigger("changeToDefaultRes")}else{d.trigger("changeToLowestRes")}e()}else{d.trigger("changeToHighestRes");f()}});function f(){b("#go_hd").addClass("in-hd-mode");b("#go_hd").html("Go to standard definition")}function e(){b("#go_hd").html('Go <span class="hd-logo">HD</span>');b("#go_hd").removeClass("in-hd-mode")}};a.prototype.incrementCount=function(){var c=this;b.ajax({type:"POST",url:"/apps/video/increment",data:{v:this.settings.videoId},dataType:"json"}).done(function(d){if(d.success!==true){c.debug("Something went wrong incrementing")}})};a.prototype.changeDimensions=function(f,e){var d=b(f);var c=e.height;if(!c||isNaN(parseInt(c,10))){c=e.width/this.aspectRatio}d.height(c);this.myPlayer.height(c)};a.prototype.getCurrentVideoData=function(c){return this.data};b.fn.videoInitialize=function(c,d){return this.each(function(){var e=this;if(typeof c==="string"){var g=b.data(this,"videoInitialize");var f=g[c];if(c.charAt(0)!=="_"&&typeof f==="function"){f.call(g,this,d)}}else{b.data(this,"videoInitialize",new a(this,c))}})}})((typeof jq18=="function")?jq18:jQuery);