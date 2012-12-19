Ext.define('LWD.store.Metadata', {
	extend : 'Ext.data.Store',
	autoLoad : true,
	autoSync : true,
	model : 'LWD.model.Metadata',
	proxy : {
		type : 'memory',
		reader : {
			type : 'json'
		}
	}
});