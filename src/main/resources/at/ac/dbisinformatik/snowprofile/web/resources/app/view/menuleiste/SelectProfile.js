Ext.define('LWD.view.menuleiste.SelectProfile', {
    extend: 'Ext.window.Window',
    alias : 'widget.selectprofile',

    title : 'Get ID',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'profile_id',
                        fieldLabel: 'Profile Id'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Ok',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});