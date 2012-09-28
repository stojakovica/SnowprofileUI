Ext.define('LWD.view.snowprofile.schichtprofil' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.schichtprofil',
		
    store: 'Schichtprofil',
	
	border: false,
	
	selType: 'rowmodel',

    tbar: [{
        text: 'Neues Schichtprofil',
        iconCls: 'icon-add',
        handler: function(){
    		var grid = this.up("grid");
    		var rowEditing = grid.getPlugin("rowplugin");
    		grid.getStore().insert(0, new LWD.model.snowprofile.stratLayer());
    		rowEditing.startEdit(0, 0);
    		grid.getStore().fireEvent("dataupdate", grid.getStore());
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
        iconCls: 'icon-delete',
        disabled: false,
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
			header: 'Von Höhe[cm]',
			dataIndex: 'depthTop_content',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
	            allowBlank: false,
	            minValue: 0,
			}
		},
		{
            header: 'Kornform 1',
            dataIndex: 'grainFormPrimary',
            flex: 1,
            editor: {
                allowBlank: false
            }
		},
		{
			header: 'Kornform 2',
			dataIndex: 'grainFormSecondary',
			flex: 1,
			editor: {
				allowBlank: false
			}
		},
		{
			header: 'Grösse[D][mm] avg',
			dataIndex: 'grainSize_Components_avg',
			flex: 1,
			editor: {
				allowBlank: false
			}
		},
		{
			header: 'Grösse[D][mm] avg max',
			dataIndex: 'grainSize_Components_avgMax',
			flex: 1,
			editor: {
				allowBlank: false
			}
		},
		{
			header: 'Härte[K]',
			dataIndex: 'hardness',
			flex: 1,
			editor: {
				allowBlank: false
			}
		},
		{
			header: 'Feuchte',
			dataIndex: 'lwc_content',
			flex: 1,
			editor: {
				allowBlank: false
			}
		}
	],
	
    initComponent: function() {
        this.callParent(arguments);
    }
});