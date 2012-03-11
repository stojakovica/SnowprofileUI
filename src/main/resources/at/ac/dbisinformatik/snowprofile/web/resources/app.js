Ext.application({
    name: 'LWD',

    appFolder: 'app',
    
    controllers: [
        'Users',
        'Regionen',
        'SchneeprofilEingabe',
        'GoogleMaps'
    ],
    
    launch: function() {
        Ext.create('Ext.Panel', {
        	id:'main-panel',
	        baseCls:'x-panel',
	        border: false,
	        renderTo: Ext.getBody(),
            layout: {
            	type: 'table',
            	columns: 2
            },
            defaults: {
            	frame: true,
            	width: 674,
            	height: 400
            },
            items: [
		        {
		            xtype: 'eingabeform',
		            title: 'Eingabe',
		            autoScroll: true
		        },
		        {
		            xtype: 'userlist',
		            title: 'Userliste'
		        },
		        {
		            xtype: 'regionen',
		            title: 'Regionen'
		        },
		        {
		            xtype: 'googlemaps',
		            title: 'Google Maps'
		        }
		    ]
        });
    }
    
});