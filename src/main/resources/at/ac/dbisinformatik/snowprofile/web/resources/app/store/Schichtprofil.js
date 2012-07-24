Ext.define('LWD.store.Schichtprofil', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: false,
    autoSync: true,
    model: 'LWD.model.LayerProfile',
    proxy: {
    	type: 'memory',
    	reader: {
            type: 'json'
        }
    }
});