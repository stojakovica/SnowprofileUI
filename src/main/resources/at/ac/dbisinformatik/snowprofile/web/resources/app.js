Ext.require([ 
    'Ext.layout.container.*'
]);

Ext.application({
    name: 'LWD',

    appFolder: 'app',
    
    controllers: [
        'Snowprofile',
        'GoogleMaps'
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
    	            	xtype: 'menuleiste',
    	            	border: false
    	            }
        	    ]
        	},{
        	    region:'west',
        	    width: 650,
        	    border: false,
        	    items: [
//    	            {
//    	            	xtype: 'tabpanel',
//    	            	activeTab: 0, // index or id
//                    	height: 305,
//                    	width: '100%',
//                    	items:[
                    	    {
//                        		title: 'Kopf',
                        		autoScroll: true,
                        		items: [
                    		        {
                    		        	xtype: 'metadata',
                    		        	border: false
                    		        }
                        		]
//                        	},
//                        	{
//                        	    title: 'Karte',
//                        	    items: [
//                    	            {
//                    	            	xtype: 'googlemaps',
//                    	            	width: '100%',
//                    	            	height: '100%',
//                    	            	border: false
//                    	            }
//                   	            ]
//                        	}
//                    	]
    	            },
    	            {
    	            	xtype: 'panel',
    	            	layout: 'fit',
    	            	autoScroll: true,
    	            	border: false,
                    	items: [
                	        {
                	        	xtype: 'tabpanel',
                	        	activeTab: 0,
                	        	border: false,
                	        	items: [
            	        	        {
            	        	        	title: 'Schichtprofil',
            	        	        	border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'schichtprofil',
        	        	        	        	height: 400,
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        },
            	        	        {
            	        	        	title: 'Schneetemperatur',
        	        	        		border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'snowtemperature',
        	        	        	        	height: 400,
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        },
            	        	        {
            	        	        	title: 'Stabilitätstests',
            	        	        	border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'stabilitytest',
        	        	        	        	height: 400,
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        }
                	        	]
                	        }
                    	]
    	            }
        	    ]
        	},{
        	    region:'center',
        	    items: [
    	            {
    	            	xtype: 'graph',
                    	layout: 'fit',
                    	height: "100%",
                    	autoScroll: true,
                    	border: false
    	            }
        	    ]
        	}]
        });
    }
    
});