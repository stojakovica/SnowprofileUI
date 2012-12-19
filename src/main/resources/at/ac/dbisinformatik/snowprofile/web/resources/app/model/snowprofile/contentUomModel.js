Ext.define('LWD.model.snowprofile.contentUomModel', {
	extend : 'Ext.data.Model',
	fields : [ 'content', 'uom' ],
	associations : [ {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.SnowProfileMeasurements',
		name : 'SnowProfileMeasurements',
		associationKey : 'SnowProfileMeasurements'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.MeasurementComponents',
		name : 'MeasurementComponents',
		associationKey : 'MeasurementComponents'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.Components',
		name : 'Components',
		associationKey : 'Components'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.Layer',
		name : 'Layer',
		associationKey : 'Layer'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.ProfMetaData',
		name : 'ProfMetaData',
		associationKey : 'ProfMetaData'
	} ]
});