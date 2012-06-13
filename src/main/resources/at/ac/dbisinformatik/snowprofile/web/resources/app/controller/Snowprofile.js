Ext.define('LWD.controller.Snowprofile', {
    extend: 'Ext.app.Controller',
	stores: [
	    'Snowprofile',
	],
	models: [
        'Snowprofile',
        //'snowprofile.Kopf',
	],
	
	views: [
        'snowprofile.kopf',
        'snowprofile.kopfreadonly',
        'snowprofile.schichtprofil',
        'snowprofile.schneetemperatur',
        'graph.Graph'
    ],

    init: function() {
        console.log('Snowprofile loaded!');
    }
});