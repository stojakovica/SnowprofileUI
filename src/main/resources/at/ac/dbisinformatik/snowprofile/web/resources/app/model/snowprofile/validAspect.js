Ext.define('LWD.model.snowprofile.validAspect', {
	extend : 'Ext.data.Model',
	associations : [ {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.AspectPosition',
		name : 'AspectPosition',
		associationKey : 'AspectPosition',
		getterName : 'getAspectPosition'
	} ],
	belongsTo : 'LWD.model.snowprofile.ObsPoint'
});