Ext.define('LWD.store.Stabilitytest', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: false,
    autoSync: true,
    model: 'LWD.model.StabilityProfile',
    proxy: {
    	type: 'memory',
    	reader: {
            type: 'json'
        }
    }
});