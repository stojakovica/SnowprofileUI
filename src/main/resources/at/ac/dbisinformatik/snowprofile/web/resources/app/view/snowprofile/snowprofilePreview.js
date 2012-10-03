Ext.define('LWD.view.snowprofile.snowprofilepreview' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.snowprofilepreview',
	itemId: 'snowprofilePreviewGrid',
    store: 'Snowprofile',
	
	border: false,
	height: '100%',

    tbar: [{
        text: 'Neues Schneeprofil',
//        iconCls: 'icon-add',
        handler: function(){
    		var grid = this.up("grid");
    		var rowEditing = grid.getPlugin("rowplugin");
    		grid.getStore().insert(0, new LWD.model.LayerProfile());
    		rowEditing.startEdit(0, 0);
        }
    }, '-', {
        itemId: 'edit',
        text: 'Bearbeiten',
//        iconCls: 'icon-delete',
        handler: function(){
    		alert("Link to snowprofileDetail with ID");
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
//        iconCls: 'icon-delete',
        handler: function(){
    		var grid = this.up("grid");
            var selection = grid.getView().getSelectionModel().getSelection()[0];
            if (selection) {
            	grid.getStore().remove(selection);
            	grid.getStore().fireEvent("dataupdate", grid.getStore());
            	alert("");
            }
        }
    }],

    columns: [
		{
			header: 'Name',
			dataIndex: 'name',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
	            allowBlank: false,
	            minValue: 0,
			}
		},
		{
            header: 'Ort',
            dataIndex: 'ort',
            flex: 1,
            editor: {
                allowBlank: false
            }
		},
		{
			header: 'Datum',
			dataIndex: 'datum',
			flex: 1,
			editor: {
				allowBlank: false
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