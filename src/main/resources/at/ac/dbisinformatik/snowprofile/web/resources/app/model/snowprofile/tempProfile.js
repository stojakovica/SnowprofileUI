Ext.define('LWD.model.snowprofile.tempProfile', {
	extend : 'Ext.data.Model',
	associations : [ {
		type : 'hasMany',
		model : 'LWD.model.snowprofile.Obs',
		name : 'Obs',
		associationKey : 'Obs'
	} ],
	belongsTo : 'LWD.model.snowprofile.SnowProfileMeasurements'
});