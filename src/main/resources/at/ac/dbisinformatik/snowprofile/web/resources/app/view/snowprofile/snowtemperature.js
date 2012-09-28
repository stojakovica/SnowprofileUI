Ext.define('LWD.view.snowprofile.snowtemperature' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.snowtemperature',
		
    store: 'Snowtemperature',
	
	border: false,
	
	selType: 'rowmodel',

    tbar: [{
        text: 'Neue Schneetemperatur',
        iconCls: 'icon-add',
        handler: function(){
    		this.store.insert(store.getCount(), new LWD.model.snowprofile.stratLayer());
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
    }],
    plugins: [Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2
    })],
    
    columns: [
		{
			header: 'Von Höhe[cm]',
			dataIndex: 'depth',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
	             allowBlank: false,
	             minValue: 0,
			}
		},
		{
			header: 'Temperatur[°C]',
			dataIndex: 'snowTemp',
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				if(value != 0) return "-"+(value/10);
				else return value;
			},
			flex: 1,
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				minValue: 0,
			}
		}
	],
	
    initComponent: function() {
		var store = Ext.data.StoreManager.lookup('Snowprofile');
		
        this.callParent(arguments);
    }
});