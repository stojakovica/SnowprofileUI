Ext.define('LWD.view.schneeprofil.schichtprofil.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.schichtprofiledit',

    title : 'Schichtprofil bearbeiten',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'vonHoehe',
                        fieldLabel: 'Von Höhe[cm]'
                    },
                    {
                        xtype: 'textfield',
                        name : 'bisHoehe',
                        fieldLabel: 'Bis Höhe[cm]'
                    },
                    {
                    	xtype: 'textfield',
                    	name : 'kornform',
                    	fieldLabel: 'Konrform[F]'
                    },
                    {
                    	xtype: 'textfield',
                    	name : 'groesse',
                    	fieldLabel: 'Grösse[D][mm]'
                    },
                    {
                    	xtype: 'textfield',
                    	name : 'haerte',
                    	fieldLabel: 'Härte[K]'
                    },
                    {
                    	xtype: 'textfield',
                    	name : 'feuchte',
                    	fieldLabel: 'Feuchte'
                    },
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
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