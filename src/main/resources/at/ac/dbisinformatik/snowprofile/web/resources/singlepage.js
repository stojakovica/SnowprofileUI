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
		var store = this.getController('Snowprofile').getSnowprofileStore();
//		store.reload();
		store.removeAll();
		
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
        		var snowProfileTemplateJson = { "SnowProfile" : { "id" : "",
			        	      "locRef" : { "ObsPoint" : { "id" : "",
			                "description" : "",
			                "name" : "",
			                "obsPointSubType" : "",
			                "validAspect" : { "AspectPosition" : { "position" : "" } },
			                "validElevation" : { "ElevationPosition" : { "position" : "",
			                        "uom" : ""
			                      } },
			                "validSlopeAngle" : { "SlopeAnglePosition" : { "position" : "",
			                        "uom" : ""
			                      } },
		                    "pointLocation" : { "gml_Point" : { "gml_pos" : "",
		                    	  "gml_id" : "",
		                    	  "srsName" : "",
		                    	  "srsDimension" : ""
		                      } }
			              } },
			        "metaDataProperty" : { "MetaData" : { "dateTimeReport" : "",
			                "srcRef" : { "Operation" : { "contactPerson" : { "Person" : { "id" : "",
			                                "name" : ""
			                              } },
			                        "id" : "",
			                        "name" : {  }
			                      } }
			              } },
			        "snowProfileResultsOf" : { "SnowProfileMeasurements" : { "airTempPres" : { "content" : "",
			                    "uom" : "degC"
			                  },
			                "comment" : "",
			                "densityProfile" : { "uomDensity" : "kgm-3",
			                    "uomDepthTop" : "cm",
			                    "uomThickness" : "cm"
			                  },
			                "dir" : "bottom up",
			                "hS" : { "Components" : { "snowHeight" : { "content" : "",
			                            "uom" : "cm"
			                          } } },
			                "hardnessProfile" : { "uomDepthTop" : "cm",
			                    "uomDropHeight" : "cm",
			                    "uomHardness" : "N",
			                    "uomThickness" : "cm",
			                    "uomWeightHammer" : "kg",
			                    "uomWeightTube" : "kg"
			                  },
			                "precipTI" : "",
			                "profileDepth" : { "content" : "",
			                    "uom" : "cm"
			                  },
			                "skyCond" : "",
			                "stbTests" : { "ComprTest" : [],
			                	"ExtColumnTest" : [] ,
			                    "RBlockTest" : []
			                  },
			                "stratProfile" : { "Layer" : [] },
			                "tempProfile" : { "Obs" : [],
			                    "uomDepth" : "cm",
			                    "uomTemp" : "degC"
			                  },
			                "windDir" : { "AspectPosition" : { "position" : "" } },
			                "windSpd" : { "content" : "",
			                    "uom" : "ms-1"
			                  }
			              } },
			        "validTime" : { "TimeInstant" : { "timePosition" : "" } },
			        "online" : "",
			        "xmlns_app" : "http://www.snowprofileapplication.com",
			        "xmlns_caaml" : "http://www.caaml.org/v5.0/Snowprofile/IACS",
			        "xmlns_gml" : "http://www.opengis.net/gml",
			        "xmlns_xsi" : "http://www.w3.org/2001/XMLSchema-instance",
			        "xsi_schemaLocation" : "http://caaml.org/Schemas/V5.0/Profiles/SnowProfileIACS  http://caaml.avisualanche.ca/Schemas/V5.0/Profiles/SnowprofileIACS/CAAMLv5_SnowProfileIACS.xsd"
			      } }
        		store.loadRawData(snowProfileTemplateJson);
        		break;
	        case "edit":
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
			var store = this.getController('Snowprofile').getSnowprofilePreviewStore();
			store.reload();
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