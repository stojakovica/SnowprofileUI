Ext.define('LWD.model.Snowprofile', {
	extend: 'Ext.data.Model',
	fields: [
	    ''     
	],
	associations: [
        {type: 'hasMany', model: 'LWD.model.schneeprofil.Schichtprofil',    name: 'schichtprofile', associationKey:'schichtprofile'},
        {type: 'hasMany', model: 'LWD.model.schneeprofil.Schneetemperatur', name: 'schneetemperatur', associationKey:'schneetemperatur'}
    ]
});