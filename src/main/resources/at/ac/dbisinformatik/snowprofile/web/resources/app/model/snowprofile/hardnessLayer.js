Ext.define('LWD.model.snowprofile.hardnessLayer', {
	extend : 'Ext.data.Model',
	fields : [ 'hardness', 'depthTop', 'thickness' ],
	belongsTo : 'LWD.model.snowprofile.hardnessProfile'
});