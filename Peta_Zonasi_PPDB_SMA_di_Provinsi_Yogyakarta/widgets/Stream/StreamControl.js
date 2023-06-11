// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/Stream/StreamControl.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"jimu-widget-title" data-dojo-attach-point\x3d"controlLabelSection"\x3e\r\n    ${nls.streamControls}\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"controlButton stop" data-dojo-attach-point\x3d"startBtn"\x3e\r\n    \x3cdiv class\x3d"jimu-float-leading jimu-leading-margin1 runningIcon"\x3e\x3c/div\x3e\r\n    \x3clabel class\x3d"jimu-widget-normal jimu-leading-margin1 btnLabel"\r\n           data-dojo-attach-point\x3d"startBtnLabel"\x3e${nls.stopStreaming}\x3c/label\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"controlButton" data-dojo-attach-point\x3d"clearBtn"\x3e\r\n    \x3cdiv class\x3d"jimu-float-leading jimu-leading-margin1 clearIcon"\x3e\x3c/div\x3e\r\n    \x3clabel class\x3d"jimu-widget-normal jimu-leading-margin1 btnLabel"\x3e${nls.clearObservation}\x3c/label\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"drawPreviousSection" class\x3d"drawControl"\x3e\r\n    \x3clabel class\x3d"jimu-widget-normal btnLabel"\x3e${nls.previousObservations}\x26nbsp;\x3c/label\x3e\r\n    \x3cinput data-dojo-type\x3d"dijit/form/NumberSpinner" style\x3d"height:32px;width:30%;float:right;"\r\n           data-dojo-props\x3d"smallDelta:1, intermediateChanges:true, constraints:{min:1,max:100,places:0}"\r\n           data-dojo-attach-point\x3d"previousSpinner"\r\n    /\x3e\r\n    \x3cdiv style\x3d"clear:both"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"jimu-widget-title filterLabel"\r\n      data-dojo-attach-point\x3d"filterLabelSection"\x3e\r\n    ${nls.streamFilter}\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"spatialFilterControl" class\x3d"filterControl"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"spatialFilterToggleDiv"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"spatialFilterSection" class\x3d"filterControl" style\x3d"display:none"\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"attrFilterControl" class\x3d"filterControl"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"attrFilterToggleDiv"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"attrFilterSection" class\x3d"filterControl" style\x3d"display:none"\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/on dojo/dom-attr dojo/dom-style dojo/dom-class dojo/dom-construct dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./StreamControl.html jimu/dijit/DrawBox ./FilterItem jimu/dijit/CheckBox dijit/form/RadioButton esri/symbols/jsonUtils esri/symbols/SimpleFillSymbol esri/graphic jimu/dijit/SimpleTable dijit/form/NumberSpinner jimu/dijit/LoadingShelter".split(" "),function(t,c,m,e,n,b,p,g,u,v,w,x,y,z,l,q,A,
B,C){return t([u,v,w],{baseClass:"jimu-widget-stream",templateString:x,map:null,streamLayer:null,isStreaming:!0,mapExtentChangeHandler:null,config:null,filterItems:[],postCreate:function(){this.inherited(arguments);this.spatialFilterToggle=new l({checked:!1,label:this.nls.useSpatialFilter,onChange:c.hitch(this,this._toggleSpatialFilter)});this.spatialFilterToggle.placeAt(this.spatialFilterToggleDiv);this.attrFilterToggle=new l({checked:!1,label:this.nls.useAttributeFilter,onChange:c.hitch(this,this._toggleAttributeFilter)});
this.attrFilterToggle.placeAt(this.attrFilterToggleDiv);this.config&&this._applyConfig();this.streamLayer&&this._bindEvents()},_applyConfig:function(){!0!==this.config.startStop&&b.set(this.startBtn,"display","none");!0!==this.config.clear&&b.set(this.clearBtn,"display","none");!0!==this.config.drawPrevious&&b.set(this.drawPreviousSection,"display","none");!0!==this.config.spatialFilter?(b.set(this.spatialFilterControl,"display","none"),b.set(this.spatialFilterSection,"display","none")):this.config.mapExtentFilter&&
this.config.drawExtentFilter?(this._createMapAreaFilterControl(!0),this._createDrawAreaFilterControl(!0)):this.config.mapExtentFilter?this._createMapAreaFilterControl(!1):this.config.drawExtentFilter?this._createDrawAreaFilterControl(!1):(b.set(this.spatialFilterControl,"display","none"),b.set(this.spatialFilterSection,"display","none"));if(this.config.attrFilter&&0<this.config.filterList.length){var a,d,f=!1;m.forEach(this.config.filterList,c.hitch(this,function(h,k){d=1===this.config.filterList.length?
"checkbox":"radio";var r=!0===h.inherited&&h.definitionExpression===this.streamLayer.getDefinitionExpression();a=new z({uid:this.id,config:h,type:d,streamLayer:this.streamLayer,index:k,checked:r,nls:this.nls});a.placeAt(this.attrFilterSection);this.filterItems.push(a);f=f||r}));f&&this.attrFilterToggle.setValue(!0)}else b.set(this.attrFilterControl,"display","none"),b.set(this.attrFilterSection,"display","none");this.config.spatialFilter||this.config.attrFilter&&0!==this.config.filterList.length||
b.set(this.filterLabelSection,"display","none")},_createMapAreaFilterControl:function(a){var d=g.create("div",{"class":"filterOption"},this.spatialFilterSection);a?(this.mapAreaControl=new q({id:this.id+"_mapAreaObservations",name:this.id+"_sf",value:"mapArea"}),this.mapAreaControl.placeAt(d),this.own(e(this.mapAreaControl,"change",c.hitch(this,this._mapAreaFilterChange))),g.create("label",{"class":"jimu-widget-normal","for":this.id+"_mapAreaObservations",innerHTML:this.nls.showMapAreaObservations},
d)):(this.mapAreaControl=new l({checked:!1,label:this.nls.showMapAreaObservations,onChange:c.hitch(this,this._mapAreaFilterChange)}),this.mapAreaControl.placeAt(d))},_createDrawAreaFilterControl:function(a){var d=g.create("div",{"class":"filterOption"},this.spatialFilterSection);a?(this.drawAreaControl=new q({id:this.id+"_drawAreaObservations",name:this.id+"_sf",value:"drawArea"}),this.drawAreaControl.placeAt(d),this.own(e(this.drawAreaControl,"change",c.hitch(this,this._drawAreaFilterChange))),g.create("label",
{"class":"jimu-widget-normal","for":this.id+"_drawAreaObservations",innerHTML:this.nls.showObservationsByDrawing},d)):(this.drawAreaControl=new l({checked:!1,label:this.nls.showObservationsByDrawing,onChange:c.hitch(this,this._drawAreaFilterChange)}),this.drawAreaControl.placeAt(d));this.drawToolDiv=g.create("div",{style:"display:none"},d);this.drawTool=new y({map:this.map,showClear:!0,keepOneGraphic:!0,geoTypes:["EXTENT"],types:["polygon"]});this.config.drawSymbol&&this.drawTool.setPolygonSymbol(A.fromJson(this.config.drawSymbol));
this.drawTool.placeAt(this.drawToolDiv);this.own(e(this.drawTool,"draw-end",c.hitch(this,function(f){f=new C(f.toJson());f.symbol.setStyle(B.STYLE_NULL);this.drawTool.addGraphic(f);var h=e(this.streamLayer,"filter-change",c.hitch(this,function(k){h.remove();k.filter.geometry&&"extent"===k.filter.geometry.type&&setTimeout(c.hitch(this,function(){this._clearOutsideGraphics(k.filter.geometry)}),100)}));this.streamLayer.setGeometryDefinition(f.geometry)})));this.own(e(this.drawTool,"clear",c.hitch(this,
function(){this.streamLayer.setGeometryDefinition(this.map.extent)})))},_mapAreaFilterChange:function(a){a?(this.streamLayer&&this.streamLayer.setGeometryDefinition(this.map.extent),this._addMapExtentChangeHandler()):this._removeMapExtentChangeHandler()},_drawAreaFilterChange:function(a){a?b.set(this.drawToolDiv,"display",""):(this.drawTool.clear(),b.set(this.drawToolDiv,"display","none"))},_bindEvents:function(){"none"!==b.get(this.startBtn,"display")&&this.own(e(this.startBtn,"click",c.hitch(this,
function(){(this.isStreaming=!this.isStreaming)?(p.add(this.startBtn,"stop"),n.set(this.startBtnLabel,"innerHTML",this.nls.stopStreaming),this.startStreaming()):(p.remove(this.startBtn,"stop"),n.set(this.startBtnLabel,"innerHTML",this.nls.startStreaming),this.stopStreaming())})));"none"!==b.get(this.clearBtn,"display")&&this.own(e(this.clearBtn,"click",c.hitch(this,function(){this.streamLayer.clear()})));if("none"!==b.get(this.drawPreviousSection,"display")){var a=this.streamLayer.maximumTrackPoints||
1;this.previousSpinner.set("value",a-1);this.streamLayer.setMaximumTrackPoints(a);this.own(e(this.previousSpinner,"change",c.hitch(this,function(d){this.streamLayer.setMaximumTrackPoints(d+1)})))}},_clearOutsideGraphics:function(a){this.streamLayer.clear()},destroy:function(){this.inherited(arguments);this._removeMapExtentChangeHandler()},stopStreaming:function(){this.streamLayer.disconnect(c.hitch(this,function(){this.streamLayer.clear()}))},startStreaming:function(){this.streamLayer.connect()},
_removeMapExtentChangeHandler:function(){this.mapExtentChangeHandler&&"function"===typeof this.mapExtentChangeHandler.remove&&(this.mapExtentChangeHandler.remove(),this.mapExtentChangeHandler=null)},_addMapExtentChangeHandler:function(){null===this.mapExtentChangeHandler&&(this.mapExtentChangeHandler=e(this.map,"extent-change",c.hitch(this,this._mapExtentChange)))},_mapExtentChange:function(a){this.streamLayer&&this.streamLayer.setGeometryDefinition(a.extent)},_toggleSpatialFilter:function(a){a?b.set(this.spatialFilterSection,
"display",""):(b.set(this.spatialFilterSection,"display","none"),b.set(this.drawToolDiv,"display","none"),this.mapAreaControl&&("jimu.dijit.CheckBox"===this.mapAreaControl.dealaredClass?this.mapAreaControl.setValue(!1):this.mapAreaControl.set("checked",!1)),this.drawAreaControl&&(this.drawTool.clear(),"jimu.dijit.CheckBox"===this.drawAreaControl.dealaredClass?this.drawAreaControl.setValue(!1):this.drawAreaControl.set("checked",!1)),this._removeMapExtentChangeHandler(),this.streamLayer&&this.streamLayer.setGeometryDefinition(null))},
_toggleAttributeFilter:function(a){a?b.set(this.attrFilterSection,"display",""):(b.set(this.attrFilterSection,"display","none"),m.forEach(this.filterItems,function(d){d.unCheck()}),this.streamLayer&&this.streamLayer.setDefinitionExpression(null))}})});