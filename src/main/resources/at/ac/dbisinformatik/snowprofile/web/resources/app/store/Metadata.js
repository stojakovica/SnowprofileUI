Ext.define('LWD.store.Metadata', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: true,
    autoSync: true,
    model: 'LWD.model.Metadata',
    proxy: {
    	type: 'memory',
    	reader: {
            type: 'json'
        }
    }
});