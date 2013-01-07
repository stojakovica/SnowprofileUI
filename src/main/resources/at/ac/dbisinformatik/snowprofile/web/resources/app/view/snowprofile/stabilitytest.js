Ext.define('LWD.view.snowprofile.stabilitytest' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.stabilitytest',
		
    store: 'Stabilitytest',
	
	border: false,
	
	selType: 'rowmodel',

    tbar: [{
        text: 'Neuer Stabilitätstest',
        handler: function(){
	    	var grid = this.up("grid");
			var rowEditing = grid.getPlugin("rowplugin");
			grid.getStore().insert(0, new LWD.model.StabilityProfile());
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
    plugins:[Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2,
        pluginId:'rowplugin'
    })],
    
    columns: [
		{
			header: 'Höhe[cm]',
			dataIndex: 'depth',
			flex: 1,
			menuDisabled: true,
			editor: {
			    xtype: 'numberfield',
	            allowBlank: false,
	            minValue: 0
			}
		},
		{
			header: 'Test (RB,CT,ECT)',
			dataIndex: 'test',
			id: 'test',
			flex: 1,
			menuDisabled: true,
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
			menuDisabled: true,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
					['CT 0','CT 0'],
					['CT 1','CT 1'],
					['CT 2','CT 2'],
					['CT 3','CT 3'],
					['CT 4','CT 4'],
					['CT 5','CT 5'],
					['CT 6','CT 6'],
					['CT 7','CT 7'],
					['CT 8','CT 8'],
					['CT 9','CT 9'],
					['CT 10','CT 10'],
					['CT 11','CT 11'],
					['CT 12','CT 12'],
					['CT 13','CT 13'],
					['CT 14','CT 14'],
					['CT 15','CT 15'],
					['CT 16','CT 16'],
					['CT 17','CT 17'],
					['CT 18','CT 18'],
					['CT 19','CT 19'],
					['CT 20','CT 20'],
					['CT 21','CT 21'],
					['CT 22','CT 22'],
					['CT 23','CT 23'],
					['CT 24','CT 24'],
					['CT 25','CT 25'],
					['CT 26','CT 26'],
					['CT 27','CT 27'],
					['CT 28','CT 28'],
					['CT 29','CT 29'],
					['CT 30','CT 30'],
					['ECTN 0','ECTN 0'],
					['ECTN 1','ECTN 1'],
					['ECTN 2','ECTN 2'],
					['ECTN 3','ECTN 3'],
					['ECTN 4','ECTN 4'],
					['ECTN 5','ECTN 5'],
					['ECTN 6','ECTN 6'],
					['ECTN 7','ECTN 7'],
					['ECTN 8','ECTN 8'],
					['ECTN 9','ECTN 9'],
					['ECTN 10','ECTN 10'],
					['ECTN 11','ECTN 11'],
					['ECTN 12','ECTN 12'],
					['ECTN 13','ECTN 13'],
					['ECTN 14','ECTN 14'],
					['ECTN 15','ECTN 15'],
					['ECTN 16','ECTN 16'],
					['ECTN 17','ECTN 17'],
					['ECTN 18','ECTN 18'],
					['ECTN 19','ECTN 19'],
					['ECTN 20','ECTN 20'],
					['ECTN 21','ECTN 21'],
					['ECTN 22','ECTN 22'],
					['ECTN 23','ECTN 23'],
					['ECTN 24','ECTN 24'],
					['ECTN 25','ECTN 25'],
					['ECTN 26','ECTN 26'],
					['ECTN 27','ECTN 27'],
					['ECTN 28','ECTN 28'],
					['ECTN 29','ECTN 29'],
					['ECTN 30','ECTN 30'],
					['RB 1','RB 1'],
					['RB 2','RB 2'],
					['RB 3','RB 3'],
					['RB 4','RB 4'],
					['RB 5','RB 5'],
					['RB 6','RB 6'],
					['RB 7','RB 7']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Bruchart',
			dataIndex: 'bruchart',
			flex: 1,
			menuDisabled: true,
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
			menuDisabled: true,
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
        this.callParent(arguments);
    },
    
    commit: function(edit, e) {
    	this.getStore().fireEvent("dataupdate", this.getStore());
    }
});