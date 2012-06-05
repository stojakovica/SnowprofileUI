var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');

Ext.define('LWD.view.snowprofile.schneetemperatur' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.schneetemperatur',
	
	store: 'Snowprofile',
	
	height: 400,
	
	border: false,
	
	selModel: {
        selType: 'cellmodel'
    },
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Neue Schneetemperatur',
            iconCls: 'icon-add',
            handler: function(){
        		var store = Ext.data.StoreManager.lookup('schneeprofil.Schneetemperatur');
        		store.insert(store.getCount(), new LWD.model.schneeprofil.Schneetemperatur());
                rowEditing.startEdit(0, 0);
            }
        }, '-', {
            itemId: 'delete',
            text: 'Löschen',
            iconCls: 'icon-delete',
            disabled: true,
            handler: function(){
                var selection = grid.getView().getSelectionModel().getSelection()[0];
                if (selection) {
                    store.remove(selection);
                }
            }
        }]
    }],
    plugins: [rowEditing],
	
    initComponent: function() {
    	
        this.columns = [
			{
				id: 'hoehe',
				header: 'Höhe[cm]',
				dataIndex: 'hoehe_schneetemperatur',
				flex: 1,
				editor: {
				    xtype: 'numberfield',
	                allowBlank: false,
	                minValue: 0,
	                maxValue: 700
				}
			},
			{
				header: '-T[°C]',
				dataIndex: 'temperatur',
				flex: 1,
				editor: {
					xtype: 'numberfield',
	                allowBlank: false,
	                minValue: 0,
	                maxValue: 50
				}
			}
        ];
        
        this.getSelectionModel().on('selectionchange', function(selModel, selections){
        	//this.down('#delete').setDisabled(selections.length === 0);
        });
        this.callParent(arguments);
    }
});