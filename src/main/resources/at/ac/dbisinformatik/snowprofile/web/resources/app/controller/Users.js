Ext.define('LWD.controller.Users', {
    extend: 'Ext.app.Controller',
	stores: [
		'Users'
	],
	models: [
		'Users',
		'Order'
	],

    init: function() {
        console.log('Users loaded!');
    }
});