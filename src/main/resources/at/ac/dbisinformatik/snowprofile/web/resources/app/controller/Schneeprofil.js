Ext.define('LWD.controller.Schneeprofil', {
    extend: 'Ext.app.Controller',
	stores: [
		'schneeprofil.Schichtprofile',
	],
	models: [
		'schneeprofil.Schichtprofil',
	],
	
	views: [
        'schneeprofil.kopf',
        'schneeprofil.kopfreadonly',
        'schneeprofil.schichtprofil.List',
    ],

    init: function() {
        console.log('Schneeprofil loaded!');
    }
});