Ext.define('LWD.store.Stabilitytest', {
	extend: 'Ext.data.Store',
	autoLoad: true,
    autoSync: true,
    model: 'LWD.model.StabilityProfile',
    proxy: {
    	type: 'memory',
    	reader: {
            type: 'json'
        }
    },
    sorters: [{
        property: 'test',
        direction: 'ASC'
    },{
    	property: 'depth',
    	direction: 'DESC'
    }]
});