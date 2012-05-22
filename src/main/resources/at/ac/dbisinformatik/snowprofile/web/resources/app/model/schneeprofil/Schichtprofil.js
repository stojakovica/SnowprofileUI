Ext.define('LWD.model.schneeprofil.Schichtprofil', {
	extend: 'Ext.data.Model',
	fields: [
        {name: 'vonHoehe', type: 'float'},
        {name: 'bisHoehe', type: 'float'},
        {name: 'kornform'},
        {name: 'groesse', type: 'string'},
        {name: 'haerte'},
        {name: 'feuchte'},
    ],
	validations: [{
        type: 'length',
        field: 'kornform',
        min: 1
    }, {
        type: 'length',
        field: 'groesse',
        min: 1
    }, {
        type: 'length',
        field: 'haerte',
        min: 1
    }, {
        type: 'length',
        field: 'feuchte',
        min: 1
    }]
});