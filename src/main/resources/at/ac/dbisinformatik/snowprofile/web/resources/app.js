Ext.require([ 
    'Ext.layout.container.*', 
]);

Ext.application({
    name: 'LWD',

    appFolder: 'app',
    
    controllers: [
        'Schneeprofil',
        'GoogleMaps',
        'Graph',
        'Menu',
        'Users'
    ],
    
    launch: function() {
        Ext.create('Ext.Viewport', {
        	layout:'border',
        	defaults: {
        	    title: false
        	},
        	items: [{
        	    region: 'north',
        	    items: [
    	            {
    	            	xtype: 'menu',
    	            	border: false
    	            }
        	    ]
        	},{
        	    region:'west',
        	    width: 650,
        	    border: false,
        	    items: [
    	            {
    	            	xtype: 'tabpanel',
    	            	activeTab: 0, // index or id
                    	height: 305,
                    	width: '100%',
                    	items:[
                    	    {
                        		title: 'Kopf',
                        		autoScroll: true,
                        		items: [
                    		        {
                    		        	xtype: 'kopf',
                    		        	border: false
                    		        }
                        		]
                        	},
                        	{
                        	    title: 'Karte',
                        	    items: [
                    	            {
                    	            	xtype: 'googlemaps',
                    	            	width: '100%',
                    	            	height: '100%',
                    	            	border: false
                    	            }
                   	            ]
                        	}
                    	]
    	            },
    	            {
    	            	xtype: 'panel',
    	            	layout: 'fit',
    	            	height: 319,
                    	items: [
                	        {
                	        	xtype: 'tabpanel',
                	        	activeTab: 0,
                	        	border: false,
                	        	items: [
            	        	        {
            	        	        	title: 'Schichtprofil',
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'schichtprofillist',
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        },
            	        	        {
            	        	        	title: 'Schneetemperatur',
            	        	        },
            	        	        {
            	        	        	title: 'Schwachschicht'
            	        	        },
            	        	        {
            	        	        	title: 'Rutschblocktest'
            	        	        },
            	        	        {
            	        	        	title: 'Kompressionstest'
            	        	        },
            	        	        {
            	        	        	title: 'Rammwiderstand'
            	        	        },
            	        	        {
            	        	        	title: 'Dichte'
            	        	        },
            	        	        {
            	        	        	title: 'F&auml;den'
            	        	        },
                	        	]
                	        }
                    	]
    	            }
        	    ]
        	},{
        	    region:'center',
        	    items: [
    	            {
    	            	xtype: 'panel',
                    	layout: 'fit',
                    	height: '100%',
                    	autoScroll: true,
                    	border: false,
                    	html: '<img src="/lwd/static/1.0.0.0/data/img/test.gif" title="Test-Bild" style="width:100%" />'
    	            	//xtype: 'graph'
    	            }
        	    ]
        	}]
        });
    }
    
});