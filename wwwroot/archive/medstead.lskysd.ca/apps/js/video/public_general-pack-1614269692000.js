(function(a){a(document).ready(function(){a("#searchbox").placeholder();a("body").on("click",".evenmore",function(f){f.preventDefault();a(this).parent(".more-string").hide();var d=a(this).attr("rel");a("#"+d).css("display","inline")});a(".evenmore").live("click",function(f){f.preventDefault();a(this).parent(".more-string").hide();var d=a(this).attr("rel");a("#"+d).css("display","inline")});a("#caption_toggle").on("click",function(f){f.preventDefault();var d=a(".caption textarea");var g=a("#caption_caret");d.toggleClass("showCaption");if(g.attr("class")){g.removeAttr("class")}else{g.attr("class","showCaption")}});function b(){a("#share_link, #share_close").bind("click",function(q){q.preventDefault();var m=a("#share_link");var p=a("#share_box");var r=a("#share_url, #share_embed");var s=function(){r.bind("focus",function(t){a(this).select()}).bind("mouseup",function(t){t.preventDefault();a(this).unbind("mouseup")}).bind("blur",function(t){r.unbind();s()})};s();var n=function(){p.slideDown("fast",function(){m.addClass("clicked");r[0].select();a.data(p,"processing",false)})};var o=function(){p.slideUp("fast",function(){m.removeClass("clicked");a("#change-dimensions-link").show();a("#change-dimensions-do").remove();j(k);a.data(p,"processing",true)})};if(a.data(p,"processing")){}else{a.data(p,"processing",true);if(!m.hasClass("clicked")){n()}else{o()}}});var g='<iframe class="edlio-embed-player" type="text/html" width="';var h='" height="';var e='" src="http://'+document.getElementById("wwwsiteurl").value+"/apps/embed/?v="+document.getElementById("titlerecid").value+'" frameborder="0" allowfullscreen></iframe>';var k=640;var d=9/16;var f=a("#share_embed");var l;var j=function(m){f.val(g+m+h+Math.round(m*d)+e)};var i='<p id="change-dimensions-do">Width: <select id="change-dimensions-input"><option value="960">Large (960x'+960*d+')</option> <option value="640" selected>Normal (640x'+640*d+')</option> <option value="480">Small (480x'+480*d+')</option> <option value="240">Extra Small (240x'+240*d+")</option> </select></p>";a("#change-dimensions-link").on("click",function(n){n.preventDefault();a("#change-dimensions").addClass("activated");var m=a(i);a(this).after(m).hide();m.find("select").on("change",function(o){j(a(this).val())})})}function c(){if(a("#change-dimensions-link").length>0){b()}}c()})})(jq18);