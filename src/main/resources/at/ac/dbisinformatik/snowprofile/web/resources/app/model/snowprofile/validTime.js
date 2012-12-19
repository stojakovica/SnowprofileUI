Ext.define('LWD.model.snowprofile.validTime', {
	extend : 'Ext.data.Model',
	associations : [ {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.TimeInstant',
		name : 'TimeInstant',
		associationKey : 'TimeInstant',
		getterName : 'getTimeInstant'
	} ],
	belongsTo : 'LWD.model.Snowprofile'
});