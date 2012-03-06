Ext.application({
    name: 'LWD',

    appFolder: 'app',
    
    controllers: [
        'Users',
        'Messstationen',
        'SchneeprofilEingabe'
    ],
    
    launch: function() {
        Ext.create('Ext.Panel', {
        	id:'main-panel',
	        baseCls:'x-plain',
	        renderTo: Ext.getBody(),
            layout: {
            	type: 'table',
            	columns: 2
            },
            defaults: {
            	frame: true,
            	width: 650,
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
		            title: 'Child Panel 2',
		        },
		        {
		            xtype: 'messstationen',
		            title: 'Messstationen',
		        },
		        {
		            xtype: 'panel',
		            title: 'Child Panel 4',
		        }
		    ]
        });
    }
    
});