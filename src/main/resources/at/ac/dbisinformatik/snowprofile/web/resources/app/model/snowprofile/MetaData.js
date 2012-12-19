Ext.define('LWD.model.snowprofile.MetaData', {
	extend : 'Ext.data.Model',
	fields : [ 'methodOfMeas' ],
	belongsTo : 'LWD.model.snowprofile.hardnessProfile'
});