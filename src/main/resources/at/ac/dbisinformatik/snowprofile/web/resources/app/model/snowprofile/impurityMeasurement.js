Ext.define('LWD.model.snowprofile.impurityMeasurement', {
	extend : 'Ext.data.Model',
	associations : [ {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.Components_impurityMeasurement',
		name : 'Components_impurityMeasurement',
		associationKey : 'Components'
	} ],
	belongsTo : 'LWD.model.snowprofile.Layer'
});