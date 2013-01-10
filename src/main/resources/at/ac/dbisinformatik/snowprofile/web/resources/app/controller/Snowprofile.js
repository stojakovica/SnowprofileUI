Ext.define('LWD.controller.Snowprofile', {
    extend: 'Ext.app.Controller',
	stores: [
        'Snowtemperature',
	    'Schichtprofil',
	    'Metadata',
	    'Snowprofile',
	    'SnowprofilePreview',
	    'Stabilitytest'
	],
	models: [
        'Snowprofile',
        'snowprofile.airTempPres',
        'snowprofile.AspectPosition',
        'snowprofile.Components',
        'snowprofile.ComprTest',
        'snowprofile.contactPerson',
        'snowprofile.contentUomModel',
        'snowprofile.densityLayer',
        'snowprofile.densityMeasurement',
        'snowprofile.densityProfile',
        'snowprofile.depthTop',
        'snowprofile.ElevationPosition',
        'snowprofile.ExtColumnTest',
        'snowprofile.grainSize',
        'snowprofile.hardnessLayer',
        'snowprofile.hardnessProfile',
        'snowprofile.hIN',
        'snowprofile.hN24',
        'snowprofile.hS',
        'snowprofile.impurityMeasurement',
        'snowprofile.locRef',
        'snowprofile.lwcProfile',
        'snowprofile.MeasurementComponents',
        'snowprofile.Measurements',
        'snowprofile.MetaData',
        'snowprofile.MetaDataMetaProperty',
        'snowprofile.metaDataProperty',
        'snowprofile.microPenResProfile',
        'snowprofile.Obs',
        'snowprofile.ObsPoint',
        'snowprofile.Operation',
        'snowprofile.Person',
        'snowprofile.Point',
        'snowprofile.pointLocation',
        'snowprofile.profileDepth',
        'snowprofile.ProfMetaData',
        'snowprofile.RBlockTest',
        'snowprofile.SlopeAnglePosition',
        'snowprofile.SnowProfileMeasurements',
        'snowprofile.snowProfileResultsOf',
        'snowprofile.specSurfAreaProfile',
        'snowprofile.srcRef',
        'snowprofile.stbTests',
        'snowprofile.stratLayer',
        'snowprofile.stratProfile',
        'snowprofile.tempProfile',
        'snowprofile.ThinknessPosition',
        'snowprofile.TimeInstant',
        'snowprofile.TimePeriod',
        'snowprofile.validAspect',
        'snowprofile.validDepositionTime',
        'snowprofile.validElevation',
        'snowprofile.validSlopeAngle',
        'snowprofile.validThickness',
        'snowprofile.validTime',
        'snowprofile.windDir',
        'snowprofile.windSpd'
	],
	
	views: [
        'snowprofile.Metadata',
        'snowprofile.schichtprofil',
        'snowprofile.snowtemperature',
        'snowprofile.stabilitytest',
        'snowprofile.snowprofilePreview',
        'snowprofile.SearchField',
        'graph.Graph',
        'menuleiste.Menu',
        'snowprofile.import'
    ],

    init: function() {
        this.control({
	    	'toolbar #saveData': {
				click: this.saveData
			},
			'toolbar #printPDF': {
				click: this.printPDF
			},
			'toolbar #printPNG': {
				click: this.printPNG
			},
			'toolbar #exportXML': {
				click: this.exportXML
			},
			'toolbar #importXML': {
				click: this.importXML
			}
		});
        
        this.getSnowprofileStore().on('load', this.initiateStore, this);
        
        this.getSnowprofileStore().on('datachanged', this.initiateStore, this);
        
        this.getSchichtprofilStore().on('dataupdate', function(schichtprofileStore, eOpts) {
        	var snowProfileStore = this.getSnowprofileStore();
        	snowProfileStore.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			snowProfileMeassurements.getStratProfile(function(originalStratProfiles) {
        				var schichtprofileStore = this.getSchichtprofilStore();
        				var layerStore = originalStratProfiles.LayerStore;
        				layerStore.removeAll();
        				layerStore.add(schichtprofileStore.data.items);
        				snowProfileStore.fireEvent("datachanged", snowProfileStore);
        			}, this);
        		}, this);
        	}, this);
        	this.saveData();
        }, this);
        this.getSnowtemperatureStore().on('dataupdate', function(snowtemperatureStore, eOpts) {
        	var snowProfileStore = this.getSnowprofileStore();
        	snowProfileStore.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			snowProfileMeassurements.getTempProfile(function(originalTempProfile) {
        				var snowtemperatureStore = this.getSnowtemperatureStore();
        				var obsStore = originalTempProfile.ObsStore;
        				var stArray = new Array();
        				for(var i=0; i<snowtemperatureStore.data.items.length; i++) {
        					var temp = {
    							"depth": ""+snowtemperatureStore.getAt(i).data.depth,
        						"snowTemp": ""+snowtemperatureStore.getAt(i).data.snowTemp
        					};
        					stArray.push(temp);
        				}
        				obsStore.removeAll();
        				obsStore.add(stArray);
        				snowProfileStore.fireEvent("datachanged", snowProfileStore);
        			}, this);
        		}, this);
        	}, this);
        	this.saveData();
        }, this);
        this.getMetadataStore().on('dataupdate', function() {
        	var nvPair = getLocationHash();
        	var action = nvPair[0][1];
        	
        	var metaDataStore = this.getMetadataStore();
			var metaData = metaDataStore.getAt(0).data;
			var datum = metaData.profildatum.split(".");
			var zeit = metaData.zeit.split(":");
        	
        	switch(action) {
        	case "create":
        		if(Ext.isObject(this.getSnowprofileStore())) {
        			if(metaData.direction == "on")
        				var direction = "top down";
        			else
        				var direction = "bottom up";
	        		var snowProfileStore = this.getSnowprofileStore();
	        		var snowProfileTemplateJson = { "SnowProfile" : { "id" : "",
				        	      "locRef" : { "ObsPoint" : { "id" : "",
				                "description" : metaData.region,
				                "name" : metaData.profilort,
				                "obsPointSubType" : "",
				                "validAspect" : { "AspectPosition" : { "position" : metaData.exposition } },
				                "validElevation" : { "ElevationPosition" : { "position" : "",
				                        "uom" : ""
				                      } },
				                "validSlopeAngle" : { "SlopeAnglePosition" : { "position" : metaData.hangneigung,
				                        "uom" : ""
				                      } },
			                    "pointLocation" : { "gml_Point" : { "gml_pos" : metaData.utmKoordinaten,
			                    	  "gml_id" : "",
			                    	  "srsName" : "",
			                    	  "srsDimension" : ""
			                      } }
				              } },
				        "metaDataProperty" : { "MetaData" : { "dateTimeReport" : "",
				                "srcRef" : { "Operation" : { "contactPerson" : { "Person" : { "id" : "",
				                                "name" : metaData.name
				                              } },
				                        "id" : "",
				                        "name" : {  }
				                      } }
				              } },
				        "snowProfileResultsOf" : { "SnowProfileMeasurements" : { "airTempPres" : { "content" : metaData.lufttemperatur,
				                    "uom" : "degC"
				                  },
				                "comment" : metaData.sonstiges,
				                "densityProfile" : { "uomDensity" : "kgm-3",
				                    "uomDepthTop" : "cm",
				                    "uomThickness" : "cm"
				                  },
				                "dir" : direction,
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
				                "precipTI" : metaData.niederschlag,
				                "profileDepth" : { "content" : metaData.hoehe,
				                    "uom" : "cm"
				                  },
				                "skyCond" : metaData.bewoelkung,
				                "stbTests" : { "ComprTest" : [],
				                	"ExtColumnTest" : [] ,
				                    "RBlockTest" : []
				                  },
				                "stratProfile" : { "Layer" : [] },
				                "tempProfile" : { "Obs" : [],
				                    "uomDepth" : "cm",
				                    "uomTemp" : "degC"
				                  },
				                "windDir" : { "AspectPosition" : { "position" : metaData.windrichtung } },
				                "windSpd" : { "content" : metaData.windgeschwindigkeit,
				                    "uom" : "ms-1"
				                  }
				              } },
				        "validTime" : { "TimeInstant" : { "timePosition" : datum[2]+"-"+datum[1]+"-"+datum[0]+"T"+zeit[0]+":"+zeit[1]+":00" } },
				        "online" : "",
				        "xmlns_app" : "http://www.snowprofileapplication.com",
				        "xmlns_caaml" : "http://www.caaml.org/v5.0/Snowprofile/IACS",
				        "xmlns_gml" : "http://www.opengis.net/gml",
				        "xmlns_xsi" : "http://www.w3.org/2001/XMLSchema-instance",
				        "xsi_schemaLocation" : "http://caaml.org/Schemas/V5.0/Profiles/SnowProfileIACS  http://caaml.avisualanche.ca/Schemas/V5.0/Profiles/SnowprofileIACS/CAAMLv5_SnowProfileIACS.xsd"
				      } };
//	        		snowProfileStore.getProxy().getReader().read(snowProfileTemplateJson);
//	        		snowProfileStore.load();
	        		snowProfileStore.loadRawData(snowProfileTemplateJson);
	        	}
        		break;
        	case "edit": 
        		if(Ext.isObject(this.getSnowprofileStore())) {
        			var snowProfileStore = this.getSnowprofileStore();
        			
        			if(metaData.direction == "on")
        				snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.dir = "top down";
        			else
        				snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.dir = "bottom up";
        			snowProfileStore.getAt(0).data.online = metaData.onlineCheck;
        			snowProfileStore.getAt(0).getMetaDataProperty().getMetaData().getSrcRef().getOperation().getContactPerson().getPerson().data.name = metaData.name;
        			snowProfileStore.getAt(0).getValidTime().getTimeInstant().data.timePosition = datum[2]+"-"+datum[1]+"-"+datum[0]+"T"+zeit[0]+":"+zeit[1]+":00";
        			snowProfileStore.getAt(0).getLocRefData().getObsPoint().data.description = metaData.region;
        			snowProfileStore.getAt(0).getLocRefData().getObsPoint().data.name = metaData.profilort;
        			snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getProfileDepth().data.content = metaData.hoehe;
        			snowProfileStore.getAt(0).getLocRefData().getObsPoint().getPointLocation().getPoint().data.gml_pos = metaData.utmKoordinaten;
        			snowProfileStore.getAt(0).getLocRefData().getObsPoint().getValidSlopeAngle().getSlopeAnglePosition().data.position = metaData.hangneigung;
        			snowProfileStore.getAt(0).getLocRefData().getObsPoint().getValidAspect().getAspectPosition().data.position = metaData.exposition;
        			snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getWindSpd().data.content = metaData.windgeschwindigkeit;
        			snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getWindDir().getAspectPosition().data.position = metaData.windrichtung;
        			snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getAirTempPres().data.content = metaData.lufttemperatur;
        			snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.precipTI = metaData.niederschlag;
        			snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.skyCond = metaData.bewoelkung;
        			snowProfileStore.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.comment = metaData.sonstiges;
        			snowProfileStore.fireEvent("datachanged", snowProfileStore);
        		}
        		break;
        	}
        	this.saveData();
        }, this);
        this.getStabilitytestStore().on('dataupdate', function(stabilitytestStore, eOpts) {
        	var snowProfileStore = this.getSnowprofileStore();
        	snowProfileStore.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			snowProfileMeassurements.getStbTests(function(originalStbTests) {
        				var stabilitytestStore = this.getStabilitytestStore();
        				var comprTestArray = new Array();
        				var extColumnTestArray = new Array();
        				var rBlockArray = new Array();
        				for(var i=0; i<stabilitytestStore.data.items.length; i++) {
        					var temp = {
    							"Layer_depthTop_content": ""+stabilitytestStore.getAt(i).data.depth,
        						"Layer_depthTop_uom": "cm",
    							"failedOn_Results_fractureCharacter": stabilitytestStore.getAt(i).data.bruchflaeche,
    							"failedOn_Results_releaseType": stabilitytestStore.getAt(i).data.bruchart,
    							"failedOn_Results_testScore": stabilitytestStore.getAt(i).data.belastungsstufe
        					};
        					switch(stabilitytestStore.getAt(i).data.test) {
        						case "CT":
        								comprTestArray.push(temp);
        							break;
        						case "ECT":
        								extColumnTestArray.push(temp);
        							break;
        						case "RB":
        								rBlockArray.push(temp);
        							break;
        					}
        				}
        				comprTestStore = originalStbTests.ComprTestStore;
        				extColumnTestStore = originalStbTests.ExtColumnTestStore;
        				rBlockStore = originalStbTests.RBlockTestStore;
        				
        				comprTestStore.removeAll();
        				extColumnTestStore.removeAll();
        				rBlockStore.removeAll();
        				
        				comprTestStore.add(comprTestArray);
        				extColumnTestStore.add(extColumnTestArray);
        				rBlockStore.add(rBlockArray);
        				snowProfileStore.fireEvent("datachanged", snowProfileStore);
        			}, this);
        		}, this);
        	}, this);
        	this.saveData();
        }, this);
        
        console.log('Snowprofile loaded!');
    },
    
    saveData: function(item) {
    	var store = Ext.data.StoreManager.lookup('Snowprofile');
    	var data = {};
    	var snowprofile = store.getAt(0);
    	Ext.apply(data, snowprofile.getData(true));
    	switch(getLocationHash()[0][1]) {
    		case "create":
    			Ext.Ajax.request({
    				url: '/lwd/snowprofile',
    				success: function(returnObject) {
    					var newToken = "action=edit#id="+returnObject.responseText;
    		            Ext.History.add(newToken);
    				},
    				failure: function() { 
    					alert("Speichern konnte nicht durchgeführt werden!");
    				},
    				jsonData: data
    			});
    			break;
    		case "edit":
    			Ext.Ajax.request({
    				method: 'PUT',
    				url: '/lwd/snowprofile/'+store.getAt(0).data.rid.substring(1),
    				success: function(returnObject) {
    				},
    				failure: function() { 
    					alert("Speichern konnte nicht durchgeführt werden!");
    				},
    				jsonData: data
    			});
    			break;
    	}
    },
    
    printPDF: function() {
    	window.open("/lwd/snowprofile/"+getLocationHash()[1][1]+".pdf");
    },
    
    printPNG: function() {
    	window.open("/lwd/snowprofile/"+getLocationHash()[1][1]+".png");
    },
    
    exportXML: function() {
    	window.open('/lwd/snowprofile/'+getLocationHash()[1][1]+'.xml');
    },
    
    importXML: function() {
    	var view = Ext.widget('import');
    },
    
    initiateStore: function(store, records, success, operations) {
    	if(Ext.isObject(store.getAt(0))) {
        	store.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		var metaDataStore = this.getMetadataStore();
        		var datumZeit = store.getAt(0).getValidTime().getTimeInstant().data.timePosition.split("T");
        		var datum = "";
        		if(datumZeit[1] != null)
        			datum = datumZeit[1].substring(0, 5);
        		var metadata = {
        				"name": checkObject(store.getAt(0).getMetaDataProperty().getMetaData().getSrcRef().getOperation().getContactPerson().getPerson().data.name),
        				"profildatum": datumZeit[0],
        				"zeit": datum,
        				"region": checkObject(store.getAt(0).getLocRefData().getObsPoint().data.description),
        				"hoehe": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getProfileDepth().data.content),
        				"profilort": checkObject(store.getAt(0).getLocRefData().getObsPoint().data.name),
        				"utmKoordinaten": checkObject(store.getAt(0).getLocRefData().getObsPoint().getPointLocation().getPoint().data.gml_pos),
        				"hangneigung": checkObject(store.getAt(0).getLocRefData().getObsPoint().getValidSlopeAngle().getSlopeAnglePosition().data.position),
        				"exposition": checkObject(store.getAt(0).getLocRefData().getObsPoint().getValidAspect().getAspectPosition().data.position),
        				"windgeschwindigkeit": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getWindSpd().data.content),
        				"windrichtung": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getWindDir().getAspectPosition().data.position),
        				"lufttemperatur": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getAirTempPres().data.content),
        				"niederschlag": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.precipTI),
        				"intensitaetDesNS": "", // TODO: regeln, kann mit Information von Matthias nichts anfangen
        				"bewoelkung": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.skyCond),
        				"sonstiges": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.comment),
        				"onlineCheck": checkObject(store.getAt(0).data.online),
        				"direction": checkDir(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.dir)
        		};
        		
        		metaDataStore.loadRawData(metadata);
        		if(Ext.isObject(Ext.getCmp("metadata")))
        			Ext.getCmp("metadata").getForm().setValues(metaDataStore.getAt(0).data);
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			snowProfileMeassurements.getStratProfile(function(originalStratProfile) {
        				var schichtProfileStore = this.getSchichtprofilStore();
        				schichtProfileStore.getProxy().clear();
        				schichtProfileStore.removeAll();
        				schichtProfileStore.loadRawData(originalStratProfile.getAssociatedData());
        			}, this);
        			snowProfileMeassurements.getTempProfile(function(originalTempProfile) {
    					for(var i=0; i<originalTempProfile.ObsStore.data.items.length; i++) {
    						if(originalTempProfile.ObsStore.data.items[i].data.snowTemp < 0) {
    							originalTempProfile.ObsStore.data.items[i].data.snowTemp = originalTempProfile.ObsStore.data.items[i].data.snowTemp * (-1);
    						}
    					}
        				var tempProfileStore = this.getSnowtemperatureStore();
        				tempProfileStore.getProxy().clear();
        				tempProfileStore.removeAll();
        				tempProfileStore.loadRawData(originalTempProfile.getAssociatedData());
        			}, this);
        			snowProfileMeassurements.getStbTests(function(originalStbTests) {
        				var stabilitytestArray = new Array();
        				if(Ext.isObject(originalStbTests.ComprTestStore)) {
	        				for(var i=0; i<originalStbTests.ComprTestStore.data.items.length; i++) {
	        					var temp = {
	        						"depth": originalStbTests.ComprTestStore.getAt(i).data.Layer_depthTop_content,
	        						"test": "CT",
	        						"belastungsstufe": originalStbTests.ComprTestStore.getAt(i).data.failedOn_Results_testScore,
	        						"bruchart": originalStbTests.ComprTestStore.getAt(i).data.failedOn_Results_releaseType,
	        						"bruchflaeche": originalStbTests.ComprTestStore.getAt(i).data.failedOn_Results_fractureCharacter
	        					};
	        					stabilitytestArray.push(temp);
	        				}
        				}
        				if(Ext.isObject(originalStbTests.ExtColumnTestStore)) {
	        				for(var i=0; i<originalStbTests.ExtColumnTestStore.data.items.length; i++) {
	        					var temp = {
	    							"depth": originalStbTests.ExtColumnTestStore.getAt(i).data.Layer_depthTop_content,
	    							"test": "ECT",
	    							"belastungsstufe": originalStbTests.ExtColumnTestStore.getAt(i).data.failedOn_Results_testScore,
	    							"bruchart": originalStbTests.ExtColumnTestStore.getAt(i).data.failedOn_Results_releaseType,
	    							"bruchflaeche": originalStbTests.ExtColumnTestStore.getAt(i).data.failedOn_Results_fractureCharacter
	        					};
	        					stabilitytestArray.push(temp);
	        				}
        				}
        				if(Ext.isObject(originalStbTests.RBlockTestStore)) {
	        				for(var i=0; i<originalStbTests.RBlockTestStore.data.items.length; i++) {
	        					var temp = {
	    							"depth": originalStbTests.RBlockTestStore.getAt(i).data.Layer_depthTop_content,
	    							"test": "RB",
	    							"belastungsstufe": originalStbTests.RBlockTestStore.getAt(i).data.failedOn_Results_testScore,
	    							"bruchart": originalStbTests.RBlockTestStore.getAt(i).data.failedOn_Results_releaseType,
	    							"bruchflaeche": originalStbTests.RBlockTestStore.getAt(i).data.failedOn_Results_fractureCharacter
	        					};
	        					stabilitytestArray.push(temp);
	        				}
        				}
        				var stabilitytestStore = this.getStabilitytestStore();
        				stabilitytestStore.getProxy().clear();
        				stabilitytestStore.removeAll();
        				stabilitytestStore.loadRawData(stabilitytestArray);
        			}, this);
        		}, this);
        	}, this);
        	if(Ext.isObject(Ext.getCmp("graph"))) {
        		var graph = Ext.getCmp("graph");
        		graph.surface.removeAll();
        		var data = {};
        		var snowprofileData = store.getAt(0);
        		Ext.apply(data, snowprofileData.getAssociatedData());
        		graph.surface.add(getJSON(data, false, graph));
        		var snowprofile = graph.surface.getGroup('snowprofile');
        		snowprofile.show(true);
        	}
    	}
    }
});