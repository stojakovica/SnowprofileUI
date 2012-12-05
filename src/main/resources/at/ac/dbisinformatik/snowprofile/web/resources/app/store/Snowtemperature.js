Ext.define('LWD.store.Snowtemperature', {
	extend: 'Ext.data.Store',
	autoLoad: true,
    autoSync: true,
    model: 'LWD.model.TempProfile',
    proxy: {
    	type: 'memory',
    	reader: {
            type: 'json',
            root: 'Obs'
        }
    },
    sorters: [{
        property: 'depth',
        direction: 'DESC'
    }]
});