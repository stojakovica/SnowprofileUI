Ext.define('LWD.model.snowprofile.TimeInstant', {
	extend : 'Ext.data.Model',
	fields : [ 'id', 'timePosition' ],
	belongsTo : 'LWD.model.snowprofile.validTime'
});