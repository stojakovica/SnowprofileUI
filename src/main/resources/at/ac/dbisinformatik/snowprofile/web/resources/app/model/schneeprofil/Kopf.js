Ext.define('LWD.model.schneeprofil.Kopf', {
	extend: 'Ext.data.Model',
	fields: [
        {name: 'name'},
        {name: 'profildatum', type: 'date', dateFormat: 'd.m.Y'},
        {name: 'zeit'},
        {name: 'region'},
        {name: 'hoehe'},
        {name: 'profilort'},
        {name: 'utmKoordinaten'},
        {name: 'hangneigung'},
        {name: 'hangneigungCheck'},
        {name: 'exposition'},
        {name: 'windgeschwindigkeit'},
        {name: 'windrichtung'},
        {name: 'niederschlag'},
        {name: 'intensitaetDesNS'},
        {name: 'bewoelkung'},
        {name: 'sonstiges'}
    ]
});