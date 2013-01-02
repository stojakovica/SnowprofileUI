Ext.define('LWD.store.Schichtprofil', {
	extend : 'Ext.data.Store',
	autoLoad : true,
	autoSync : true,
	model : 'LWD.model.LayerProfile',
	proxy : {
		type : 'memory',
		reader : {
			type : 'json',
			root : 'Layer'
		}
	},
	sorters : [ {
		property : 'depthTop_content',
		direction : 'DESC',
		transform: parseFloat
	} ]
});