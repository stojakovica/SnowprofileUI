Ext.define('LWD.controller.Menu', {
    extend: 'Ext.app.Controller',
	views: [
        'menuleiste.Menu'
    ],

    init: function() {
		console.log('Menu loaded!');
    }
});