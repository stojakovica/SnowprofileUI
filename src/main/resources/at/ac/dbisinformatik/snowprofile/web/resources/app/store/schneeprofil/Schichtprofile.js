Ext.define('LWD.store.schneeprofil.Schichtprofile', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: true,
    autoSync: true,
	model: 'LWD.model.schneeprofil.Schichtprofil',
	proxy: {
        type: 'rest',
        url: '/lwd/snowprofile',
        reader: {
            type: 'json',
            root: 'data'
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
            //console.log(Ext.encode(Ext.pluck(store.data.items, 'data')));
        }
    },
    /*
	data: [
		{
			vonHoehe: 95.0, 
			bisHoehe: 92.0, 
			kornform: '3-3-3', 
			groesse: '0,5-0,5', 
			haerte: '3-4', 
			feuchte: '1', 
		},
	],
	*/	
    sorters: [{
        property: 'vonHoehe',
        direction:'DESC'
    }]
});