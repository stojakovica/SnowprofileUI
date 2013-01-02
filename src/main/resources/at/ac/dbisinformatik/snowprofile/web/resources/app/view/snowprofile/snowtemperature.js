Ext.define('LWD.view.snowprofile.snowtemperature' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.snowtemperature',
    itemId: 'snowtemperatureGrid',
    store: 'Snowtemperature',
	
	border: false,
	
	selType: 'rowmodel',

    tbar: [{
        text: 'Neue Schicht',
        handler: function(){
			var grid = this.up("grid");
			var rowEditing = grid.getPlugin("rowplugin");
			grid.getStore().insert(0, new LWD.model.TempProfile());
			rowEditing.startEdit(0, 0);
	    }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
        handler: function(){
			var grid = this.up("grid");
	        var selection = grid.getView().getSelectionModel().getSelection()[0];
	        if (selection) {
	        	grid.getStore().remove(selection);
	        	grid.getStore().fireEvent("dataupdate", grid.getStore());
	        }
	    }
    }],
    plugins: [Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2,
        pluginId:'rowplugin'
    })],
    
    columns: [
		{
		        header: '<b>[H]</b><br>Oberkante [cm]',
			dataIndex: 'depth',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
	             allowBlank: false,
	             minValue: 0
			}
		},
		{
			header: '<b>[T]</b><br>Temperatur [°C]',
			dataIndex: 'snowTemp',
			renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
				if(value != 0) return "-"+value;
				else return value;
			},
			flex: 1,
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				minValue: 0
			}
		}
	],
	
    initComponent: function() {
		this.on('edit', this.commit);
        this.callParent(arguments);
    },
    
    commit: function(edit, e) {
    	this.getStore().fireEvent("dataupdate", this.getStore());
    }
});
