Ext.define('LWD.store.Schichtprofil', {
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
    	load: {
	        fn: function(store, records, success, operations) {
    			Ext.each(records, function(rec) {
    				rec.snowProfileResultsOf().data.getAt(0).SnowProfileMeasurements().data.getAt(0).stratProfile().data.getAt(0).Layer().data.items;
    			});
	        }
    	},
    	
    	write: function(store, operation){
            var record = operation.getRecords()[0],
                name = Ext.String.capitalize(operation.action),
                verb;
        }
    }
});