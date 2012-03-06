Ext.define('LWD.controller.Messstationen', {
    extend: 'Ext.app.Controller',
	stores: [
		'Messstationen'
	],
	models: [
		'Messstation'
	],
	
	views: [
        'messstationen.List'
    ],

    init: function() {
        console.log('Messstation loaded!');
    }
});