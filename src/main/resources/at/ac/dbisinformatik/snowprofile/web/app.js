Ext.application({
    name: 'LWD',

    appFolder: 'app',
    
    controllers: [
        'Users'
    ],
    
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'userlist',
                }
            ]
        });
    }
    
});