Ext.define('LWD.store.SnowprofilePreview', {
	extend : 'Ext.data.Store',
	autoLoad : true,
	autoSync : true,
	proxy : {
		type : 'rest',
		url : '/lwd/snowprofile',
		reader : {
			type : 'json',
			root : 'SnowprofileList'
		}
	},
	model : 'LWD.model.Snowprofile'
});