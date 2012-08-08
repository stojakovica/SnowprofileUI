Ext.define('LWD.store.Snowtemperature', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: false,
    autoSync: true,
    model: 'LWD.model.TempProfile',
    proxy: {
    	type: 'memory',
    	reader: {
            type: 'json'
        }
    }
});