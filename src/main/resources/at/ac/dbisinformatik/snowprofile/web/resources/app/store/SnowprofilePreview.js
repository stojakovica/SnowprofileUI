Ext.define('LWD.store.SnowprofilePreview', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: true,
    autoSync: true,
    proxy: {
		type: 'rest',
        url: '/lwd/snowprofile',
		reader: {
			type: 'json',
			root: 'SnowprofileList'
		}
	},
    model: 'LWD.model.Snowprofile',
    listeners: {    	
    	load: function(store, records, successful) {
        }
    }
});