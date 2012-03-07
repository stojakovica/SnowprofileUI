Ext.define('LWD.controller.SchneeprofilEingabe', {
    extend: 'Ext.app.Controller',
	stores: [
		'Users'
	],
	models: [
		'User'
	],
	
	views: [
        'schneeprofileingabe.eingabeform'
    ],

    init: function() {
    	console.log('Eingabe loaded!');
    }
});