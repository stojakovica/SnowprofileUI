Ext.define('LWD.model.snowprofile.densityProfile', {
	extend : 'Ext.data.Model',
	fields : [ 'uomDensity', 'uomDepthTop', 'uomThickness' ],
	associations : [ {
		type : 'hasMany',
		model : 'LWD.model.snowprofile.densityLayer',
		name : 'Layer',
		associationKey : 'Layer'
	} ],
	belongsTo : 'LWD.model.snowprofile.SnowProfileMeasurements'
});