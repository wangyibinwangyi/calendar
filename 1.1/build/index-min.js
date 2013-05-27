/*! calendar - v1.1 - 2013-05-27 11:34:23 AM
* Copyright (c) 2013 昂天; Licensed  */
KISSY.add("gallery/calendar/1.1/index",function(a,b,c){function d(){d.superclass.constructor.apply(this,arguments),this.initializer()}var e=b.all,f=a.each,g=a.substitute,h=a.UA.ie,i=/\d+/g,j=/^((19|2[01])\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])$/,k=e(document.body),l=e(window),m=e(document);return a.TripCalendar=a.extend(d,c,{initializer:function(){this._hide=!0,this._setUniqueTag().renderUI(),this._minDateCache=this.get("minDate"),this._clickoutside=function(b){var c=a.one(b.target);c.hasClass(this._triggerNodeClassName)||c.hasClass(this._triggerNodeIcon)||c.parent("#"+this._calendarId)||!this._hide||this.hide()},this.get("container")||this.hide()},renderUI:function(){var b=a.one(this.get("container"));(b||k).append(this._initCalendarHTML(this.get("date"))),this.boundingBox=a.one("#"+this._calendarId).css("position",b?"relative":"absolute"),this._dateBox=this.boundingBox.one(".date-box"),this._contentBox=this.boundingBox.one(".content-box"),this._messageBox=this.boundingBox.one(".message-box"),b||(this._inputWrap()._setDefaultValue(),this.boundingBox.css("top","-9999px")),this.set("boundingBox",this.boundingBox),this.bindUI()._fixSelectMask()._setWidth()._setBtnStates()._setDateStyle()},bindUI:function(){return this.on("afterMessageChange",this._setMessage),this.boundingBox.delegate("click","."+this._delegateClickClassName,this._DELEGATE.click,this),this.boundingBox.delegate("change","."+this._delegateChangeClassName,this._DELEGATE.change,this),this.get("container")?this:(this.boundingBox.delegate("mouseenter mouseleave","a",this._DELEGATE.mouse,this),m.delegate("focusin","."+this._triggerNodeClassName,this._DELEGATE.focusin,this),m.delegate("keyup","."+this._triggerNodeClassName,this._DELEGATE.keyup,this),m.delegate("keydown","."+this._triggerNodeClassName,this._DELEGATE.keydown,this),m.delegate("click","."+this._triggerNodeIcon,this._DELEGATE.iconClick,this),m.delegate("click","."+this._triggerNodeClassName,this._DELEGATE.triggerNodeClick,this),l.on("resize",this._setPos,this),this)},detachEvent:function(){this.detach("afterMessageChange",this._setMessage),this.boundingBox.detach(),m.undelegate("focusin","."+this._triggerNodeClassName,this._DELEGATE.focusin,this),m.undelegate("keyup","."+this._triggerNodeClassName,this._DELEGATE.keyup,this),m.undelegate("keydown","."+this._triggerNodeClassName,this._DELEGATE.keydown,this),m.undelegate("click","."+this._triggerNodeIcon,this._DELEGATE.iconClick,this),m.undelegate("click","."+this._triggerNodeClassName,this._DELEGATE.triggerNodeClick,this),l.detach("resize",this._setPos,this)},destroy:function(){this.detachEvent(),this.boundingBox.remove()},syncUI:function(){!this.get("container")&&this.get("triggerNode")&&this._inputWrap()},render:function(){return this._dateBox.html(this._dateHTML()),this._setWidth()._setDateStyle()._setBtnStates(),this.fire("render"),this},nextMonth:function(){return this.set("date",d.DATE.siblingsMonth(this.get("date"),1)),this.render(),this.fire("nextmonth"),this},prevMonth:function(){return this.set("date",d.DATE.siblingsMonth(this.get("date"),-1)),this.render(),this.fire("prevmonth"),this},show:function(){return m.on("click",this._clickoutside,this),this.boundingBox.show(),this._setDefaultDate().render(),this.fire("show",{node:this.currentNode}),this},hide:function(){return m.detach("click",this._clickoutside,this),this.boundingBox.hide(),this.hideMessage(),this.currentNode&&(this.currentNode.getDOMNode()._selected=null),this._cacheNode=null,this._hide=!0,this.fire("hide",{node:this.currentNode}),this},showMessage:function(){return function(a){a.fire("showmessage"),setTimeout(function(){a._messageBox.addClass("visible")},5)}(this),this},hideMessage:function(){return this._messageBox.removeClass("visible"),this.fire("hidemessage"),this},getSelectedDate:function(){return this.get("selectedDate")},getCurrentNode:function(){return this.currentNode},getDateInfo:function(a){var b=-1,c=d.DATE.stringify(new Date),e=["\u4eca\u5929","\u660e\u5929","\u540e\u5929"];switch(!0){case a==c:b=0;break;case a==d.DATE.siblings(c,1):b=1;break;case a==d.DATE.siblings(c,2):b=2}return!this._dateMap&&this.get("isHoliday")&&(this._dateMap=this._createDateMap()),this._dateMap&&this._dateMap[a]||e[b]||d.DATE.week(a)},_getDateStatus:function(b){return this.get("minDate")&&d.DATE.parse(b)<d.DATE.parse(this.get("minDate"))||this.get("maxDate")&&d.DATE.parse(b)>d.DATE.parse(this.get("maxDate"))||a.inArray(b,this.get("disabled"))},_getHolidaysClass:function(b,c){var e=d.HOLIDAYS;switch(!0){case c:case!this.get("isHoliday"):return"";case b==d.DATE.stringify(new Date):return"today";case!0:for(var f in e)if(a.inArray(b,e[f]))return f;default:return""}},_getAttrNode:function(b,c,d){var e=null;return f(b,function(b){return a.one(b).attr(c)===d?e=a.one(b):void 0}),e},_setWidth:function(){return function(a,b,c){return b.all(".inner, h4").css("width",b.one("table").outerWidth()),b.css("width",b.one(".inner").outerWidth()*a.get("count")+parseInt(c.css("borderLeftWidth"))+parseInt(c.css("borderRightWidth"))+parseInt(c.css("paddingLeft"))+parseInt(c.css("paddingRight"))),6!==h?this:(b.one("iframe").css({width:b.outerWidth(),height:b.outerHeight()}),void 0)}(this,this.boundingBox,this._contentBox),this},_setValue:function(b){if(this.set("selectedDate",b),this.get("container"))return this;switch(this._isInput(this.currentNode)&&this.currentNode.val(b),!0){case this.boundingBox.hasClass("calendar-bounding-box-style"):this.set("endDate",b);break;case!this.boundingBox.hasClass("calendar-bounding-box-style")&&!!this.get("finalTriggerNode"):this.set("startDate",b);var c=a.one(this.get("finalTriggerNode"));c&&this.get("isAutoSwitch")&&c.getDOMNode().select();break;default:this.set("selectedDate",b)}return this},_setDateInfo:function(a){return!this.get("container")&&this.get("isDateInfo")&&this._isInput(this.currentNode)?(this.currentNode.prev().html(j.test(a)?this.getDateInfo(a):""),this):this},_setDefaultValue:function(){var a=e(this.get("triggerNode")).item(0),b=e(this.get("finalTriggerNode")).item(0),c=a&&a.val(),d=b&&b.val();return c&&j.test(c)&&(this.get("isDateInfo")&&a.prev().html(this.getDateInfo(c)),this.set("startDate",c)),d&&j.test(d)&&(this.get("isDateInfo")&&b.prev().html(this.getDateInfo(d)),this.set("endDate",d)),this},_setDefaultDate:function(){return this.get("container")?this:(this.get("startDate")&&(this.set("minDate",this.boundingBox.hasClass("calendar-bounding-box-style")?this.get("startDate"):this._minDateCache),this.render()),this.boundingBox.hasClass("calendar-bounding-box-style")&&d.DATE.parse(this.get("startDate"))>d.DATE.parse(this.get("endDate"))?(this.set("date",this.get("startDate")||this.get("date")),this):(this.set("date",this.currentNode.val()||this.get("date")),this))},_setDateStyle:function(){var a=this.boundingBox,b=this.get("startDate"),c=this.get("endDate"),e=this.get("selectedDate"),f=d.DATE.differ(b,c),g=a.all("td"),h=null,i=b&&this._getAttrNode(g,"data-date",b),j=c&&this._getAttrNode(g,"data-date",c),k=e&&this._getAttrNode(g,"data-date",e);if(g.removeClass("start-date").removeClass("end-date").removeClass("selected-range").removeClass("selected-date"),i&&i.addClass("start-date"),j&&j.addClass("end-date"),k&&k.addClass("selected-date"),!b||!c||d.DATE.parse(b)>d.DATE.parse(c))return this;for(var l=0;f-1>l;l++)b=d.DATE.siblings(b,1),h=this._getAttrNode(g,"data-date",b),h&&h.addClass("selected-range");return this},_setBtnStates:function(){var a=+d.DATE.siblingsMonth(this.get("date"),0),b=this.get("maxDate"),c=this.get("minDate"),e=this.boundingBox.one(".prev-btn"),f=this.boundingBox.one(".next-btn"),g=this.boundingBox.one(".close-btn");return c&&(c=+d.DATE.parse(c)),b&&(b=+d.DATE.siblingsMonth(d.DATE.parse(b),1-this.get("count"))),a<=(c||Number.MIN_VALUE)?e.addClass("prev-btn-disabled"):e.removeClass("prev-btn-disabled"),a>=(b||Number.MAX_VALUE)?f.addClass("next-btn-disabled"):f.removeClass("next-btn-disabled"),this.get("container")&&g.hide(),this},_setMessage:function(){return this._messageBox.html(this.get("message")),this},_setUniqueTag:function(){return function(a,b){a._calendarId="calendar-"+b,a._delegateClickClassName="delegate-click-"+b,a._delegateChangeClassName="delegate-change-"+b,a._triggerNodeIcon="trigger-icon-"+b,a._triggerNodeClassName="trigger-node-"+b}(this,a.guid()),this},_setPos:function(){return function(a,b){b&&setTimeout(function(){var c=b.offset().left,d=b.offset().top+b.outerHeight(),e=a.boundingBox.outerWidth(),f=a.boundingBox.outerHeight(),g=b.outerWidth(),h=b.outerHeight(),i=m.width()-e,j=m.height()-f;!function(a,b){d>j&&(d=0>a?d:a),c>i&&(c=0>b?c:b)}(d-f-h,c+g-e),a.boundingBox.css({top:d,left:c})},10)}(this,this.currentNode),this},_inputWrap:function(){return function(a,b,c){b.each(function(b){if((a.get("isDateInfo")||a.get("isDateIcon"))&&a._isInput(b)&&!b.parent(".calendar-input-wrap")){var c=e(d.INPUT_WRAP_TEMPLATE);b.after(c),c.append(g(d.START_DATE_TEMPLATE,{delegate_icon:a._triggerNodeIcon})).append(b),a.get("isDateIcon")||b.prev().removeClass("calendar-start-icon")}b.addClass(a._triggerNodeClassName),a._isInput(b)&&b.attr("autocomplete","off")}),c.each(function(b){if((a.get("isDateInfo")||a.get("isDateIcon"))&&a._isInput(b)&&!b.parent(".calendar-input-wrap")){var c=e(d.INPUT_WRAP_TEMPLATE);b.after(c),c.append(g(d.END_DATE_TEMPLATE,{delegate_icon:a._triggerNodeIcon})).append(b),a.get("isDateIcon")||b.prev().removeClass("calendar-end-icon")}b.addClass(a._triggerNodeClassName),a._isInput(b)&&b.attr("autocomplete","off")})}(this,e(this.get("triggerNode")),e(this.get("finalTriggerNode"))),this},_fixSelectMask:function(){return 6===h&&this.boundingBox.append("<iframe />"),this},_mouseenter:function(a){var b=this.boundingBox,c=this.get("startDate"),e=a.attr("data-date"),f=d.DATE.differ(c,e),g=(b.all("td"),null);if(clearTimeout(this.leaveTimer),b.all("td").removeClass("hover"),d.DATE.parse(c)>d.DATE.parse(e))return this;for(var h=0;f-1>h;h++)c=d.DATE.siblings(c,1),g=b.one('td[data-date="'+c+'"]'),g&&g.addClass("hover")},_mouseleave:function(){!function(a){clearTimeout(a.leaveTimer),a.leaveTimer=setTimeout(function(){a.boundingBox.all("td").removeClass("hover")},30)}(this)},_DELEGATE:{click:function(b){b.preventDefault();var c=a.one(b.currentTarget),d=c.attr("data-date");switch(!0){case c.hasClass("prev-btn")&&!c.hasClass("prev-btn-disabled"):this.prevMonth();break;case c.hasClass("next-btn")&&!c.hasClass("next-btn-disabled"):this.nextMonth();break;case c.hasClass("close-btn"):this.hide();break;case c&&c.hasClass(this._delegateClickClassName)&&this.boundingBox.hasClass("calendar-bounding-box-style")&&d==this.get("minDate")&&!this.get("isSameDate"):break;case!!d&&!c.hasClass("disabled"):this.get("container")||this.hide(),this._setValue(d)._setDateInfo(d)._setDateStyle().fire("dateclick",{date:d,dateInfo:this.getDateInfo(d)})}},change:function(){var a=this.boundingBox.all("."+this._delegateChangeClassName);this.set("date",a.item(0).val()+"-"+a.item(1).val()+"-01"),this.render(),function(a){a._hide=!1,setTimeout(function(){a._hide=!0},0)}(this)},mouse:function(b){var c=a.one(b.currentTarget).parent("td");if(!c.hasClass("disabled"))switch(b.type){case"mouseenter":this.boundingBox.hasClass("calendar-bounding-box-style")&&!!this.get("startDate")&&this._mouseenter(c);break;case"mouseleave":this._mouseleave()}},focusin:function(b){var c=this.currentNode=a.one(b.currentTarget);this.boundingBox[this._inNodeList(c,e(this.get("triggerNode")))?"removeClass":"addClass"]("calendar-bounding-box-style"),this.hideMessage(),this._cacheNode&&this._cacheNode.getDOMNode()!=c.getDOMNode()&&this.hide(),"none"==this.boundingBox.css("display")&&this.show()._setWidth()._setPos(),this._cacheNode=c},keyup:function(b){if(this.get("isKeyup")){clearTimeout(this.keyupTimer);var c=this,e=a.one(b.currentTarget);if(this._isInput(e)){var f=e.val();c._setDateInfo(f),j.test(f)&&(this.keyupTimer=setTimeout(function(){f=d.DATE.stringify(d.DATE.parse(f)),c._setValue(f),c.set("date",f),c.render()},200))}}},keydown:function(a){9==a.keyCode&&this.hide()},iconClick:function(b){var c=a.one(b.target).parent(".calendar-input-wrap").one("."+this._triggerNodeClassName),d=c?c.getDOMNode():null,e=this.currentNode?this.currentNode.getDOMNode():null;(d!=e||"none"==this.boundingBox.css("display"))&&d.focus()},triggerNodeClick:function(b){var c=b.target;!c._selected&&this._isInput(a.one(c))&&(c.select(),c._selected=!0)}},_maxCell:function(){for(var a=this.get("date"),b=a.getFullYear(),c=a.getMonth()+1,d=[],e=0;e<this.get("count");e++)d.push(new Date(b,c-1+e,1).getDay()+new Date(b,c+e,0).getDate());return Math.max.apply(null,d)},_isInput:function(a){return"INPUT"===a.getDOMNode().tagName.toUpperCase()&&("text"===a.attr("type")||"date"===a.attr("type"))},_inNodeList:function(a,b){var c=!1;return f(b,function(b){a.equals(b)&&(c=!0)}),c},_createSelect:function(){var a=this.get("date"),b=this.get("minDate"),c=this.get("maxDate"),e=a.getFullYear(),f=d.DATE.filled(a.getMonth()+1),h=b&&b.substr(0,4)||1900,i=c&&c.substr(0,4)||(new Date).getFullYear()+3,j=b&&b.substr(5,2)||1,k=c&&c.substr(5,2)||12,l=' selected="selected"',m={};m.delegate_change=this._delegateChangeClassName,m.year_template="",m.month_template="",e==h||e==i||(j=1,k=12);for(var n=i;n>=h;n--)m.year_template+="<option"+(e==n?l:"")+' value="'+n+'">'+n+"</option>";for(var n=j;k>=n;n++)m.month_template+="<option"+(f==n?l:"")+' value="'+d.DATE.filled(n)+'">'+d.DATE.filled(n)+"</option>";return g(d.SELECT_TEMPLATE,m)},_createDateMap:function(){var a={};for(var b in d.HOLIDAYS)for(var c=d.HOLIDAYS[b],e=0;e<c.length;e++)for(var f=c[e],g=d.DATENAME[b],h=0;7>h;h++){var i=d.DATE.siblings(f,h-3);!function(b,c){a[i]=a[i]?b>2?c:a[i]:c}(h,g+(3!=h?(3>h?"\u524d":"\u540e")+Math.abs(h-3)+"\u5929":""))}return a},_initCalendarHTML:function(){var a={};return a.delegate_click=this._delegateClickClassName,a.bounding_box_id=this._calendarId,a.message_template=this.get("message"),a.date_template=this._dateHTML(),g(d.CALENDAR_TEMPLATE,a)},_dateHTML:function(a){for(var a=this.get("date"),b=a.getFullYear(),c=a.getMonth(),e="",f=0;f<this.get("count");f++)e+=g(d.DATE_TEMPLATE,this._singleDateHTML(new Date(b,c+f)));return e},_singleDateHTML:function(a){var b=a.getFullYear(),c=a.getMonth()+1,e=new Date(b,c-1,1).getDay(),h=new Date(b,c,0).getDate(),i=[{wd:"\u65e5",weekend:"weekend"},{wd:"\u4e00"},{wd:"\u4e8c"},{wd:"\u4e09"},{wd:"\u56db"},{wd:"\u4e94"},{wd:"\u516d",weekend:"weekend"}],j="";f(i,function(a){j+=g(d.HEAD_TEMPLATE,{weekday_name:a.wd,weekend:a.weekend||""})});for(var k="",l=[];e--;)l.push(0);for(var m=1;h>=m;m++)l.push(m);l.length=this._maxCell();var n=Math.ceil(l.length/7);this.get("data");for(var m=0;n>m;m++){for(var o="",p=0;6>=p;p++){var q=l[p+7*m]||"",a=q?b+"-"+d.DATE.filled(c)+"-"+d.DATE.filled(q):"";o+=g(d.DAY_TEMPLATE,{day:q,date:a,disabled:this._getDateStatus(a)||!q?"disabled":this._delegateClickClassName,date_class:this._getHolidaysClass(a,this._getDateStatus(a)||!q)})}k+=g(d.BODY_TEMPLATE,{calday_row:o})}var r={};r.head_template=j,r.body_template=k;var s={};return s.date=this.get("isSelect")?this._createSelect():b+"\u5e74"+c+"\u6708",s.table_template=g(d.TABLE_TEMPLATE,r),s}},{DATE:{parse:function(a){return a=a.match(i),a?new Date(a[0],a[1]-1,a[2]):null},stringify:function(b){return a.isDate(b)?b.getFullYear()+"-"+this.filled(1*b.getMonth()+1)+"-"+this.filled(b.getDate()):null},siblings:function(a,b){return a=a.match(i),this.stringify(new Date(a[0],a[1]-1,1*a[2]+1*b))},siblingsMonth:function(a,b){return new Date(a.getFullYear(),1*a.getMonth()+b)},filled:function(a){return String(a).replace(/^(\d)$/,"0$1")},differ:function(a,b){return parseInt(Math.abs(this.parse(a)-this.parse(b))/24/60/60/1e3)},isDate:function(a){if(!j.test(a))return!1;var b=this.parse(a);return 1*b.getMonth()+1==a.match(i)[1]},week:function(a){return"\u661f\u671f"+["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"][d.DATE.parse(a).getDay()]}},CALENDAR_TEMPLATE:'<div id="{bounding_box_id}" class="calendar-bounding-box"><div class="calendar-container"><div class="message-box">{message_template}</div><div class="content-box"><div class="arrow"><span class="close-btn {delegate_click}" title="\u5173\u95ed">close</span><span class="prev-btn {delegate_click}" title="\u4e0a\u6708">prev</span><span class="next-btn {delegate_click}" title="\u4e0b\u6708">next</span></div><div class="date-box">{date_template}</div></div></div></div>',DATE_TEMPLATE:'<div class="inner"><h4>{date}</h4>{table_template}</div>',SELECT_TEMPLATE:'<select class="{delegate_change}">{year_template}</select>\u5e74<select class="{delegate_change}">{month_template}</select>\u6708',TABLE_TEMPLATE:"<table><thead><tr>{head_template}</tr></thead><tbody>{body_template}</tbody></table>",HEAD_TEMPLATE:'<th class="{weekend}">{weekday_name}</th>',BODY_TEMPLATE:"<tr>{calday_row}</tr>",DAY_TEMPLATE:'<td data-date="{date}" class="{disabled}"><a href="javascript:;" class="{date_class}">{day}</a></td>',INPUT_WRAP_TEMPLATE:'<div class="calendar-input-wrap" />',START_DATE_TEMPLATE:'<span class="calendar-start-icon {delegate_icon}" />',END_DATE_TEMPLATE:'<span class="calendar-end-icon {delegate_icon}" />',DATENAME:{today:"\u4eca\u5929",yuandan:"\u5143\u65e6",chuxi:"\u9664\u5915",chunjie:"\u6625\u8282",yuanxiao:"\u5143\u5bb5\u8282",qingming:"\u6e05\u660e",wuyi:"\u52b3\u52a8\u8282",duanwu:"\u7aef\u5348\u8282",zhongqiu:"\u4e2d\u79cb\u8282",guoqing:"\u56fd\u5e86\u8282"},HOLIDAYS:{yuandan:["2012-01-01","2013-01-01","2014-01-01","2015-01-01","2016-01-01","2017-01-01","2018-01-01","2019-01-01","2020-01-01"],chuxi:["2012-01-22","2013-02-09","2014-01-30","2015-02-18","2016-02-07","2017-01-27","2018-02-15","2019-02-04","2020-01-24"],chunjie:["2012-01-23","2013-02-10","2014-01-31","2015-02-19","2016-02-08","2017-01-28","2018-02-16","2019-02-05","2020-01-25"],yuanxiao:["2012-02-06","2013-02-24","2014-02-14","2015-03-05","2016-02-22","2017-02-11","2018-03-02","2019-02-19","2020-02-08"],qingming:["2012-04-04","2013-04-04","2014-04-05","2015-04-05","2016-04-04","2017-04-04","2018-04-05","2019-04-05","2020-04-04"],wuyi:["2012-05-01","2013-05-01","2014-05-01","2015-05-01","2016-05-01","2017-05-01","2018-05-01","2019-05-01","2020-05-01"],duanwu:["2012-06-23","2013-06-12","2014-06-02","2015-06-20","2016-06-09","2017-05-30","2018-06-18","2019-06-07","2020-06-25"],zhongqiu:["2012-09-30","2013-09-19","2014-09-08","2015-09-27","2016-09-15","2017-10-04","2018-09-24","2019-09-13","2020-10-01"],guoqing:["2012-10-01","2013-10-01","2014-10-01","2015-10-01","2016-10-01","2017-10-01","2018-10-01","2019-10-01","2020-10-01"]},NAME:"TripCalendar",ATTRS:{boundingBox:{readOnly:!0},date:{value:new Date,setter:function(b){return a.isDate(b)||(b=j.test(b)?b:new Date),b},getter:function(b){return a.isDate(b)?b:a.isString(b)?(b=b.match(i),new Date(b[0],b[1]-1)):void 0}},count:{value:2,getter:function(a){return this.get("isSelect")&&(a=1),a}},selectedDate:{value:null,setter:function(b){return a.isDate(b)&&(b=d.DATE.stringify(b)),j.test(b)?b:null},getter:function(b){return a.isString(b)&&(b=d.DATE.stringify(d.DATE.parse(b))),b||""}},minDate:{value:null,setter:function(b){return a.isDate(b)&&(b=d.DATE.stringify(b)),j.test(b)?b:null},getter:function(b){return a.isString(b)&&(b=d.DATE.stringify(d.DATE.parse(b))),b||""}},maxDate:{value:null,setter:function(b){return a.isDate(b)&&(b=d.DATE.stringify(b)),j.test(b)?b:null},getter:function(b){return a.isString(b)&&(b=d.DATE.stringify(d.DATE.parse(b))),b||""}},startDate:{value:""},endDate:{value:""},afterDays:{value:0,setter:function(a){return a>0&&this.set("maxDate",d.DATE.siblings(this.get("minDate")||d.DATE.stringify(new Date),a)),a},getter:function(a){return a&&(this.get("minDate")||this.set("minDate",new Date)),a}},message:{value:""},triggerNode:{value:"",getter:function(a){return/\,/.test(a)&&(a=a.replace(/\s+/g,""),a=a.split(new RegExp("\\s+"+a+"+\\s","g")),a=a.join().replace(/^,+|,+$/g,"")),a}},finalTriggerNode:{value:"",getter:function(a){return/\,/.test(a)&&(a=a.replace(/\s+/g,""),a=a.split(new RegExp("\\s+"+a+"+\\s","g")),a=a.join().replace(/^,+|,+$/g,"")),a}},container:{value:null,getter:function(a){return/\,/.test(a)&&(a=a.replace(/\s+/g,""),a=a.split(new RegExp("\\s+"+a+"+\\s","g")),a=a.join().replace(/^,+|,+$/g,"")),a}},isSelect:{value:!1},isKeyup:{value:!0},isDateInfo:{value:!0},isDateIcon:{value:!0},isHoliday:{value:!0,setter:function(a){return a||(this._dateMap=null),a}},isAutoSwitch:{value:!1},isSameDate:{value:!1},disabled:{value:[]}}})},{requires:["node","base","sizzle","./calendar.css"]});