Ext.define('LWD.controller.Schneeprofil', {
    extend: 'Ext.app.Controller',
	stores: [
        'schneeprofil.Kopf',
		'schneeprofil.Schichtprofile',
		'schneeprofil.Schneetemperatur'
	],
	models: [
        'schneeprofil.Kopf',
		'schneeprofil.Schichtprofil',
		'schneeprofil.Schneetemperatur'
	],
	
	views: [
        'schneeprofil.kopf',
        'schneeprofil.kopfreadonly',
        'schneeprofil.schichtprofil.List',
        'schneeprofil.schneetemperatur.List',
        'graph.Graph'
    ],

    init: function() {
        console.log('Schneeprofil loaded!');
    }
});