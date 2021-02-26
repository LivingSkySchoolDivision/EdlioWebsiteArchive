(function e(b,g,d){function c(m,j){if(!g[m]){if(!b[m]){var i=typeof require=="function"&&require;if(!j&&i){return i(m,!0)}if(a){return a(m,!0)}var k=new Error("Cannot find module '"+m+"'");throw k.code="MODULE_NOT_FOUND",k}var h=g[m]={exports:{}};b[m][0].call(h.exports,function(l){var o=b[m][1][l];return c(o?o:l)},h,h.exports,e,b,g,d)}return g[m].exports}var a=typeof require=="function"&&require;for(var f=0;f<d.length;f++){c(d[f])}return c})({1:[function(b,c,a){(function(k,h){var m=k.document,f=b("./src/utils/get-by-class"),l=b("./src/utils/extend"),o=b("./src/utils/index-of"),q=b("./src/utils/events"),g=b("./src/utils/to-string"),d=b("./src/utils/natural-sort"),i=b("./src/utils/classes"),n=b("./src/utils/get-attribute"),j=b("./src/utils/to-array");var p=function(x,u,s){var r=this,w,t=b("./src/item")(r),v=b("./src/add-async")(r);w={start:function(){r.listClass="list";r.searchClass="search";r.sortClass="sort";r.page=10000;r.i=1;r.items=[];r.visibleItems=[];r.matchingItems=[];r.searched=false;r.filtered=false;r.searchColumns=h;r.handlers={updated:[]};r.plugins={};r.valueNames=[];r.utils={getByClass:f,extend:l,indexOf:o,events:q,toString:g,naturalSort:d,classes:i,getAttribute:n,toArray:j};r.utils.extend(r,u);r.listContainer=(typeof(x)==="string")?m.getElementById(x):x;if(!r.listContainer){return}r.list=f(r.listContainer,r.listClass,true);r.parse=b("./src/parse")(r);r.templater=b("./src/templater")(r);r.search=b("./src/search")(r);r.filter=b("./src/filter")(r);r.sort=b("./src/sort")(r);this.handlers();this.items();r.update();this.plugins()},handlers:function(){for(var y in r.handlers){if(r[y]){r.on(y,r[y])}}},items:function(){r.parse(r.list);if(s!==h){r.add(s)}},plugins:function(){for(var y=0;y<r.plugins.length;y++){var z=r.plugins[y];r[z.name]=z;z.init(r,p)}}};this.reIndex=function(){r.items=[];r.visibleItems=[];r.matchingItems=[];r.searched=false;r.filtered=false;r.parse(r.list)};this.toJSON=function(){var A=[];for(var z=0,y=r.items.length;z<y;z++){A.push(r.items[z].values())}return A};this.add=function(z,E){if(z.length===0){return}if(E){v(z,E);return}var C=[],B=false;if(z[0]===h){z=[z]}for(var A=0,y=z.length;A<y;A++){var D=null;B=(r.items.length>r.page)?true:false;D=new t(z[A],h,B);r.items.push(D);C.push(D)}r.update();return C};this.show=function(y,z){this.i=y;this.page=z;r.update();return r};this.remove=function(D,C,z){var B=0;for(var A=0,y=r.items.length;A<y;A++){if(r.items[A].values()[D]==C){r.templater.remove(r.items[A],z);r.items.splice(A,1);y--;A--;B++}}r.update();return B};this.get=function(D,B){var C=[];for(var z=0,y=r.items.length;z<y;z++){var A=r.items[z];if(A.values()[D]==B){C.push(A)}}return C};this.size=function(){return r.items.length};this.clear=function(){r.templater.clear();r.items=[];return r};this.on=function(y,z){r.handlers[y].push(z);return r};this.off=function(z,B){var A=r.handlers[z];var y=o(A,B);if(y>-1){A.splice(y,1)}return r};this.trigger=function(z){var y=r.handlers[z].length;while(y--){r.handlers[z][y](r)}return r};this.reset={filter:function(){var z=r.items,y=z.length;while(y--){z[y].filtered=false}return r},search:function(){var z=r.items,y=z.length;while(y--){z[y].found=false}return r}};this.update=function(){var A=r.items,y=A.length;r.visibleItems=[];r.matchingItems=[];r.templater.clear();for(var z=0;z<y;z++){if(A[z].matching()&&((r.matchingItems.length+1)>=r.i&&r.visibleItems.length<r.page)){A[z].show();r.visibleItems.push(A[z]);r.matchingItems.push(A[z])}else{if(A[z].matching()){r.matchingItems.push(A[z]);A[z].hide()}else{A[z].hide()}}}r.trigger("updated");return r};w.start()};if(typeof define==="function"&&define.amd){define(function(){return p})}c.exports=p;k.List=p})(window)},{"./src/add-async":2,"./src/filter":3,"./src/item":4,"./src/parse":5,"./src/search":6,"./src/sort":7,"./src/templater":8,"./src/utils/classes":9,"./src/utils/events":10,"./src/utils/extend":11,"./src/utils/get-attribute":12,"./src/utils/get-by-class":13,"./src/utils/index-of":14,"./src/utils/natural-sort":15,"./src/utils/to-array":16,"./src/utils/to-string":17}],2:[function(b,c,a){c.exports=function(f){var d=function(h,j,g){var i=h.splice(0,50);g=g||[];g=g.concat(f.add(i));if(h.length>0){setTimeout(function(){d(h,j,g)},1)}else{f.update();j(g)}};return d}},{}],3:[function(b,c,a){c.exports=function(d){d.handlers.filterStart=d.handlers.filterStart||[];d.handlers.filterComplete=d.handlers.filterComplete||[];return function(k){d.trigger("filterStart");d.i=1;d.reset.filter();if(k===undefined){d.filtered=false}else{d.filtered=true;var j=d.items;for(var g=0,f=j.length;g<f;g++){var h=j[g];if(k(h)){h.filtered=true}else{h.filtered=false}}}d.update();d.trigger("filterComplete");return d.visibleItems}}},{}],4:[function(b,c,a){c.exports=function(d){return function(f,h,g){var i=this;this._values={};this.found=false;this.filtered=false;var j=function(l,n,m){if(n===undefined){if(m){i.values(l,m)}else{i.values(l)}}else{i.elm=n;var k=d.templater.get(i,l);i.values(k)}};this.values=function(l,m){if(l!==undefined){for(var k in l){i._values[k]=l[k]}if(m!==true){d.templater.set(i,i.values())}}else{return i._values}};this.show=function(){d.templater.show(i)};this.hide=function(){d.templater.hide(i)};this.matching=function(){return((d.filtered&&d.searched&&i.found&&i.filtered)||(d.filtered&&!d.searched&&i.filtered)||(!d.filtered&&d.searched&&i.found)||(!d.filtered&&!d.searched))};this.visible=function(){return(i.elm&&(i.elm.parentNode==d.list))?true:false};j(f,h,g)}}},{}],5:[function(b,c,a){c.exports=function(f){var d=b("./item")(f);var i=function(n){var l=n.childNodes,k=[];for(var m=0,j=l.length;m<j;m++){if(l[m].data===undefined){k.push(l[m])}}return k};var g=function(j,l){for(var m=0,k=j.length;m<k;m++){f.items.push(new d(l,j[m]))}};var h=function(j,k){var l=j.splice(0,50);g(l,k);if(j.length>0){setTimeout(function(){h(j,k)},1)}else{f.update();f.trigger("parseComplete")}};f.handlers.parseComplete=f.handlers.parseComplete||[];return function(){var k=i(f.list),j=f.valueNames;if(f.indexAsync){h(k,j)}else{g(k,j)}}}},{"./item":4}],6:[function(b,c,a){c.exports=function(g){var k,i,f,m,j;var h={resetList:function(){g.i=1;g.templater.clear();j=undefined},setOptions:function(n){if(n.length==2&&n[1] instanceof Array){f=n[1]}else{if(n.length==2&&typeof(n[1])=="function"){j=n[1]}else{if(n.length==3){f=n[1];j=n[2]}}}},setColumns:function(){if(g.items.length===0){return}if(f===undefined){f=(g.searchColumns===undefined)?h.toArray(g.items[0].values()):g.searchColumns}},setSearchString:function(n){n=g.utils.toString(n).toLowerCase();n=n.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&");m=n},toArray:function(o){var n=[];for(var p in o){n.push(p)}return n}};var l={list:function(){for(var n=0,o=g.items.length;n<o;n++){l.item(g.items[n])}},item:function(p){p.found=false;for(var n=0,o=f.length;n<o;n++){if(l.values(p.values(),f[n])){p.found=true;return}}},values:function(n,o){if(n.hasOwnProperty(o)){i=g.utils.toString(n[o]).toLowerCase();if((m!=="")&&(i.search(m)>-1)){return true}}return false},reset:function(){g.reset.search();g.searched=false}};var d=function(n){g.trigger("searchStart");h.resetList();h.setSearchString(n);h.setOptions(arguments);h.setColumns();if(m===""){l.reset()}else{g.searched=true;if(j){j(m,f)}else{l.list()}}g.update();g.trigger("searchComplete");return g.visibleItems};g.handlers.searchStart=g.handlers.searchStart||[];g.handlers.searchComplete=g.handlers.searchComplete||[];g.utils.events.bind(g.utils.getByClass(g.listContainer,g.searchClass),"keyup",function(p){var o=p.target||p.srcElement,n=(o.value===""&&!g.searched);if(!n){d(o.value)}});g.utils.events.bind(g.utils.getByClass(g.listContainer,g.searchClass),"input",function(o){var n=o.target||o.srcElement;if(n.value===""){d("")}});return d}},{}],7:[function(b,c,a){c.exports=function(g){g.sortFunction=g.sortFunction||function(j,i,h){h.desc=h.order=="desc"?true:false;return g.utils.naturalSort(j.values()[h.valueName],i.values()[h.valueName],h)};var f={els:undefined,clear:function(){for(var j=0,h=f.els.length;j<h;j++){g.utils.classes(f.els[j]).remove("asc");g.utils.classes(f.els[j]).remove("desc")}},getOrder:function(i){var h=g.utils.getAttribute(i,"data-order");if(h=="asc"||h=="desc"){return h}else{if(g.utils.classes(i).has("desc")){return"asc"}else{if(g.utils.classes(i).has("asc")){return"desc"}else{return"asc"}}}},getInSensitive:function(j,i){var h=g.utils.getAttribute(j,"data-insensitive");if(h==="false"){i.insensitive=false}else{i.insensitive=true}},setOrder:function(k){for(var m=0,j=f.els.length;m<j;m++){var l=f.els[m];if(g.utils.getAttribute(l,"data-sort")!==k.valueName){continue}var h=g.utils.getAttribute(l,"data-order");if(h=="asc"||h=="desc"){if(h==k.order){g.utils.classes(l).add(k.order)}}else{g.utils.classes(l).add(k.order)}}}};var d=function(){g.trigger("sortStart");var h={};var i=arguments[0].currentTarget||arguments[0].srcElement||undefined;if(i){h.valueName=g.utils.getAttribute(i,"data-sort");f.getInSensitive(i,h);h.order=f.getOrder(i)}else{h=arguments[1]||h;h.valueName=arguments[0];h.order=h.order||"asc";h.insensitive=(typeof h.insensitive=="undefined")?true:h.insensitive}f.clear();f.setOrder(h);h.sortFunction=h.sortFunction||g.sortFunction;g.items.sort(function(k,j){var l=(h.order==="desc")?-1:1;return(h.sortFunction(k,j,h)*l)});g.update();g.trigger("sortComplete")};g.handlers.sortStart=g.handlers.sortStart||[];g.handlers.sortComplete=g.handlers.sortComplete||[];f.els=g.utils.getByClass(g.listContainer,g.sortClass);g.utils.events.bind(f.els,"click",d);g.on("searchStart",f.clear);g.on("filterStart",f.clear);return d}},{}],8:[function(b,c,a){var d=function(h){var g,f=this;var i=function(){g=f.getItemSource(h.item);g=f.clearSourceItem(g,h.valueNames)};this.clearSourceItem=function(p,m){for(var o=0,k=m.length;o<k;o++){var q;if(m[o].data){for(var l=0,n=m[o].data.length;l<n;l++){p.setAttribute("data-"+m[o].data[l],"")}}else{if(m[o].attr&&m[o].name){q=h.utils.getByClass(p,m[o].name,true);if(q){q.setAttribute(m[o].attr,"")}}else{q=h.utils.getByClass(p,m[o],true);if(q){q.innerHTML=""}}}q=undefined}return p};this.getItemSource=function(o){if(o===undefined){var l=h.list.childNodes,k=[];for(var m=0,j=l.length;m<j;m++){if(l[m].data===undefined){return l[m].cloneNode(true)}}}else{if(/^tr[\s>]/.exec(o)){var n=document.createElement("table");n.innerHTML=o;return n.firstChild}else{if(o.indexOf("<")!==-1){var q=document.createElement("div");q.innerHTML=o;return q.firstChild}else{var p=document.getElementById(h.item);if(p){return p}}}}throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.")};this.get=function(q,n){f.create(q);var l={};for(var p=0,k=n.length;p<k;p++){var r;if(n[p].data){for(var m=0,o=n[p].data.length;m<o;m++){l[n[p].data[m]]=h.utils.getAttribute(q.elm,"data-"+n[p].data[m])}}else{if(n[p].attr&&n[p].name){r=h.utils.getByClass(q.elm,n[p].name,true);l[n[p].name]=r?h.utils.getAttribute(r,n[p].attr):""}else{r=h.utils.getByClass(q.elm,n[p],true);l[n[p]]=r?r.innerHTML:""}}r=undefined}return l};this.set=function(m,k){var l=function(q){for(var s=0,o=h.valueNames.length;s<o;s++){if(h.valueNames[s].data){var t=h.valueNames[s].data;for(var p=0,r=t.length;p<r;p++){if(t[p]===q){return{data:q}}}}else{if(h.valueNames[s].attr&&h.valueNames[s].name&&h.valueNames[s].name==q){return h.valueNames[s]}else{if(h.valueNames[s]===q){return q}}}}};var n=function(o,p){var r;var q=l(o);if(!q){return}if(q.data){m.elm.setAttribute("data-"+q.data,p)}else{if(q.attr&&q.name){r=h.utils.getByClass(m.elm,q.name,true);if(r){r.setAttribute(q.attr,p)}}else{r=h.utils.getByClass(m.elm,q,true);if(r){r.innerHTML=p}}}r=undefined};if(!f.create(m)){for(var j in k){if(k.hasOwnProperty(j)){n(j,k[j])}}}};this.create=function(k){if(k.elm!==undefined){return false}var j=g.cloneNode(true);j.removeAttribute("id");k.elm=j;f.set(k,k.values());return true};this.remove=function(j){if(j.elm.parentNode===h.list){h.list.removeChild(j.elm)}};this.show=function(j){f.create(j);h.list.appendChild(j.elm)};this.hide=function(j){if(j.elm!==undefined&&j.elm.parentNode===h.list){h.list.removeChild(j.elm)}};this.clear=function(){if(h.list.hasChildNodes()){while(h.list.childNodes.length>=1){h.list.removeChild(h.list.firstChild)}}};i()};c.exports=function(f){return new d(f)}},{}],9:[function(c,d,a){var b=c("./index-of");var f=/\s+/;var g=Object.prototype.toString;d.exports=function(i){return new h(i)};function h(i){if(!i||!i.nodeType){throw new Error("A DOM element reference is required")}this.el=i;this.list=i.classList}h.prototype.add=function(k){if(this.list){this.list.add(k);return this}var j=this.array();var l=b(j,k);if(!~l){j.push(k)}this.el.className=j.join(" ");return this};h.prototype.remove=function(k){if("[object RegExp]"==g.call(k)){return this.removeMatching(k)}if(this.list){this.list.remove(k);return this}var j=this.array();var l=b(j,k);if(~l){j.splice(l,1)}this.el.className=j.join(" ");return this};h.prototype.removeMatching=function(l){var j=this.array();for(var k=0;k<j.length;k++){if(l.test(j[k])){this.remove(j[k])}}return this};h.prototype.toggle=function(i,j){if(this.list){if("undefined"!==typeof j){if(j!==this.list.toggle(i,j)){this.list.toggle(i)}}else{this.list.toggle(i)}return this}if("undefined"!==typeof j){if(!j){this.remove(i)}else{this.add(i)}}else{if(this.has(i)){this.remove(i)}else{this.add(i)}}return this};h.prototype.array=function(){var j=this.el.getAttribute("class")||"";var k=j.replace(/^\s+|\s+$/g,"");var i=k.split(f);if(""===i[0]){i.shift()}return i};h.prototype.has=h.prototype.contains=function(i){return this.list?this.list.contains(i):!!~b(this.array(),i)}},{"./index-of":14}],10:[function(b,d,a){var h=window.addEventListener?"addEventListener":"attachEvent",f=window.removeEventListener?"removeEventListener":"detachEvent",g=h!=="addEventListener"?"on":"",c=b("./to-array");a.bind=function(n,m,l,j){n=c(n);for(var k=0;k<n.length;k++){n[k][h](g+m,l,j||false)}};a.unbind=function(n,m,l,j){n=c(n);for(var k=0;k<n.length;k++){n[k][f](g+m,l,j||false)}}},{"./to-array":16}],11:[function(b,c,a){c.exports=function d(g){var f=Array.prototype.slice.call(arguments,1);for(var h=0,k;k=f[h];h++){if(!k){continue}for(var j in k){g[j]=k[j]}}return g}},{}],12:[function(b,c,a){c.exports=function(j,f){var d=(j.getAttribute&&j.getAttribute(f))||null;if(!d){var g=j.attributes;var k=g.length;for(var h=0;h<k;h++){if(f[h]!==undefined){if(f[h].nodeName===f){d=f[h].nodeValue}}}}return d}},{}],13:[function(b,c,a){c.exports=(function(){if(document.getElementsByClassName){return function(d,f,g){if(g){return d.getElementsByClassName(f)[0]}else{return d.getElementsByClassName(f)}}}else{if(document.querySelector){return function(d,f,g){f="."+f;if(g){return d.querySelector(f)}else{return d.querySelectorAll(f)}}}else{return function(d,m,n){var o=[],p="*";if(d===null){d=document}var h=d.getElementsByTagName(p);var f=h.length;var l=new RegExp("(^|\\s)"+m+"(\\s|$)");for(var k=0,g=0;k<f;k++){if(l.test(h[k].className)){if(n){return h[k]}else{o[g]=h[k];g++}}}return o}}}})()},{}],14:[function(b,c,a){var d=[].indexOf;c.exports=function(f,h){if(d){return f.indexOf(h)}for(var g=0;g<f.length;++g){if(f[g]===h){return g}}return -1}},{}],15:[function(b,c,a){c.exports=function(D,C,t){var w=/(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[\da-fA-F]+$|\d+)/g,m=/^\s+|\s+$/g,v=/\s+/g,E=/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,l=/^0x[0-9a-f]+$/i,g=/^0/,j=t||{},A=function(i){return j.insensitive&&(""+i).toLowerCase()||""+i},q=A(D)||"",o=A(C)||"",k=q.replace(w,"\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),s=o.replace(w,"\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),n=parseInt(q.match(l),16)||(k.length!==1&&Date.parse(q)),z=parseInt(o.match(l),16)||n&&o.match(E)&&Date.parse(o)||null,d=function(x,i){return(!x.match(g)||i==1)&&parseFloat(x)||x.replace(v," ").replace(m,"")||0},B,f;if(z){if(n<z){return -1}else{if(n>z){return 1}}}for(var r=0,u=k.length,h=s.length,p=Math.max(u,h);r<p;r++){B=d(k[r],u);f=d(s[r],h);if(isNaN(B)!==isNaN(f)){return(isNaN(B))?1:-1}else{if(typeof B!==typeof f){B+="";f+=""}}if(B<f){return -1}if(B>f){return 1}}return 0}},{}],16:[function(c,f,b){f.exports=function d(j){if(typeof j==="undefined"){return[]}if(j===null){return[null]}if(j===window){return[window]}if(typeof j==="string"){return[j]}if(a(j)){return j}if(typeof j.length!="number"){return[j]}if(typeof j==="function"&&j instanceof Function){return[j]}var g=[];for(var h=0;h<j.length;h++){if(Object.prototype.hasOwnProperty.call(j,h)||h in j){g.push(j[h])}}if(!g.length){return[]}return g};function a(g){return Object.prototype.toString.call(g)==="[object Array]"}},{}],17:[function(b,c,a){c.exports=function(d){d=(d===undefined)?"":d;d=(d===null)?"":d;d=d.toString();return d}},{}]},{},[1]);