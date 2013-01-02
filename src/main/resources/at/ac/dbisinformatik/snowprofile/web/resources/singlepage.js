Ext.application({
    name: 'LWD',

    appFolder: 'app',

	controllers : [ 'Snowprofile' ],

	launch : function() {
		Ext.create('Ext.Viewport', {
			layout : 'border',
			id : 'mainview',
			defaults : {
				title : false
			}
		});
		
		Ext.History.init(function() {
			var token = Ext.History.getToken();
			this.historyChange(token);
		}, this);
		Ext.util.History.on('change', this.historyChange, this);
	},

	historyChange : function(token) {
		var comp = Ext.getCmp("mainview");
		for(i=comp.items.length - 1; i>=0; i--) {
			temp = comp.items.get(i);
			comp.remove(temp);
		}
		if (token) {
        	var nvPair = getLocationHash();
        	var action = nvPair[0][1];
        	if(nvPair[1] != null) {
        		var id = nvPair[1][1];
        		id = id+".json";
        	}
	        switch(action) {
	        case "create":
	        	Ext.data.StoreManager.lookup('Snowprofile').removeAll(); 
	        	Ext.data.StoreManager.lookup('Snowtemperature').removeAll();
	        	Ext.data.StoreManager.lookup('Schichtprofil').removeAll();
	        	Ext.data.StoreManager.lookup('Metadata').removeAll();
	        	Ext.data.StoreManager.lookup('Stabilitytest').removeAll();
        		break;
	        case "edit":
	        	var store = this.getController('Snowprofile').getSnowprofileStore();
	    		store.removeAll();
	        	var storeModel = Ext.ModelManager.getModel('LWD.model.Snowprofile');
	        	storeModel.load(id, {
	        		success: function(snowprofile) {
	        			store.add(snowprofile);
	        		}
	        	});
	        	break;
	        }
	        
            comp.insert(0, {
        	    region: 'north',
        	    items: [
    	            {
    	            	xtype: 'menuleiste',
    	            	border: false
    	            }
        	    ]
        	});
            comp.insert(1, {
        	    region:'west',
        	    width: 650,
        	    border: false,
        	    items: [
            	    {
                		autoScroll: true,
                		items: [
            		        {
            		        	xtype: 'metadata',
            		        	border: false
            		        }
                		]
    	            },
    	            {
    	            	xtype: 'panel',
    	            	layout: 'fit',
    	            	autoScroll: true,
    	            	border: false,
                    	items: [
                	        {
                	        	xtype: 'tabpanel',
                	        	activeTab: 0,
                	        	border: false,
                	        	items: [
            	        	        {
            	        	        	title: 'Schichtprofil',
            	        	        	border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'schichtprofil',
        	        	        	        	height: 300,
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        },
            	        	        {
            	        	        	title: 'Schneetemperatur',
        	        	        		border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'snowtemperature',
        	        	        	        	height: 300,
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        },
            	        	        {
            	        	        	title: 'Stabilitätstests',
            	        	        	border: false,
            	        	        	items: [
        	        	        	        {
        	        	        	        	xtype: 'stabilitytest',
        	        	        	        	height: 300,
        	        	        	        	autoScroll: true,
        	        	        	        	border: false
        	        	        	        }
        	        	        	    ]
            	        	        }
                	        	]
                	        }
                    	]
    	            }
        	    ]
        	});
            comp.insert(2, {
        	    region:'center',
        	    items: [{
	            	xtype: 'graph',
                	layout: 'fit',
                	height: "100%",
                	autoScroll: true,
                	border: false
    	        }]
        	});
		} else {
			comp.insert(0, {
				region:'north',
				items: [{
					xtype: 'searchfield',
					border: false
				}]
			});
			comp.insert(1, {
				region:'center',
				items: [{
					xtype: 'snowprofilepreview'
				}]
			});
		}
	}
});