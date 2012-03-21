Ext.require([
    'Ext.form.*',
    'Ext.data.*'
]);

Ext.define('LWD.view.schneeprofil.kopf', {
	extend: 'Ext.form.Panel',
	alias: 'widget.kopf',
	
	initComponent: function() {
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
	                	        	anchor:'100%'
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
            	        	        	fieldLabel: 'Profildatum'
            	        	        },
            	        	        {
            	        	        	xtype: 'timefield',
            	        	        	name : 'zeit',
            	        	        	fieldLabel: 'Zeit',
            	        	        	minValue: '1:30 AM',
            	        	            maxValue: '9:15 PM'
            	        	        },
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'region',
            	        	        	fieldLabel: 'Region'
            	        	        },
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'hoehe',
            	        	        	fieldLabel: 'H&ouml;he'
            	        	        },
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'profilort',
            	        	        	fieldLabel: 'Profilort'
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
                    	        		boxLabel: 'flach'
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
	                	        	anchor:'100%'
                	        	},
                            	items: [
									{
										xtype: 'combobox',
									    fieldLabel: 'Exposition',
									    name: 'exposition',
									    store: Ext.create('Ext.data.ArrayStore', {
									        fields: ['val'],
									        data : exposition // from states.js
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
            	                            data : windgeschwindigkeit // from states.js
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
            	        	        		data : windrichtung // from states.js
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
            	        	        		data : niederschlag // from states.js
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
    }
});