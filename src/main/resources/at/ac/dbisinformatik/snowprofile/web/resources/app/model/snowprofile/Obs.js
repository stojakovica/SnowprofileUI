Ext.define('LWD.model.snowprofile.Obs', {
	extend : 'Ext.data.Model',
	fields : [ 'depth', 'snowTemp' ],
	belongsTo : 'LWD.model.snowprofile.tempProfile'
});