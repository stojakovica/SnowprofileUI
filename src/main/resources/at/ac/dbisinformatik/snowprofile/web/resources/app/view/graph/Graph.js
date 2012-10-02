Ext.define('LWD.view.graph.Graph', {
	extend : 'Ext.draw.Component',
	alias : 'widget.graph',
	flex: 1,
	width: "100%",
	height: "100%",

	initComponent : function() {
		var store = Ext.data.StoreManager.lookup('Snowprofile');

		store.on('load', this.refresh, this);
		store.on('datachanged', this.refresh, this);

		this.callParent(arguments);
	},

	refresh : function(store) {
		this.surface.removeAll();
		var data = {};
		var snowprofile = store.getAt(0);
        Ext.apply(data, snowprofile.getAssociatedData());
        this.surface.add(getJSON(data, false, this));
		var snowprofile = this.surface.getGroup('snowprofile');
		snowprofile.show(true);
	}
});