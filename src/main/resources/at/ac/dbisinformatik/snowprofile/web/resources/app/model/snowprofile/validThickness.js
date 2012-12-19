Ext.define('LWD.model.snowprofile.validThickness', {
	extend : 'Ext.data.Model',
	associations : [ {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.ThinknessPosition',
		name : 'ThinknessPosition',
		associationKey : 'ThinknessPosition'
	} ],
	belongsTo : 'LWD.model.snowprofile.Layer'
});