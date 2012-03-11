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
        this.control({
        	'#main-panel > regionen': {
        		itemclick: this.test
        	}
        });
        
        console.log('Regionen loaded!');
    },
    
    test: function() {
    	var gm = Ext.widget('regionen');
    	console.log('test');
    }
});