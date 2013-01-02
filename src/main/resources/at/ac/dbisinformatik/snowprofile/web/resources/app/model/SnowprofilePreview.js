Ext.define('LWD.model.SnowprofilePreview', {
	extend: 'Ext.data.Model',
	associations : [ {
		type : 'hasMany',
		model : 'LWD.model.Snowprofile'
	} ],
});