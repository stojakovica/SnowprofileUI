Ext.define('LWD.model.snowprofile.depthTop', {
	extend : 'Ext.data.Model',
	fields : [ 'content', 'uom' ],
	belongsTo : 'LWD.model.snowprofile.Layer'
});