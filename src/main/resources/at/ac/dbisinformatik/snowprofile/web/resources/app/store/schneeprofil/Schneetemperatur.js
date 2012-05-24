Ext.define('LWD.store.schneeprofil.Schneetemperatur', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: true,
    autoSync: true,
    model: 'LWD.model.schneeprofil.Schneetemperatur',
    proxy: {
        type: 'rest',
        url: '/lwd/snowprofile',
        reader: {
            type: 'json',
            root: 'schneetemperatur'
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
    },
    sorters: [{
        property: 'hoehe_schneetemperatur',
        direction:'DESC'
    }]
});