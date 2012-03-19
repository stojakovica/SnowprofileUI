Ext.define('LWD.view.schneeprofileingabe.eingabeform', {
	extend: 'Ext.form.Panel',
	alias: 'widget.eingabeform',
	
	initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                layout:'column',
                border: false,
                bodyStyle: 'padding:5px; border:none',
                items: [
                    {
                    	columnWidth: 1/2,
                    	border: false,
                    	items: [
                	        {
                	        	xtype: 'form',
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
            	        	        	xtype: 'radiofield',
            	        	        	name: 'exposition',
            	        	        	value: 'n',
            	        	        	fieldLabel: 'Exposition',
            	        	        	boxLabel: 'N'
            	        	        },
            	        	        {
            	        	        	xtype: 'radiofield',
            	        	        	name: 'exposition',
            	        	        	value: 'ne',
            	        	        	fieldLabel: '',
            	        	        	labelSeparator: '',
            	        	        	hideEmptyLabel: false,
            	        	        	boxLabel: 'NE'
            	        	        },
            	        	        {
            	        	        	xtype: 'radiofield',
            	        	        	name: 'exposition',
            	        	        	value: 'e',
            	        	        	fieldLabel: '',
            	        	        	labelSeparator: '',
            	        	        	hideEmptyLabel: false,
            	        	        	boxLabel: 'E'
            	        	        },
            	        	        {
            	        	        	xtype: 'radiofield',
            	        	        	name: 'exposition',
            	        	        	value: 'se',
            	        	        	fieldLabel: '',
            	        	        	labelSeparator: '',
            	        	        	hideEmptyLabel: false,
            	        	        	boxLabel: 'SE'
            	        	        },
            	        	        {
            	        	        	xtype: 'radiofield',
            	        	        	name: 'exposition',
            	        	        	value: 's',
            	        	        	fieldLabel: '',
            	        	        	labelSeparator: '',
            	        	        	hideEmptyLabel: false,
            	        	        	boxLabel: 'SW'
            	        	        },
            	        	        {
            	        	        	xtype: 'radiofield',
            	        	        	name: 'exposition',
            	        	        	value: 'w',
            	        	        	fieldLabel: '',
            	        	        	labelSeparator: '',
            	        	        	hideEmptyLabel: false,
            	        	        	boxLabel: 'W'
            	        	        },
            	        	        {
            	        	        	xtype: 'radiofield',
            	        	        	name: 'exposition',
            	        	        	value: 'nw',
            	        	        	fieldLabel: '',
            	        	        	labelSeparator: '',
            	        	        	hideEmptyLabel: false,
            	        	        	boxLabel: 'NW'
            	        	        },
            	        	        {
            	        	        	xtype: 'combobox',
            	        	        	fieldLabel: 'Select a single state',
            	        	        	name: 'exposition',
            	        	        	displayField: 'name',
            	        	        },
                	        	]
                	        }
                    	]
	                },
	                {
	                    columnWidth: 1/2,
	                    border: false,
	                    items: [
                            {
                            	xtype: 'form',
                            	items: [
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
                    	        		name: 'hangneigungRadio',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'flach'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windgeschwindigkeit',
                    	        		value: 'keinWind',
                    	        		fieldLabel: 'Windgeschwindigkeit',
                    	        		boxLabel: 'kein Wind (0 km/h)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windgeschwindigkeit',
                    	        		value: 'schwacherWind',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'schwacher Wind (1-20 km/h)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windgeschwindigkeit',
                    	        		value: 'maessigerWind',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'm&auml;&szlig;iger Wind (20-40 km/h)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windgeschwindigkeit',
                    	        		value: 'starkerWind',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'starker Wind (40-60 km/h)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windgeschwindigkeit',
                    	        		value: 'stuermischerWind',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'st&uuml;rmischer Wind (60-100 km/h)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windgeschwindigkeit',
                    	        		value: 'schwererWind',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'schwerer Wind/Orkan (>100 km/h)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windrichtung',
                    	        		value: 'n',
                    	        		fieldLabel: 'Windrichtung',
                    	        		boxLabel: 'N'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windrichtung',
                    	        		value: 'ne',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'NE'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windrichtung',
                    	        		value: 'e',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'E'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windrichtung',
                    	        		value: 'se',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'SE'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windrichtung',
                    	        		value: 's',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'SW'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windrichtung',
                    	        		value: 'w',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'W'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'windrichtung',
                    	        		value: 'nw',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'NW'
                    	        	},
                    	        	{
                    	        		xtype: 'textfield',
                    	        		name : 'lufttemperatur',
                    	        		fieldLabel: 'Lufttemperatur'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'niederschlag',
                    	        		value: 'keinNS',
                    	        		fieldLabel: 'Niederschlag',
                    	        		boxLabel: 'kein NS'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'niederschlag',
                    	        		value: 'schnee',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'Schnee'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'niederschlag',
                    	        		value: 'graupel',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'Graupel'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'niederschlag',
                    	        		value: 'regen',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'Regen'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'intensitaetDesNS',
                    	        		value: 'schwach',
                    	        		fieldLabel: 'Intensit&auml;t des Niederschlags',
                    	        		boxLabel: 'schwach'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'intensitaetDesNS',
                    	        		value: 'mittel',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'Mittel'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'intensitaetDesNS',
                    	        		value: 'stark',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'Stark'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'bewoelkung',
                    	        		value: 'wolkenlos',
                    	        		fieldLabel: 'Bew&ouml;lkung',
                    	        		boxLabel: 'wolkenlos (0/8)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'bewoelkung',
                    	        		value: 'leichtBewoelkt',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'leicht bew&ouml;lkt (1/8 - 2/8)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'bewoelkung',
                    	        		value: 'bewoelkt',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'bew&ouml;lkt (3/8 - 4-8)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'bewoelkung',
                    	        		value: 'starkBewoelkt',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'stark bew&ouml;lkt (5/8 - 7/8)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'bewoelkung',
                    	        		value: 'bedeckt',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'bedeckt (8/8)'
                    	        	},
                    	        	{
                    	        		xtype: 'radiofield',
                    	        		name: 'bewoelkung',
                    	        		value: 'nebel',
                    	        		fieldLabel: '',
                    	        		labelSeparator: '',
                    	        		hideEmptyLabel: false,
                    	        		boxLabel: 'Nebel'
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