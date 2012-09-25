Ext.define('LWD.store.Snowprofile', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: false,
    autoSync: true,
    model: 'LWD.model.Snowprofile',
    listeners: {    	
    	load: function(store, records, successful) {
        }
    }
});