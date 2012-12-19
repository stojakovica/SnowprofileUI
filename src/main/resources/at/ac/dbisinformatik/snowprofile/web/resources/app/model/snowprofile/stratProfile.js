Ext.define('LWD.model.snowprofile.stratProfile', {
	extend : 'Ext.data.Model',
	associations : [ {
		type : 'hasMany',
		model : 'LWD.model.snowprofile.stratLayer',
		name : 'Layer',
		associationKey : 'Layer'
	} ],
	belongsTo : 'LWD.model.snowprofile.SnowProfileMeasurements'
});