Ext.define('LWD.view.snowprofile.stabilitytest' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.stabilitytest',
		
    store: 'Stabilitytest',
	
	border: false,
	
	selType: 'rowmodel',

    tbar: [{
        text: 'Neuer Stabilitätstest',
        iconCls: 'icon-add',
        handler: function(){
	    	var grid = this.up("grid");
			var rowEditing = grid.getPlugin("rowplugin");
			grid.getStore().insert(0, new LWD.model.stabilityProfile());
			rowEditing.startEdit(0, 0);
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
        iconCls: 'icon-delete',
        disabled: true,
        handler: function(){
	    	var grid = this.up("grid");
	        var selection = grid.getView().getSelectionModel().getSelection()[0];
	        if (selection) {
	        	grid.getStore().remove(selection);
	        	grid.getStore().fireEvent("dataupdate", grid.getStore());
	        }
        }
    }],
    plugins:[Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2,
        pluginId:'rowplugin'
    })],
    
    columns: [
		{
			header: 'Höhe[cm]',
			dataIndex: 'depth',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
	             allowBlank: false,
	             minValue: 0,
			}
		},
		{
			header: 'Test (RB,CT,ECT)',
			dataIndex: 'test',
			flex: 1,
			editor: {
				allowBlank: false,
			}
		},
		{
			header: 'Belastungsstufe',
			dataIndex: 'belastungsstufe',
			flex: 1,
			editor: {
				allowBlank: false,
			}
		},
		{
			header: 'Bruchart',
			dataIndex: 'bruchart',
			flex: 1,
			editor: {
				allowBlank: false,
			}
		},
		{
			header: 'Bruchfläche',
			dataIndex: 'bruchflaeche',
			flex: 1,
			editor: {
				allowBlank: false,
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