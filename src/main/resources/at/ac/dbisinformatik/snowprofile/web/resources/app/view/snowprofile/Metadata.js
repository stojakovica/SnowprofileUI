Ext.require([
    'Ext.form.*',
    'Ext.data.*'
]);

Ext.define('LWD.view.snowprofile.metadata', {
	extend: 'Ext.form.Panel',
	alias: 'widget.metadata',
	
	store: 'Metadata',
	
    bodyPadding: '5 5 0',
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 120
    },
    layout: 'hbox',
    anchor: '100%',
	
	initComponent: function() {
        var date = new Date();
        
        var edit = false;
        var disabled = true;
        if(edit) {
        	disabled = false;
        }
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{ 
            	xtype: 'button', 
            	text: 'Speichern',
            	handler: function() {
            		var panel = this.up('form');
                    var form = panel.getForm();
                    var store = Ext.data.StoreManager.lookup(panel.store);
                    if (form.isValid()) {
                    	store.loadRawData(form.getValues())
                    	store.fireEvent("dataupdate", store);
                    }
                }
            }]
        }],

        this.items = [
            {
            	xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
        	        	xtype: 'textfield',
        	        	name : 'name',
        	        	fieldLabel: 'Name',
        	        	anchor:'95%',
        	        },
        	        {
        	        	xtype: 'datefield',
        	        	name : 'profildatum',
        	        	fieldLabel: 'Profildatum',
        	        	format: "d.m.Y",
        	        	anchor:'95%',
        	        },
        	        {
        	        	xtype: 'timefield',
        	        	name : 'zeit',
        	        	fieldLabel: 'Zeit',
        	        	minValue: Ext.Date.parse('04:30:00 AM', 'h:i:s A'),
        	            maxValue: Ext.Date.parse('08:00:00 PM', 'h:i:s A'),
        	            format: "H:i",
        	            anchor:'95%',
        	        },
        	        {
        	        	xtype: 'combobox',
					    fieldLabel: 'Region',
					    name: 'region',
					    store: Ext.create('Ext.data.ArrayStore', {
					        fields: ['key', 'val'],
					        data : regionen 
					    }),
					    valueField: 'key',
					    displayField: 'val',
					    typeAhead: true,
					    queryMode: 'local',
					    emptyText: 'Bitte wählen Sie...',
					    anchor:'95%',
        	        },
        	        {
        	        	xtype: 'textfield',
        	        	name : 'hoehe',
        	        	fieldLabel: 'H&ouml;he (in m)',
        	        	anchor:'95%',
        	        },
        	        {
        	        	xtype: 'textfield',
        	        	name : 'profilort',
        	        	fieldLabel: 'Profilort',
        	        	anchor:'95%',
        	        },
        	        {
    	        		xtype: 'textfield',
    	        		name : 'utmKoordinaten',
    	        		fieldLabel: 'Koordinaten',
    	        		anchor:'95%',
    	        	},
    	        	{
    	        		xtype: 'textfield',
    	        		name : 'hangneigung',
    	        		fieldLabel: 'Hangneigung',
    	        		anchor:'95%',
    	        	},
    	        	{
    	        		xtype: 'checkboxfield',
    	        		name: 'hangneigungCheck',
    	        		fieldLabel: '',
    	        		labelSeparator: '',
    	        		hideEmptyLabel: false,
    	        		boxLabel: 'flach',
    	        		anchor:'95%',
    	        	},
    	        	{
    	        		xtype: 'checkboxfield',
    	        		name: 'setOnline',
    	        		fieldLabel: '',
    	        		labelSeparator: '',
    	        		hideEmptyLabel: false,
    	        		boxLabel: 'Online schalten',
    	        		anchor:'95%',
    	        	}
	        	]
          	},{
          		xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
                    {
                    	xtype: 'combobox',
                    	fieldLabel: 'Exposition',
                    	name: 'exposition',
                    	store: Ext.create('Ext.data.ArrayStore', {
                    		fields: ['val'],
                    		data : exposition 
                    	}),
                    	valueField: 'val',
                    	displayField: 'val',
                    	typeAhead: true,
                    	queryMode: 'local',
                    	emptyText: 'Bitte wählen Sie...',
                    	anchor:'100%',
                    },
                    {
                    	xtype: 'combobox',
                    	fieldLabel: 'Windgeschwindigkeit',
                    	name: 'windgeschwindigkeit',
                    	store: Ext.create('Ext.data.ArrayStore', {
                    		fields: ['key', 'val'],
                    		data : windgeschwindigkeit 
                    	}),
                    	valueField: 'key',
                    	displayField: 'val',
                    	typeAhead: true,
                    	queryMode: 'local',
                    	emptyText: 'Bitte wählen Sie...',
                    	anchor:'100%',
                    },
                    {
                    	xtype: 'combobox',
                    	fieldLabel: 'Windrichtung',
                    	name: 'windrichtung',
                    	store: Ext.create('Ext.data.ArrayStore', {
                    		fields: ['val'],
                    		data : windrichtung 
                    	}),
                    	valueField: 'val',
                    	displayField: 'val',
                    	typeAhead: true,
                    	queryMode: 'local',
                    	emptyText: 'Bitte wählen Sie...',
                    	anchor:'100%',
                    },
                    {
                    	xtype: 'textfield',
                    	name : 'lufttemperatur',
                    	fieldLabel: 'Lufttemperatur',
                    	anchor:'100%',
                    },
                    {
                    	xtype: 'combobox',
                    	fieldLabel: 'Niederschlag',
                    	name: 'niederschlag',
                    	store: Ext.create('Ext.data.ArrayStore', {
                    		fields: ['key', 'val'],
                    		data : niederschlag 
                    	}),
                    	valueField: 'key',
                    	displayField: 'val',
                    	typeAhead: true,
                    	queryMode: 'local',
                    	emptyText: 'Bitte wählen Sie...',
                    	anchor:'100%',
                    },
                    {
                    	xtype: 'combobox',
                    	fieldLabel: 'Intensit&auml;t des Niederschlags',
                    	name: 'intensitaetDesNS',
                    	store: Ext.create('Ext.data.ArrayStore', {
                    		fields: ['val'],
                    		data : intensitaetNiederschlag
                    	}),
                    	valueField: 'val',
                    	displayField: 'val',
                    	typeAhead: true,
                    	queryMode: 'local',
                    	emptyText: 'Bitte wählen Sie...',
                    	anchor:'100%',
                    },
                    {
                    	xtype: 'combobox',
                    	fieldLabel: 'Bew&ouml;lkung',
                    	name: 'bewoelkung',
                    	store: Ext.create('Ext.data.ArrayStore', {
                    		fields: ['key', 'val'],
                    		data : bewoelkung
                    	}),
                    	valueField: 'key',
                    	displayField: 'val',
                    	typeAhead: true,
                    	queryMode: 'local',
                    	emptyText: 'Bitte wählen Sie...',
                    	anchor:'100%',
                    },
                    {
                    	xtype: 'textareafield',
                    	name: 'sonstiges',
                    	fieldLabel: 'Sonstiges',
                    	value: '',
                    	anchor:'100%',
                    }
                ]
          	}
        ];
        var store = Ext.data.StoreManager.lookup('Snowprofile');
        
        store.on('load', this.refresh, this);
		store.on('datachanged', this.refresh, this);
        
        this.callParent(arguments);
    },

	refresh: function(store) {
    	var store = Ext.data.StoreManager.lookup(this.store);
    	this.getForm().setValues(store.getAt(0).data);
    }
});