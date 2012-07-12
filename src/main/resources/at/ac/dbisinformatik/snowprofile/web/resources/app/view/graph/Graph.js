var drawComponent = Ext.create('Ext.draw.Component', 
	initGraph()
);

Ext.define('LWD.view.graph.Graph', {
	extend: 'Ext.form.Panel',
	alias: 'widget.graph',
	
	store: 'Snowprofile',
	
	initComponent: function() {
		var store = Ext.data.StoreManager.lookup('Snowprofile');
		
		store.on('load', this.refresh, this);
		store.on('update', this.refresh, this);
		
		this.items = drawComponent;
		
		this.callParent(arguments);
    },
    
    refresh: function(store) {
    	drawGraph(store, drawComponent);
    }
});