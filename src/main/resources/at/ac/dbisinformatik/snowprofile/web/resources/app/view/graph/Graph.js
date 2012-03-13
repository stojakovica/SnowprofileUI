Ext.define('LWD.view.graph.Graph', {
	extend: 'Ext.form.Panel',
	alias: 'widget.graph',
	
	title: 'Schneeprofil',
	
	initComponent: function() {
		this.items = Ext.create('Ext.draw.Component', drawGraphJSON());
		
		this.callParent(arguments);
    }
});