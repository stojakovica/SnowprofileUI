Ext.define('LWD.store.Snowprofile', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: true,
    autoSync: true,
    model: 'LWD.model.Snowprofile',
	proxy: {
        type: 'rest',
        url: '/lwd/snowprofile',
        reader: {
            type: 'json',
            root: 'SnowProfile'
        },
        writer: {
            type: 'json'
        }
    },
    listeners: {    	
    	write: function(store, operation){
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action),
                verb;
        }
    }
});