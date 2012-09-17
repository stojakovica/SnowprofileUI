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
		this.surface.removeAll();
		this.surface.add(getJSON(store.getProxy().getReader().rawData.SnowProfile, false, this));
		
		var text = this.surface.getGroup('text');
		var rectangles = this.surface.getGroup('rectangles');
		var paths = this.surface.getGroup('paths');
		
		text.show(true);
		rectangles.show(true);
		paths.show(true);
		console.log("draw graph");
	}
});