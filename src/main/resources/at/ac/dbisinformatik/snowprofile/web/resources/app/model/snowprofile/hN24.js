Ext.define('LWD.model.snowprofile.hN24', {
	extend : 'Ext.data.Model',
	associations : [ {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.Components',
		name : 'Components',
		associationKey : 'Components'
	} ],
	belongsTo : 'LWD.model.snowprofile.SnowProfileMeasurements'
});