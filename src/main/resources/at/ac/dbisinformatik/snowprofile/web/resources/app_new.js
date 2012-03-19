Ext.require([ 
    'Ext.layout.container.*', 
]);

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
        	items: [ 
        		{
        			xtype: 'panel',
                    items: [
                        {
                        	xtype: 'menu',
                        	border: false
                        },
                        {
                        	xtype: 'panel',
                        	layout: 'column',
                            defaults: {
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%',
                                    collapsible: true
                                }
                            },
                	    	items: [{
                                columnWidth: 1/2,
                                baseCls:'x-plain',
                                items: [
                                    {
                                    	xtype: 'tabpanel',
                                    	activeTab: 0, // index or id
                                    	height: '50%',
                                    	items:[
                                    	    {
	                                    		title: 'Kopf',
	                                    		autoScroll: true,
	                                    		bodyStyle: 'padding:5px; border:none',
	                                    		items: [
	                                		        {
	                                		        	xtype: 'eingabeform',
	                                		        	bodyStyle: 'border:none',
	                                		        	border: false
	                                		        }
	                                    		]
	                                    	},
	                                    	{
	                                    	    title: 'Karte',
	                                    	    items: [
                                    	            {
                                    	            	xtype: 'googlemaps',
                                    	            	height: '100%',
                                    	            }
                                   	            ]
	                                    	}
                                    	]
                                    },
                                    {
                                    	xtype: 'panel',
                                    	layout: 'fit',
                                    	height: '50%',
                                    	items: [
                                	        {
                                	        	xtype: 'regionen',
                                	        	border: true,
                                	        	autoScroll: true
                                	        }
                                    	]
                                    }
                                ]
                            },{
                                columnWidth: 1/2,
                                baseCls:'x-plain',
                                items: [
                                    {
                                    	xtype: 'panel',
                                    	layout: 'fit',
                                    	height: '100%',
                                    	autoScroll: true,
                                    	border: true,
                                    	html: '<img src="/lwd/static/1.0.0.0/data/img/test.gif" title="Test-Bild" style="width:100%" />'
                                    }
                                ]
                            }]
                        }
                    ]
        		}
        	]
        });
    }
    
});