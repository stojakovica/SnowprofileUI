Ext.define('LWD.controller.GoogleMaps', {
    extend: 'Ext.app.Controller',
	stores: [
		'GoogleMaps'
	],
	models: [
		'GoogleMaps'
	],
	
	views: [
        'googlemaps.Map'
    ],

    init: function() {
        console.log('Google Maps loaded!');
    }
});