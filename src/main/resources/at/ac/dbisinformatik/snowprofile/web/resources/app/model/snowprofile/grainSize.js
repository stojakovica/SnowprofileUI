Ext.define('LWD.model.snowprofile.grainSize', {
	extend : 'Ext.data.Model',
	fields : [ 'uom' ],
	associations : [ {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.SnowProfileMeasurements',
		name : 'SnowProfileMeasurements',
		associationKey : 'SnowProfileMeasurements'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.Layer',
		name : 'Layer',
		associationKey : 'Layer'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.Components',
		name : 'Components',
		associationKey : 'Components'
	} ]
});