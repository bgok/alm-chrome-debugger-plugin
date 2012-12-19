// void ((function() {
//     (function() {
//         var Ext = window.Ext4 || window.Ext;
//         Ext.define("Rally.bookmarklet.CapturingBatchSender", {extend: "Rally.clientmetrics.BatchSender",constructor: function(config) {
//                 this.callParent(arguments);
//                 this._capturedEvents = [];
//                 this.handler = config.handler || Ext.emptyFn;
//                 this.handlerScope = config.scope;
//             },send: function(events, options) {
//                 var sentEvents = events || [];
//                 Ext.Array.each(sentEvents, function(sentEvent) {
//                     this._capturedEvents.push(Ext.apply({}, sentEvent));
//                 }, this);
//                 this._sendCaptured();
//                 this.callParent(arguments);
//             },clear: function() {
//                 this._capturedEvents = [];
//                 this._sendCaptured();
//             },_sendCaptured: function() {
//                 var events = [];
//                 Ext.Array.each(this._capturedEvents, function(event) {
//                     var clonedEvent = Ext.apply({}, event);
//                     events.push(clonedEvent);
//                 });
//                 this._cleanEvents(events);
//                 this.handler.call(this.handlerScope, events);
//             }});
//     })();
//     (function() {
//         var Ext = window.Ext4 || window.Ext;
//         var _checkBoxItemId = "cm-checkbox-tooltip";
//         Ext.define("Rally.bookmarklet.ClientMetricsTree", {extend: "Ext.panel.Panel",layout: "fit",initComponent: function() {
//                 this.callParent(arguments);
//                 this._aggregator = Rally.clientmetrics.ClientMetricsAggregatorInstance;
//                 this._capturingSender = Ext.create("Rally.bookmarklet.CapturingBatchSender", {keysToIgnore: ["cmp"],minLength: 1700,maxLength: 2000,handler: this._onEventsCaptured,scope: this});
//                 Rally.clientmetrics.ClientMetricsAggregatorInstance.sender = this._capturingSender;
//                 this._eventStore = Ext.create("Ext.data.TreeStore", {fields: ["eId", "eDesc", "cmpType", "tId", "bts", "eType", "start", "stop", "elapsed", "url", "pId", "status"],root: {expanded: true,children: []}});
//                 this._treePanel = this.add({xtype: "treepanel",title: "Client Metrics",componentCls: "cm-tree",scroll: false,viewConfig: {style: {overflow: "auto",overflowX: "hidden"}},componentCls: "cm-tree",autoScroll: true,buttons: [{xtype: "checkbox",boxLabel: "enable tooltips",itemId: _checkBoxItemId}, {text: "expand all",handler: function() {
//                                 this.up("treepanel").expandAll();
//                             }}, {text: "collapse all",handler: function() {
//                                 this.up("treepanel").collapseAll();
//                             }}, {text: "clear",listeners: {click: function() {
//                                     this._capturingSender.clear();
//                                 },scope: this}}],store: this._eventStore,rootVisible: false,columns: [{xtype: "treecolumn",header: "Description",dataIndex: "eDesc",menuDisabled: true,flex: 1}, {xtype: "gridcolumn",header: "status",dataIndex: "status"}, {xtype: "gridcolumn",header: "elapsed",dataIndex: "elapsed"}, {xtype: "gridcolumn",header: "event ID",dataIndex: "eId"}, {xtype: "gridcolumn",header: "parent ID",dataIndex: "pId"}, {xtype: "gridcolumn",header: "trace ID",dataIndex: "tId"}, {xtype: "gridcolumn",header: "bts",dataIndex: "bts"}]});
//                 this._treePanel.getView().on("render", function(view) {
//                     view.tip = Ext.create("Ext.tip.ToolTip", {width: 500,dismissDelay: 0,target: view.el,delegate: view.itemSelector,trackMouse: true,renderTo: Ext.getBody(),listeners: {beforeshow: function updateTipBody(tip) {
//                                 var tipString = "";
//                                 var enabled = view.up("treepanel").down("#" + _checkBoxItemId).getValue();
//                                 if (enabled) {
//                                     var record = view.getRecord(tip.triggerElement);
//                                     if (record && record.raw && record.raw.orig) {
//                                         tipString = Ext.Object.toQueryString(view.getRecord(tip.triggerElement).raw.orig);
//                                         tipString = tipString.replace(/&([^=]+)=/g, "<br/>&<b>$1</b>=");
//                                     }
//                                 }
//                                 if (tipString) {
//                                     tip.update(tipString);
//                                 } else {
//                                     return false;
//                                 }
//                             }}});
//                 });
//             },_cloneEvents: function(events) {
//                 var clones = [];
//                 Ext.Array.each(events, function(event) {
//                     var clone = Ext.apply({}, event);
//                     delete clone.cmp;
//                     clones.push(clone);
//                 });
//                 return clones;
//             },_onEventsCaptured: function(events) {
//                 events = events || [];
//                 var pendingEvents = this._cloneEvents(this._aggregator._pendingEvents);
//                 var parentEvents = this._cloneEvents(this._aggregator._currentParentEvents);
//                 var additionalNodes = [{eDesc: "Pending",children: pendingEvents}, {eDesc: "Current Parents",children: parentEvents}];
//                 var tree = this._flatToTree(events, additionalNodes);
//                 this._eventStore.setRootNode({expanded: true,children: tree});
//                 this._treePanel.setTitle("Client Metrics (" + events.length + ", avgLen: " + tree.averageLength + ")");
//             },_findNode: function(items, eId) {
//                 var result = Ext.Array.filter(items, function(item) {
//                     return item.eId === eId;
//                 });
//                 return result && result[0];
//             },_addIcon: function(item) {
//                 var icons = {action: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4EWN8uzn3PwMFgIkCvWCtLNgMkA2fjCH8eGUuhhhIgGIXUGwAihdgTsfmXFxyFLuAYgNQvAALZphzYXx8NNwFxGpCV4fhAmwBCHMBumaQONwFMEWk0gNvAOOA50YAGqgVVM9nAZ8AAAAASUVORK5CYII=",dataRequest: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZUlEQVQ4EWOU1D74n4ECwESBXrBWFmQD7l3WR+aisJV0L6LwYRzqugBmKjbbYK5Dl6PYBaMGMDBQHAYoCQkWjcg0ruiDqcFqAEwTTBE+GqsByBrQEw6yHIiNYgAhxeiaQXyKAxEAK98QcDUrAwgAAAAASUVORK5CYII=",load: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAS0lEQVQ4EWOMXyn5n4ECwESBXrBWFAMWRrxlAGFSAIoBpGiEqR01gIFhGIQBCyw+kWlciSl+hTCyMjB74MMAxQvYnIjhZjQBir0AABqgCioUZ5wsAAAAAElFTkSuQmCC"};
//                 item.icon = icons[item.eType];
//             },_setUpItem: function(item) {
//                 item.orig = Ext.apply({}, item);
//                 item.eDesc = item.eDesc || item.url;
//                 item.eDesc = "<b>" + item.eDesc + "</b>";
//                 item.eDesc += " <i><smaller>" + (item.cmpH || item.cmpType) + "</smaller></i>";
//                 item.eventLength = this._capturingSender._getEventLength(item.orig, {estimateIndices: true});
//                 item.eDesc += " (" + item.eventLength + ")";
//                 if (item.eventLength > 1000) {
//                     item.cls = "cm-toobig";
//                 }
//                 if (item.stop && item.start) {
//                     item.elapsed = item.stop - item.start;
//                 }
//                 this._addIcon(item);
//             },_flatToTree: function(items, additionalNodes) {
//                 var roots = [];
//                 var me = this;
//                 var lengthSum = 0;
//                 Ext.Array.each(items, function(item) {
//                     me._setUpItem(item);
//                     lengthSum += item.eventLength;
//                     var dupes = Ext.Array.filter(items, function(other) {
//                         return other.eId === item.eId;
//                     });
//                     if (dupes.length > 1) {
//                         item.cls = "cm-duplicate";
//                         item.eDesc += "-DUPE";
//                     }
//                     if (!item.pId || item.pId === "NULL" || item.pId === "unknown") {
//                         roots.push(item);
//                     } else {
//                         var parent = me._findNode(items, item.pId);
//                         if (parent) {
//                             parent.children = parent.children || [];
//                             parent.children.push(item);
//                             parent.expanded = true;
//                             if (parent.tId !== item.tId) {
//                                 item.cls = "cm-badTrace";
//                                 item.eDesc += "-TRACE";
//                             }
//                         } else {
//                             item.cls = "cm-faulty";
//                             item.eDesc += "-FAULTY";
//                             roots.push(item);
//                         }
//                     }
//                 });
//                 Ext.Array.each(items, function(item) {
//                     item.leaf = !(item.children && item.children.length);
//                 });
//                 Ext.Array.each(additionalNodes, function(additionalNode) {
//                     if (additionalNode.children && additionalNode.children.length) {
//                         Ext.Array.each(additionalNode.children, function(child) {
//                             me._setUpItem(child);
//                             child.leaf = true;
//                         });
//                         additionalNode.leaf = false;
//                         additionalNode.expanded = false;
//                         additionalNode.eDesc += " (" + additionalNode.children.length + ")";
//                         roots.push(additionalNode);
//                     }
//                 });
//                 roots.averageLength = Math.round(lengthSum / items.length * 10) / 10;
//                 return roots;
//             }});
//     })();
//     (function() {
//         var Ext = window.Ext4 || window.Ext;
//         var head = document.getElementsByTagName("head")[0], style = document.createElement("style"), rules = document.createTextNode(".cm-itemMetaData { font-size: 0.8em; font-style: italic; } .cm-duplicate { color: purple; font-style: italic } .cm-badTrace { color: red; font-weight: bold; } .cm-faulty { color: orange; font-weight: bold; } .cm-toobig {background-color: red !important; color: white !important; } .cm-tree td { height: 20px !important; }");
//         style.type = "text/css";
//         if (style.styleSheet) {
//             style.styleSheet.cssText = rules.nodeValue;
//         } else {
//             style.appendChild(rules);
//         }
//         head.appendChild(style);
//         if (Rally.clientmetrics.ClientMetricsAggregatorInstance) {
//             var tree = Ext.create("Rally.bookmarklet.ClientMetricsTree", {height: 300});
//             var viewport = Ext.ComponentQuery.query("#rallyViewport");
//             viewport[0].add(tree);
//         } else {
//             alert("No client metrics aggregator found (are you in Rally with client metrics enabled?)");
//         }
//     })();
// })())
