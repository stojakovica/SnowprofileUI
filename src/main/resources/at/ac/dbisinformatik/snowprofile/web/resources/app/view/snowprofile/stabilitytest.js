var testStore = Ext.create('Ext.data.Store', {
	fields: ['value', 'display'],
	data: [
		{value: "CT", display: "CT"},
		{value: "ECT", display: "ECT"},
		{value: "RB", display: "RB"}
   ]
	
});

var ctStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'display'],
    data: [
        {value: "CT 0", display: "CT 0"},
		{value: "CT 1", display: "CT 1"},
		{value: "CT 2", display: "CT 2"},
		{value: "CT 3", display: "CT 3"},
		{value: "CT 4", display: "CT 4"},
		{value: "CT 5", display: "CT 5"},
		{value: "CT 6", display: "CT 6"},
		{value: "CT 7", display: "CT 7"},
		{value: "CT 8", display: "CT 8"},
		{value: "CT 9", display: "CT 9"},
		{value: "CT 10", display: "CT 10"},
		{value: "CT 11", display: "CT 11"},
		{value: "CT 12", display: "CT 12"},
		{value: "CT 13", display: "CT 13"},
		{value: "CT 14", display: "CT 14"},
		{value: "CT 15", display: "CT 15"},
		{value: "CT 16", display: "CT 16"},
		{value: "CT 17", display: "CT 17"},
		{value: "CT 18", display: "CT 18"},
		{value: "CT 19", display: "CT 19"},
		{value: "CT 20", display: "CT 20"},
		{value: "CT 21", display: "CT 21"},
		{value: "CT 22", display: "CT 22"},
		{value: "CT 23", display: "CT 23"},
		{value: "CT 24", display: "CT 24"},
		{value: "CT 25", display: "CT 25"},
		{value: "CT 26", display: "CT 26"},
		{value: "CT 27", display: "CT 27"},
		{value: "CT 28", display: "CT 28"},
		{value: "CT 29", display: "CT 29"},
		{value: "CT 30", display: "CT 30"}
    ]
});

var ectStore = Ext.create('Ext.data.Store', {
	fields: ['value', 'display'],
	data: [
       {value: "ECT 0", display: "ECT 0"},
       {value: "ECT 1", display: "ECT 1"},
       {value: "ECT 2", display: "ECT 2"},
       {value: "ECT 3", display: "ECT 3"},
       {value: "ECT 4", display: "ECT 4"},
       {value: "ECT 5", display: "ECT 5"},
       {value: "ECT 6", display: "ECT 6"},
       {value: "ECT 7", display: "ECT 7"},
       {value: "ECT 8", display: "ECT 8"},
       {value: "ECT 9", display: "ECT 9"},
       {value: "ECT 10", display: "ECT 10"},
       {value: "ECT 11", display: "ECT 11"},
       {value: "ECT 12", display: "ECT 12"},
       {value: "ECT 13", display: "ECT 13"},
       {value: "ECT 14", display: "ECT 14"},
       {value: "ECT 15", display: "ECT 15"},
       {value: "ECT 16", display: "ECT 16"},
       {value: "ECT 17", display: "ECT 17"},
       {value: "ECT 18", display: "ECT 18"},
       {value: "ECT 19", display: "ECT 19"},
       {value: "ECT 20", display: "ECT 20"},
       {value: "ECT 21", display: "ECT 21"},
       {value: "ECT 22", display: "ECT 22"},
       {value: "ECT 23", display: "ECT 23"},
       {value: "ECT 24", display: "ECT 24"},
       {value: "ECT 25", display: "ECT 25"},
       {value: "ECT 26", display: "ECT 26"},
       {value: "ECT 27", display: "ECT 27"},
       {value: "ECT 28", display: "ECT 28"},
       {value: "ECT 29", display: "ECT 29"},
       {value: "ECT 30", display: "ECT 30"}
    ]
});

var rbStore = Ext.create('Ext.data.Store', {
	fields: ['value', 'display'],
	data: [
       {value: "RB 1", display: "RB 1"},
       {value: "RB 2", display: "RB 2"},
       {value: "RB 3", display: "RB 3"},
       {value: "RB 4", display: "RB 4"},
       {value: "RB 5", display: "RB 5"},
       {value: "RB 6", display: "RB 6"},
       {value: "RB 7", display: "RB 7"}
	]
});

// aktualisiert die Belastungsstufenauswahl abhängig vom Stabilitätstest, noch nicht fertig
var handleTest = function(editor, record) {
	switch(record) {
		case "CT":
			var isRecord = record == 'CT';
			Ext.each([
			          editor.down('field[name="belastungsstufe"], [dataIndex="belastungsstufe"]'),
			          ], function() {
				var me = this.field || this;
				console.log(me);
				if (isRecord && me.setValue) {
					me.valueField = 'value';
					me.displayField = 'display';
					me.store = ctStore;
					me.renderer = renderValue(ctStore);
				}
			});
			break;
		case "ECT":
			var isRecord = record == 'ECT';
			Ext.each([
			          editor.down('field[name="belastungsstufe"], [dataIndex="belastungsstufe"]'),
			          ], function() {
				var me = this.field || this;
				console.log(me);
				if (isRecord && me.setValue) {
					me.valueField = 'value';
					me.displayField = 'display';
					me.store = ectStore;
					me.renderer = renderValue(ectStore);
				}
			});
			break;
		case "RB":
			var isRecord = record == 'RB';
			Ext.each([
			          editor.down('field[name="belastungsstufe"], [dataIndex="belastungsstufe"]'),
			          ], function() {
				var me = this.field || this;
				console.log(me);
				if (isRecord && me.setValue) {
					me.valueField = 'value';
					me.displayField = 'display';
					me.store = rbStore;
					me.renderer = renderValue(rbStore);
				}
			});
			break;
	}
};

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
    
    listeners: {
        keypress: function(editor, e) {
            handleTest(editor.grid, e.record.get('test'));
        }
    },
    
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
			renderer: renderValue(testStore),
			flex: 1,
			menuDisabled: true,
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: testStore,
                lazyRender: true,
                listClass: 'x-combo-list-small',
                valueField: 'value',
                displayField: 'display',
                listeners: {
                    select: function(combo, record, index) {
                    	handleTest(combo.up(), record[0].data.value);
                    }
                }
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