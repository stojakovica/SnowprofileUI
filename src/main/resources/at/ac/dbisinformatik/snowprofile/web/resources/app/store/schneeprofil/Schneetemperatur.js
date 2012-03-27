Ext.define('LWD.store.schneeprofil.Schneetemperatur', {
	extend: 'Ext.data.Store',
	model: 'LWD.model.schneeprofil.Schneetemperatur',
	
	// destroy the store if the grid is destroyed
    autoDestroy: true,
    model: 'Plant',
    proxy: {
        type: 'ajax',
        // load remote data using HTTP
        url: 'plants.xml',
        // specify a XmlReader (coincides with the XML format of the returned data)
        reader: {
            type: 'xml',
            // records will have a 'plant' tag
            record: 'plant'
        }
    },
    sorters: [{
        property: 'common',
        direction:'ASC'
    }]
});