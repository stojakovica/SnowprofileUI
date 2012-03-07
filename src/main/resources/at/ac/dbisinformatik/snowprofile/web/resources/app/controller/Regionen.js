Ext.define('LWD.controller.Regionen', {
    extend: 'Ext.app.Controller',
	stores: [
		'Regionen'
	],
	models: [
		'Region'
	],
	
	views: [
        'regionen.List'
    ],

    init: function() {
        console.log('Regionen loaded!');
    }
});