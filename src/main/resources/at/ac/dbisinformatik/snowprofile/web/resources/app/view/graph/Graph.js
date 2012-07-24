Ext.define('LWD.view.graph.Graph', {
	extend : 'Ext.draw.Component',
	alias : 'widget.graph',
	flex: 1,
	width: "100%",
	height: "100%",

	initComponent : function() {
		var store = Ext.data.StoreManager.lookup('Snowprofile');

		this.items = [];
		store.on('load', this.refresh, this);
		store.on('datachanged', this.refresh, this);

		this.callParent(arguments);
	},

	refresh : function(store) {
		console.log("draw graph");
		drawGraph(store, this);
	}
});