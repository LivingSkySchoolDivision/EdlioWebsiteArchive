var EventsMain=function(D){var b,j;var x="";var J=false;var a=D(".event-tags-form");var E=D("input[type=checkbox]");var u={};var O=0;var Q="showing-overlay";var P=false;var g=false;var q=false;var t=false;var L="/apps/events/";var y="print/";var m=false;var f=false;var C=(window.edlio!==undefined&&window.edlio.mobile===true);function z(){if(f&&window.console){var S="";for(var T=0;T<arguments.length;T++){S+=arguments[T]+" "}if(S!==""){console.log(S)}}}function H(S){if(window.JSON&&window.JSON.stringify){return JSON.stringify(S)}return"JSON.stringify not supported"}function p(T){var S=a.find("input:checked");try{if(S.length===O){D("#select_categories").hide();D("#deselect_categories").show()}else{D("#select_categories").show();D("#deselect_categories").hide()}}catch(U){}if(S.length>0){D(this).parent().toggleClass("checked");if(!C){h({categories:S.serialize()})}}else{D(this).prop("checked",true)}P=false}function F(T){T.preventDefault();var S=b+1;var U=j;if(S>12){S=1;U++}h({m:S,y:U})}function d(T){T.preventDefault();var S=b-1;var U=j;if(S<1){S=12;U--}h({m:S,y:U})}function N(T){T.preventDefault();var S=D(this).data("link-month");var V=D(this).data("link-year");var U=D(this).data("link-day");if(S===b&&V===j){B(U)}else{h({m:S,y:V,d:U})}}function B(U){if(typeof(U)==="number"){var S=D("#day-"+U);var T=S.offset().top;S.css("background-color","#FFFF9C").animate({backgroundColor:"transparent"},1000);D(window).scrollTop(T-7)}}function n(T){var S=D(this).data("link-month");var U=D(this).data("link-year");if(S===b&&U===j){return true}else{T.preventDefault();h({m:S,y:U})}}function h(T,S){if(T===null||typeof(T)!=="object"){T={}}if(typeof(T.m)!=="number"){T.m=b}if(typeof(T.y)!=="number"){T.y=j}if(typeof(T.categories)!=="string"){T.categories=x}if(typeof(S)!=="boolean"){S=false}b=T.m;j=T.y;x=T.categories;if(J){var U=R("",T);D.get(U+"&requestType=xhr",function(W){var V=D(W);D("#events_list_partial").replaceWith(V.find("#events_list_partial"));D("#list_title_partial").replaceWith(V.find("#list_title_partial"));D("#subscribe_link").replaceWith(V.find("#subscribe_link"));if(t&&!C){D("#calendar_grid_partial").replaceWith(V.find("#calendar_grid_partial"))}c();if(S&&t){v(T.categories)}if(!S){if(T.hasOwnProperty("d")){B(T.d)}z("pushing state",H(T));if(window.history&&window.history.pushState){window.history.pushState(T,null,U)}}})}else{z("replacing null initial state with",H(T));if(window.history&&window.history.replaceState){window.history.replaceState(T,null,null)}}}function R(S,T){var U="";if(S!==""&&S.indexOf(L)===-1){U=S}if(m){U="calendar/"+U}new_url=L+T.y+"/"+T.m+"/"+U+"?"+T.categories;return new_url}function v(S){var T=S.split("&");var U=[];for(i=0;i<T.length;i++){U.push(T[i].split("=")[1])}D.each(u,function(V,W){if(D.inArray(V,U)!==-1){W.addClass("checked").find(E).prop("checked",true)}else{W.removeClass("checked").find(E).prop("checked",false)}})}function c(){var S=b;var W=j;var U={y:j,m:b};var V;var T;if(b>=12){V={y:j+1,m:1}}else{V={y:j,m:b+1}}if(b<=1){T={y:j-1,m:12}}else{T={y:j,m:b-1}}V.categories=x;T.categories=x;U.categories=x;if(t===false&&m===false){D("#calendar_head .view-calendar").each(function(){D(this).prop("href",R("calendar/",U))})}D(".next-month").each(function(){D(this).prop("href",R(D(this).prop("href"),V))});D(".prev-month").each(function(){D(this).prop("href",R(D(this).prop("href"),T))});D("#print_calendar").each(function(){D(this).prop("href",R(y,U))})}function K(){return D(".event-tags-form input:checked").serialize()}function k(T){var S=T.originalEvent;z("pop state event fired");z("state:",H(S.state),S.title);if(S.state&&S.state!==null){h(S.state,true)}}function o(S){S.preventDefault();D("body").addClass(Q);A();if(!P){D.ajax(L+"overlay/?"+x,{global:false,success:function(T){z("successful");D("#top_contents").html(T);D("#year_overlay a.month-link").on("click",n);D("#year_overlay").show();setTimeout(function(){D("#top_contents").addClass("beShown")},1);P=true}})}else{A();setTimeout(function(){D("#year_overlay").show()},370)}}function G(S){S.preventDefault();D("#year_overlay").hide();r();D("body").removeClass(Q)}function A(){D("#overlay_coverup").show().animate({opacity:"0.86"})}function r(){D("#overlay_coverup").fadeOut(360)}function I(S){S.preventDefault();D("body").addClass(Q);A();setTimeout(function(){D("#tag_overlay").show()})}function e(T){T.preventDefault();D("#tag_overlay").hide();r();D("body").removeClass(Q);var S=a.find("input:checked");if(S.length>0){h({categories:S.serialize()})}}function s(S){D.each(u,function(){D(this).addClass("checked").find(E).prop("checked",true)});p(null)}function l(T){var S=false;D.each(u,function(){if(S){D(this).removeClass("checked").find(E).prop("checked",false)}else{D(this).addClass("checked").find(E).prop("checked",true);S=true}});p(null)}function w(T){T.preventDefault();var U=D(this);var S=U.prop("href");S+=(S.indexOf("?")===-1)?"?":"&";S+="requestType=xhr";D.ajax({url:S,global:false,success:function(Y){U.unbind(".events-first-time");var X=D(U.parents(".day-event-info")[0]);var V=X.find(".full-description");var W=X.find(".dateloc");V.html(Y).show();W.hide();U.bind("click",function(Z){Z.stopPropagation();Z.preventDefault();V.toggle();W.toggle()})}})}function M(){if(window.events_data){if(typeof(window.events_data.is_calendar_view)==="boolean"){m=window.events_data.is_calendar_view}b=window.events_data.current_month;j=window.events_data.current_year}if(window.events_data&&window.events_data.has_sidebar){t=window.events_data.has_sidebar}if(!t){if(window.events_data&&window.events_data.first_category){x=window.events_data.first_category}D(document).on("click",".mobile #goto_today",N)}else{x=K();a.find("button").hide();a.find(E).on("change",p);D(".event-tags-form li").each(function(){u[D(this).find(E).val()+""]=D(this);O++});a.find(".category-modifiers").show();document.getElementById("select_categories").addEventListener("keyup",function(S){if(S.code==="enter"||S.keyCode===13||S.which===13){s()}});document.getElementById("deselect_categories").addEventListener("keyup",function(S){if(S.code==="enter"||S.keyCode===13||S.which===13){l()}});D("#select_categories").fastClick(s);D("#deselect_categories").fastClick(l);D(document).on("click","#calendar_grid .minigrid-cell a, #calendar_grid #goto_today, .mobile #goto_today",N)}z("current month:",b);z("current year:",j);D(".next-month").fastClick(F);D(".prev-month").fastClick(d);D(window).on("popstate",k);D("body").ajaxStart(function(){q=true;D("#calendar_lower").css("opacity","0.28");setTimeout(function(){if(q){g=true;D("#calendar_loading_indicator").show()}},400)});D("body").ajaxSuccess(function(){q=false;D("#calendar_lower").css("opacity",1);if(g){D("#calendar_loading_indicator").hide()}});D("#events_list").on("click.events-first-time",".event-link",w);D('<div id="overlay_coverup"></div>').prependTo("body");if(!C){D('<div id="year_overlay"><div id="top_contents"></div></div>').prependTo("body");D("#show_year_overlay").on("click",o);D("#year_overlay, #overlay_coverup").on("click",G)}if(C){D("#show_tag_overlay").fastClick(I);D("#hide_tag_overlay").fastClick(e)}h(null);J=true}return{init:M}};jq18(document).ready(function(b){var a=EventsMain(b);a.init()});