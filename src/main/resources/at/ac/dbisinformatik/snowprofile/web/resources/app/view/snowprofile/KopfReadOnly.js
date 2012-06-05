Ext.require([
    'Ext.form.*',
    'Ext.data.*'
]);

Ext.define('LWD.view.snowprofile.kopfreadonly', {
	extend: 'Ext.form.Panel',
	alias: 'widget.kopfreadonly',
	
	initComponent: function() {
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
	                	        	disabled: disabled,
                	        	},
                	        	items: [
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'name',
            	        	        	fieldLabel: 'Name',
            	        	        	value: 'Adi Keber, Stefan Köpfle'
            	        	        },
            	        	        {
            	        	        	xtype: 'datefield',
            	        	        	name : 'profildatum',
            	        	        	fieldLabel: 'Profildatum',
            	        	        	format: "d.m.Y",
            	        	        	value: date
            	        	        },
            	        	        {
            	        	        	xtype: 'timefield',
            	        	        	name : 'zeit',
            	        	        	fieldLabel: 'Zeit',
            	        	        	minValue: Ext.Date.parse('04:30:00 AM', 'h:i:s A'),
            	        	            maxValue: Ext.Date.parse('08:00:00 PM', 'h:i:s A'),
            	        	            format: "H:i",
            	        	            value: date
            	        	        },
            	        	        {
            	        	        	xtype: 'combobox',
									    fieldLabel: 'Exposition',
									    name: 'exposition',
									    store: Ext.create('Ext.data.ArrayStore', {
									        fields: ['key', 'val'],
									        data : regionen 
									    }),
									    valueField: 'key',
									    displayField: 'val',
									    value: 'R1',
									    typeAhead: true,
									    queryMode: 'local',
									    emptyText: 'Bitte wählen Sie...'
            	        	        },
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'hoehe',
            	        	        	fieldLabel: 'H&ouml;he (in m)',
            	        	        	value: '2180'
            	        	        },
            	        	        {
            	        	        	xtype: 'textfield',
            	        	        	name : 'profilort',
            	        	        	fieldLabel: 'Profilort',
            	        	        	value: 'Hahnleskopf Kaisers'
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
                    	        		checked: true
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
	                	        	disabled: disabled
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
									    value: 'N',
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
            	                        value: '20_40',
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
            	        	        	value: 'N',
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
            	        	        	value: 'graupel',
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
            	        	        	value: 'mittel',
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
            	        	        	value: 'starkBewoelkt',
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