Ext.application({
    name: 'LWD',

    appFolder: 'app',
    
    controllers: [
        'Regionen',
        'SchneeprofilEingabe',
        'GoogleMaps',
        'Graph',
        'Menu'
    ],
    
    launch: function() {
        Ext.create('Ext.Viewport', {
        	layout:'fit',
        	items: {
        	    xtype: 'menu',
        	    border: false
        	}
        });
    }
    
});