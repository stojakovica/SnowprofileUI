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
		{value: "CT 30", display: "CT 30"},
		{value: "CT 31", display: "CT 31"}
    ]
});

var ectStore = Ext.create('Ext.data.Store', {
	fields: ['value', 'display'],
	data: [
       {value: "ECT 0", display: "ECT 0"},
       {value: "ECTP 1", display: "ECTP 1"},
       {value: "ECTP 2", display: "ECTP 2"},
       {value: "ECTP 3", display: "ECTP 3"},
       {value: "ECTP 4", display: "ECTP 4"},
       {value: "ECTP 5", display: "ECTP 5"},
       {value: "ECTP 6", display: "ECTP 6"},
       {value: "ECTP 7", display: "ECTP 7"},
       {value: "ECTP 8", display: "ECTP 8"},
       {value: "ECTP 9", display: "ECTP 9"},
       {value: "ECTP 10", display: "ECTP 10"},
       {value: "ECTP 11", display: "ECTP 11"},
       {value: "ECTP 12", display: "ECTP 12"},
       {value: "ECTP 13", display: "ECTP 13"},
       {value: "ECTP 14", display: "ECTP 14"},
       {value: "ECTP 15", display: "ECTP 15"},
       {value: "ECTP 16", display: "ECTP 16"},
       {value: "ECTP 17", display: "ECTP 17"},
       {value: "ECTP 18", display: "ECTP 18"},
       {value: "ECTP 19", display: "ECTP 19"},
       {value: "ECTP 20", display: "ECTP 20"},
       {value: "ECTP 21", display: "ECTP 21"},
       {value: "ECTP 22", display: "ECTP 22"},
       {value: "ECTP 23", display: "ECTP 23"},
       {value: "ECTP 24", display: "ECTP 24"},
       {value: "ECTP 25", display: "ECTP 25"},
       {value: "ECTP 26", display: "ECTP 26"},
       {value: "ECTP 27", display: "ECTP 27"},
       {value: "ECTP 28", display: "ECTP 28"},
       {value: "ECTP 29", display: "ECTP 29"},
       {value: "ECTP 30", display: "ECTP 30"},
       {value: "ECTN 1", display: "ECTN 1"},
       {value: "ECTN 2", display: "ECTN 2"},
       {value: "ECTN 3", display: "ECTN 3"},
       {value: "ECTN 4", display: "ECTN 4"},
       {value: "ECTN 5", display: "ECTN 5"},
       {value: "ECTN 6", display: "ECTN 6"},
       {value: "ECTN 7", display: "ECTN 7"},
       {value: "ECTN 8", display: "ECTN 8"},
       {value: "ECTN 9", display: "ECTN 9"},
       {value: "ECTN 10", display: "ECTN 10"},
       {value: "ECTN 11", display: "ECTN 11"},
       {value: "ECTN 12", display: "ECTN 12"},
       {value: "ECTN 13", display: "ECTN 13"},
       {value: "ECTN 14", display: "ECTN 14"},
       {value: "ECTN 15", display: "ECTN 15"},
       {value: "ECTN 16", display: "ECTN 16"},
       {value: "ECTN 17", display: "ECTN 17"},
       {value: "ECTN 18", display: "ECTN 18"},
       {value: "ECTN 19", display: "ECTN 19"},
       {value: "ECTN 20", display: "ECTN 20"},
       {value: "ECTN 21", display: "ECTN 21"},
       {value: "ECTN 22", display: "ECTN 22"},
       {value: "ECTN 23", display: "ECTN 23"},
       {value: "ECTN 24", display: "ECTN 24"},
       {value: "ECTN 25", display: "ECTN 25"},
       {value: "ECTN 26", display: "ECTN 26"},
       {value: "ECTN 27", display: "ECTN 27"},
       {value: "ECTN 28", display: "ECTN 28"},
       {value: "ECTN 29", display: "ECTN 29"},
       {value: "ECTN 30", display: "ECTN 30"},
       {value: "ECT 31", display: "ECT 31"}
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

var bruchartStore = Ext.create('Ext.data.Store', {
	fields: ['value', 'display'],
	data: [
       {value: "WB", display: "ganzer Block"},
       {value: "MB", display: "Teilbruch"},
       {value: "EB", display: "nur Eck"}
    ]
});

var bruchflaecheStore = Ext.create('Ext.data.Store', {
	fields: ['value', 'display'],
	data: [
       {value: "Clean", display: "glatt"},
       {value: "Rough", display: "rau"},
       {value: "Irregular", display: "unregelmäßig"}
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
				if (isRecord && me.setValue) {
					me.setValue(null);
					me.store = ctStore;
					test = me.store;
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
				if (isRecord && me.setValue) {
					me.setValue(null);
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
				if (isRecord && me.setValue) {
					me.setValue(null);
					me.store = rbStore;
					me.renderer = renderValue(rbStore);
				}
			});
			break;
	}
	console.log(test);
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
                valueField: 'value',
                displayField: 'display',
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Bruchart',
			dataIndex: 'bruchart',
			flex: 1,
			menuDisabled: true,
			renderer: renderValue(bruchartStore),
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                valueField: 'value',
                displayField: 'display',
                store: bruchartStore,
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
		},
		{
			header: 'Bruchfläche',
			dataIndex: 'bruchflaeche',
			flex: 1,
			menuDisabled: true,
			renderer: renderValue(bruchflaecheStore),
			field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                valueField: 'value',
                displayField: 'display',
                store: bruchflaecheStore,
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