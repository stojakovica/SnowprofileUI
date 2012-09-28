var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToEdit: 1
})

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
    		var store = Ext.data.StoreManager.lookup('Schichtprofil');
    		store.insert(store.getCount(), new LWD.model.snowprofile.stratLayer());
            rowEditing.startEdit(0, 0);
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
        iconCls: 'icon-delete',
        disabled: false,
        handler: function(){
            var selection = this.getView().getSelectionModel().getSelection()[0];
            if (selection) {
                store.remove(selection);
            }
        }
    }],
    plugins: [Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 1
    })],
    
    columns: [
		{
			header: 'Von Höhe[cm]',
			dataIndex: 'depthTop',
			flex: 1,
			editor: {
			    xtype: 'numberfield',
             allowBlank: false,
             minValue: 0,
			}
		},
		{
            header: 'Kornform',
            dataIndex: 'kornform',
            flex: 1,
            editor: {
                allowBlank: false
            }
		},
		{
			header: 'Grösse[D][mm]',
			dataIndex: 'groesse',
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
			dataIndex: 'lwc',
			flex: 1,
			editor: {
			allowBlank: false
		}
		}
	],
	
    initComponent: function() {
		var store = Ext.data.StoreManager.lookup('Snowprofile');
		store.on('load', this.refresh, this);
		store.on('datachanged', this.refresh, this);

//		this.getSelectionModel().on('selectionchange', function(selModel, selections){
//			this.down('#delete').setDisabled(selections.length === 0);
//		});
        
        this.callParent(arguments);
    },

    refresh: function(store) {
    	var schichtprofilStore = this.getStore();
    	if(Ext.isObject(store.getAt(0))) {
    		var stratprofiles = store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().stratProfiles().data.items;
    		schichtprofilStore.getProxy().clear();
    		schichtprofilStore.removeAll();
    		schichtprofilStore.add(stratprofiles);
    	}
    	else {
    		var schichtprofilStore = Ext.data.StoreManager.lookup('Schichtprofil');
    		schichtprofilStore.getProxy().clear();
    		schichtprofilStore.removeAll();
    	}
    }
});