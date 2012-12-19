Ext.define('LWD.model.snowprofile.snowProfileResultsOf', {
	extend : 'Ext.data.Model',
	associations : [ {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.SnowProfileMeasurements',
		name : 'SnowProfileMeasurements',
		associationKey : 'SnowProfileMeasurements',
		getterName : 'getSnowProfileMeasurements'
	} ],
	belongsTo : 'LWD.model.Snowprofile'
});