function getLocationHash() {
	var hashString = location.hash;
    var nvPairs = hashString.split("#");
    var nvPair = new Array();
    for(var i=1; i<=nvPairs.length; i++) {
    	if(nvPairs[i] != null) {
    		temp = nvPairs[i].split("=");
    		nvPair.push(temp);
    	}
    }
    return nvPair
}

function checkObject(object) {
	if(Ext.isObject(object))
		return "";
	else
		return object;
}

function checkDir(object) {
	if(object == "top down")
		return "on";
	else
		return "";
}

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
        'snowprofile.windDir'
	],
	
	views: [
        'snowprofile.Metadata',
        'snowprofile.schichtprofil',
        'snowprofile.snowtemperature',
        'snowprofile.stabilitytest',
        'snowprofile.snowprofilePreview',
        'graph.Graph',
        'menuleiste.Menu',
        'menuleiste.SelectProfile'
    ],

    init: function() {
        console.log('Snowprofile loaded!');

        if(getLocationHash()[0] != null) {
        	var nvPair = getLocationHash();
        	var action = nvPair[0][1];
        }
        if(getLocationHash()[1] != null) {
        	var nvPair = getLocationHash();
        	var id = nvPair[1][1];
        }
        
        var store = Ext.data.StoreManager.lookup('Snowprofile');
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
	        			store.removeAll();
	        			store.add(snowprofile);
	        		}
        		});
        		break;
        }
        
        this.control({
	    	'toolbar #saveData': {
				click: this.saveData
			},
		});
        
        this.getSnowprofileStore().on('load', function(store, records, success, operations) {
        	store.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		var metaDataStore = this.getMetadataStore();
        		var datumZeit = store.getAt(0).raw.validTime.TimeInstant.timePosition.split("T");
        		var metadata = {
        				"name": checkObject(store.getAt(0).raw.metaDataProperty.MetaData.srcRef.Operation.contactPerson.Person.name),
        				"profildatum": datumZeit[0],
        				"zeit": datumZeit[1].substring(0, 5),
        				"region": checkObject(store.getAt(0).raw.locRef.ObsPoint.description),
        				"hoehe": checkObject(store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.profileDepth.content),
        				"profilort": checkObject(store.getAt(0).raw.locRef.ObsPoint.name),
        				"utmKoordinaten": checkObject(store.getAt(0).raw.locRef.ObsPoint.pointLocation.gml_Point.gml_pos),
        				"hangneigung": checkObject(store.getAt(0).raw.locRef.ObsPoint.validSlopeAngle.SlopeAnglePosition.position),
        				"hangneigungCheck": "",
        				"exposition": checkObject(store.getAt(0).raw.locRef.ObsPoint.validAspect.AspectPosition.position),
        				"windgeschwindigkeit": checkObject(store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.windSpd.content),
        				"windrichtung": checkObject(store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.windDir.AspectPosition.position),
        				"lufttemperatur": checkObject(store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.airTempPres.content),
        				"niederschlag": checkObject(store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.precipTI),
        				"intensitaetDesNS": "", // TODO: regeln, kann mit Information von Matthias nichts anfangen
        				"bewoelkung": checkObject(store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.skyCond),
        				"sonstiges": checkObject(store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.comment),
        				"onlineCheck": checkObject(store.getAt(0).raw.online),
        				"direction": checkDir(store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.dir),
        		};
        		metaDataStore.loadRawData(metadata);
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			snowProfileMeassurements.getStratProfile(function(originalStratProfile) {
        				var schichtProfileStore = this.getSchichtprofilStore();
        				schichtProfileStore.getProxy().clear();
        				schichtProfileStore.removeAll();
        				schichtProfileStore.loadRawData(originalStratProfile.getAssociatedData());
        			}, this);
        			snowProfileMeassurements.getTempProfile(function(originalTempProfile) {
        				var tempProfileStore = this.getSnowtemperatureStore();
        				tempProfileStore.getProxy().clear();
        				tempProfileStore.removeAll();
        				tempProfileStore.loadRawData(originalTempProfile.getAssociatedData());
        			}, this);
        			snowProfileMeassurements.getStbTests(function(originalStbTests) {
        				var stabilitytestArray = new Array();
        				
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
        				
        				var stabilitytestStore = this.getStabilitytestStore();
        				stabilitytestStore.getProxy().clear();
        				stabilitytestStore.removeAll();
        				stabilitytestStore.loadRawData(stabilitytestArray);
        			}, this);
        		}, this);
        	}, this);
        }, this);
        
        this.getSnowprofileStore().on('datachanged', function(store, records, success, operations) {
        	store.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		console.log(store);
        		var metaDataStore = this.getMetadataStore();
        		var datumZeit = store.getAt(0).getValidTime().getTimeInstant().data.timePosition.split("T");
        		var metadata = {
        				"name": checkObject(store.getAt(0).getMetaDataProperty().getMetaData().getSrcRef().getOperation().getContactPerson().getPerson().data.name),
        				"profildatum": datumZeit[0],
        				"zeit": datumZeit[1].substring(0, 5),
        				"region": checkObject(store.getAt(0).getLocRefData().getObsPoint().data.description),
        				"hoehe": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getProfileDepth().data.content),
        				"profilort": checkObject(store.getAt(0).getLocRefData().getObsPoint().data.name),
        				"utmKoordinaten": checkObject(store.getAt(0).getLocRefData().getObsPoint().getPointLocation().getPoint().data.gml_pos),
        				"hangneigung": checkObject(store.getAt(0).getLocRefData().getObsPoint().getValidSlopeAngle().getSlopeAnglePosition().data.position),
        				"hangneigungCheck": "",
        				"exposition": checkObject(store.getAt(0).getLocRefData().getObsPoint().getValidAspect().getAspectPosition().data.position),
        				"windgeschwindigkeit": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getWindSpd().data.content),
        				"windrichtung": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getWindDir().getAspectPosition().data.position),
        				"lufttemperatur": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().getAirTempPres().data.content),
        				"niederschlag": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.precipTI),
        				"intensitaetDesNS": "", // TODO: regeln, kann mit Information von Matthias nichts anfangen
        				"bewoelkung": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.skyCond),
        				"sonstiges": checkObject(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.comment),
        				"onlineCheck": checkObject(store.getAt(0).data.online),
        				"direction": checkDir(store.getAt(0).getSnowProfileData().getSnowProfileMeasurements().data.dir),
        		};
        		
        		metaDataStore.loadRawData(metadata);
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			snowProfileMeassurements.getStratProfile(function(originalStratProfile) {
        				var schichtProfileStore = this.getSchichtprofilStore();
        				schichtProfileStore.getProxy().clear();
        				schichtProfileStore.removeAll();
        				schichtProfileStore.loadRawData(originalStratProfile.getAssociatedData());
        			}, this);
        			snowProfileMeassurements.getTempProfile(function(originalTempProfile) {
        				var tempProfileStore = this.getSnowtemperatureStore();
        				tempProfileStore.getProxy().clear();
        				tempProfileStore.removeAll();
        				tempProfileStore.loadRawData(originalTempProfile.getAssociatedData());
        			}, this);
        			snowProfileMeassurements.getStbTests(function(originalStbTests) {
        				var stabilitytestArray = new Array();
        				
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
        				
        				var stabilitytestStore = this.getStabilitytestStore();
        				stabilitytestStore.getProxy().clear();
        				stabilitytestStore.removeAll();
        				stabilitytestStore.loadRawData(stabilitytestArray);
        			}, this);
        		}, this);
        	}, this);
        }, this);
        
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
        	var snowProfileStore = this.getSnowprofileStore();
        	var metaDataStore = this.getMetadataStore();
        	var metaData = metaDataStore.getAt(0).data;
        	var datum = metaData.profildatum.split(".");
			var zeit = metaData.zeit.split(":");
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
    							"failedOn_Results_testScore": stabilitytestStore.getAt(i).data.belastungsstufe,
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
	    				var redirect = '/lwd/static/1.0.0.0/snowprofileDetail.html#action=edit#id='+returnObject.responseText; 
	                    window.location = redirect;
	                    window.location.reload(true);
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
    				url: '/lwd/snowprofile/'+getLocationHash()[1][1],
    				success: function(returnObject) {
    				},
    				failure: function() { 
    					alert("Speichern konnte nicht durchgeführt werden!");
    				},
    				jsonData: data
    			});
    			break;
    	}
    }
});