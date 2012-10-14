Ext.define('LWD.store.Schichtprofil', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: false,
    autoSync: true,
    model: 'LWD.model.LayerProfile',
    proxy: {
    	type: 'memory',
    	reader: {
            type: 'json',
            root: 'Layer'
        }
    },
    sorters: [{
        property: 'depthTop_content',
        direction: 'DESC'
    }]
});