Ext.define('LWD.view.graph.Graph', {
	extend : 'Ext.draw.Component',
	alias : 'widget.graph',
	id : 'graph',
	store : 'Snowprofile',
	width : "100%",
	height : "100%",

	initComponent : function() {
		this.callParent(arguments);
	}
});