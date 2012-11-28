Ext.require([ 
    'Ext.layout.container.*'
]);

Ext.application({
    name: 'LWD',

    appFolder: 'app',
    
    controllers: [
        'Snowprofile'
    ],
    
    launch: function() {
    	Ext.History.init();
    	
        Ext.create('Ext.Viewport', {
        	layout:'border',
        	defaults: {
        	    title: false
        	},
        	items: [
        	{
        	    region: 'north',
        	    items: [
    	            {
    	            	xtype: 'searchfield',
    	            	border: false
    	            }
        	    ]
        	},
        	{
        	    region:'center',
        	    items: [
    	            {
    	            	xtype: 'snowprofilepreview'
    	            }
        	    ]
        	}]
        });
    }
    
});