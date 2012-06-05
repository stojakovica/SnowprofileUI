Ext.require([
    'Ext.form.*',
    'Ext.data.*'
]);

Ext.define('LWD.view.snowprofile.kopf', {
	extend: 'Ext.form.Panel',
	alias: 'widget.kopf',
	
	store: 'Snowprofile',
	
	initComponent: function() {
		//var store = Ext.data.StoreManager.lookup('Snowprofile'); 
		//store.on('load', this.refresh, this);
        var date = new Date();
        
        var edit = false;
        var disabled = true;
        if(edit) {
        	disabled = false;
        }

        this.items = [
            {
                xtype: 'panel',
                layout:'column',
                border: false,
                autoWidth: true,
                defaults: {
                  border: false
                },
                items: [
                    {
                    	columnWidth: 1/2,
                    	border: false,
                    	bodyStyle: 'padding:5px;',
                    	items: [
                	        {
                	        	xtype: 'form',
                	        	border: false,
                	        	defaults: {
	                	        	labelWidth: 130,
	                	        	anchor:'100%',
                	        	},
                	        	items: [
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'name',
            	        	        	fieldLabel: 'Name',
            	        	        },
            	        	        {
            	        	        	xtype: 'datefield',
            	        	        	name : 'profildatum',
            	        	        	fieldLabel: 'Profildatum',
            	        	        	format: "d.m.Y",
            	        	        },
            	        	        {
            	        	        	xtype: 'timefield',
            	        	        	name : 'zeit',
            	        	        	fieldLabel: 'Zeit',
            	        	        	minValue: Ext.Date.parse('04:30:00 AM', 'h:i:s A'),
            	        	            maxValue: Ext.Date.parse('08:00:00 PM', 'h:i:s A'),
            	        	            format: "H:i",
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
									    emptyText: 'Bitte wählen Sie...'
            	        	        },
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'hoehe',
            	        	        	fieldLabel: 'H&ouml;he (in m)',
            	        	        },
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'profilort',
            	        	        	fieldLabel: 'Profilort',
            	        	        },
            	        	        {
                    	        		xtype: 'textfield',
                    	        		name : 'utmKoordinaten',
                    	        		fieldLabel: 'UTM-Koordinaten'
                    	        	},
                    	        	{
                    	        		xtype: 'textfield',
                    	        		name : 'hangneigung',
                    	        		fieldLabel: 'Hangneigung'
                    	        	},
                    	        	{
                    	        		xtype: 'checkboxfield',
                    	        		name: 'hangneigungCheck',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'flach',
                    	        	}
                	        	]
                	        }
                    	]
	                },
	                {
	                    columnWidth: 1/2,
	                    border: false,
	                    bodyStyle: 'padding:5px;',
	                    items: [
                            {
                            	xtype: 'form',
                            	border: false,
                            	defaults: {
	                	        	labelWidth: 130,
	                	        	anchor:'100%',
                	        	},
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
									    emptyText: 'Bitte wählen Sie...'
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
            	                        emptyText: 'Bitte wählen Sie...'
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
            	        	        	emptyText: 'Bitte wählen Sie...'
            	        	        },
                    	        	{
                    	        		xtype: 'textfield',
                    	        		name : 'lufttemperatur',
                    	        		fieldLabel: 'Lufttemperatur'
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
            	        	        	emptyText: 'Bitte wählen Sie...'
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
            	        	        	emptyText: 'Bitte wählen Sie...'
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
            	        	        	emptyText: 'Bitte wählen Sie...'
            	        	        },
                    	        	{
                    	        		xtype: 'textareafield',
                    	        		name: 'sonstiges',
                    	        		fieldLabel: 'Sonstiges',
                    	        		value: ''
                    	        	}
                            	]
                            }
	                    ]
	                }
                ]
            }
        ];
        
        this.callParent(arguments);
    },

	refresh: function(store) {
    	var view = Ext.widget('kopf');
    	view.down('form').loadRecord(Ext.pluck(store.data.items, 'data'));
    }
});