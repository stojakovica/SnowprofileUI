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
			grid.getStore().insert(0, new LWD.model.StabilityProfile());
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
			id: 'test',
			flex: 1,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['CT','CT'],
					['ECT','ECT'],
					['RB','RB']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            },
            handler: function() {
            	console.log(this);
            }
		},
		{
			header: 'Belastungsstufe',
			dataIndex: 'belastungsstufe',
			id: 'belastungsstufe',
			flex: 1,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['CT 0-30','CT 0-30'],
					['ECTN 0-30','ECTN 0-30'],
					['RB 1-6','RB 1-6']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Bruchart',
			dataIndex: 'bruchart',
			flex: 1,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['WB','ganzer Block'],
					['MB','Teilbruch'],
					['EB','nur Eck']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Bruchfläche',
			dataIndex: 'bruchflaeche',
			flex: 1,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['Clean','glatt'],
					['Rough','rau'],
					['Irregular','unregelmäßig']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		}
	],
	
    initComponent: function() {
		this.on('edit', this.commit);
		this.on('selectionchange', this.sChange);
        this.callParent(arguments);
    },
    
    commit: function(edit, e) {
    	this.getStore().fireEvent("dataupdate", this.getStore());
    },
    
    sChange: function(view, records) {
    	this.down("#belastungsstufe").store = [
			['Clean','glatt'],
			['Rough','rau'],
			['Irregular','unregelmäßig']
    	];
    }
});