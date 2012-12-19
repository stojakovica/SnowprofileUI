Ext.define('LWD.model.snowprofile.windSpd', {
	extend : 'Ext.data.Model',
	fields : [ 'content', 'uom' ],
	associations : [ {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.SnowProfileMeasurements',
		name : 'SnowProfileMeasurements',
		associationKey : 'SnowProfileMeasurements'
	} ]
});