Ext.define('LWD.view.snowprofile.SearchField', {
	extend: 'Ext.form.Panel',
	alias: 'widget.searchfield',
	
    bodyPadding: '5 5 0',
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 120
    },
    layout: 'hbox',
    anchor: '100%',
    
    border: false,
	
	initComponent: function() {
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{ 
            	xtype: 'button', 
            	text: 'Suchen',
            	handler: function() {
            		var panel = this.up('form');
                    var form = panel.getForm();
                    var store = Ext.data.StoreManager.lookup("SnowprofilePreview");
                    if (form.isValid()) {
                    	values = form.getValues();
                    	if(!values.region)
                    		values.region = "";
                    	if(!values.zeit)
                    		values.zeit = "";
                    	data = {
                    		name: ""+values.name,
                    		profildatum: ""+values.profildatum,
                    		profilort: ""+values.profilort, 
                    		utmKoordinaten: ""+values.utmKoordinaten,
                    		zeit: ""+values.zeit,
                    		region: ""+values.region
                    	};
                    	showLoadingMask("Suchen...");
                    	Ext.Ajax.request({
                			method: 'POST',
                			jsonData: data,
                			url: '/lwd/search',
                			success: function(returnObject) {
                				var obj = Ext.decode(returnObject.responseText);
                				store.removeAll();
                				store.loadRawData(obj);
                			},
                			failure: function() {
                				alert("Suche konnte nicht durchgeführt werden!");
                			}
                		});
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
        	        	emptyText: ''
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
					    anchor:'95%'
        	        }
	        	]
          	},{
          		xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
	    	        	xtype: 'datefield',
	    	        	name : 'profildatum',
	    	        	fieldLabel: 'Profildatum',
	    	        	format: "d.m.Y",
	    	        	anchor:'95%'
	    	        },{
        	        	xtype: 'textfield',
        	        	name : 'profilort',
        	        	fieldLabel: 'Profilort',
        	        	anchor:'95%'
        	        }
                ]
          	},{
          		xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
	    	        	xtype: 'timefield',
	    	        	name : 'zeit',
	    	        	fieldLabel: 'Zeit',
	    	        	minValue: Ext.Date.parse('04:30:00 AM', 'h:i:s A'),
	    	            maxValue: Ext.Date.parse('08:00:00 PM', 'h:i:s A'),
	    	            format: "H:i",
	    	            anchor:'95%'
	    	        },{
    	        		xtype: 'textfield',
    	        		name : 'utmKoordinaten',
    	        		fieldLabel: 'Koordinaten',
    	        		anchor:'95%'
    	        	}
                ]
          	}
        ];

        this.callParent(arguments);
    }
});