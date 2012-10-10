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

Ext.define('LWD.controller.Snowprofile', {
    extend: 'Ext.app.Controller',
	stores: [
        'Snowtemperature',
	    'Schichtprofil',
	    'Metadata',
	    'Snowprofile',
	    'SnowprofilePreview'
	],
	models: [
        'Snowprofile',
        'snowprofile.AspectPosition',
        'snowprofile.Components',
        'snowprofile.contactPerson',
        'snowprofile.contentUomModel',
        'snowprofile.densityLayer',
        'snowprofile.densityMeasurement',
        'snowprofile.densityProfile',
        'snowprofile.depthTop',
        'snowprofile.ElevationPosition',
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
        'snowprofile.SlopeAnglePosition',
        'snowprofile.SnowProfileMeasurements',
        'snowprofile.snowProfileResultsOf',
        'snowprofile.specSurfAreaProfile',
        'snowprofile.srcRef',
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
        'snowprofile.metadata',
        'snowprofile.schichtprofil',
        'snowprofile.snowtemperature',
        'snowprofile.stabilitytest',
        'snowprofile.snowprofilepreview',
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
			                "dir" : "down top",
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
			                "stbTests" : { "ComprTest" : { "failedOn" : { "Layer" : { "depthTop" : { "content" : "",
			                                    "uom" : "cm"
			                                  } },
			                            "Results" : { "fractureCharacter" : {  },
			                                "testScore" : ""
			                              }
			                          } },
			                    "RBlockTest" : { "noFailure" : {  } }
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
			        "online" : "false",
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
        				console.log(snowprofile);
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
        		}, this);
        	}, this);
        }, this);
        
        this.getSnowprofileStore().on('datachanged', function(store, records, success, operations) {
        	store.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		var metaDataStore = this.getMetadataStore();
        		var datumZeit = store.getAt(0).raw.validTime.TimeInstant.timePosition.split("T");
        		var metadata = {
        				"name": checkObject(store.getAt(0).raw.metaDataProperty.MetaData.srcRef.Operation.contactPerson.Person.name),
        				"profildatum": datumZeit[0],
        				"zeit": datumZeit[1],
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
        }, this);
        this.getSnowtemperatureStore().on('dataupdate', function(snowtemperatureStore, eOpts) {
        	var snowProfileStore = this.getSnowprofileStore();
        	snowProfileStore.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			snowProfileMeassurements.getTempProfile(function(originalTempProfile) {
        				var snowtemperatureStore = this.getSnowtemperatureStore();
        				var layerStore = originalTempProfile.ObsStore;
        				layerStore.removeAll();
        				layerStore.add(snowtemperatureStore.data.items);
        				snowProfileStore.fireEvent("datachanged", snowProfileStore);
        			}, this);
        		}, this);
        	}, this);
        }, this);
        this.getMetadataStore().on('dataupdate', function() {
        	var snowProfileStore = this.getSnowprofileStore();
        	var metaDataStore = this.getMetadataStore();
        	var metaData = metaDataStore.getAt(0).data;
        	var datum = metaData.profildatum.split(".");
			var zeit = metaData.zeit.split(":");
        	snowProfileStore.getAt(0).online = metaData.onlineCheck;
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
        	this.saveData();
        }, this);
    },
    
    saveData: function(item) {
    	// TODO: save Data in OrientDB
    	switch(getLocationHash()[0][1]) {
    		case "create":
    			var store = Ext.data.StoreManager.lookup('Snowprofile');
    			var data = {};
    			var snowprofile = store.getAt(0);
    			Ext.apply(data, snowprofile.getData(true));
    			
    			Ext.Ajax.request({
    				url: '/lwd/snowprofile',
    				success: function(returnObject) { 
//	    				var redirect = '/lwd/static/1.0.0.0/snowprofileDetail.html#action=edit#id='+returnObject.responseText; 
//	                    window.location = redirect;
    				},
    				failure: function() { 
    					alert("Speichern konnte nicht durchgeführt werden!");
    				},
    				jsonData: data
    			});
    			
    			console.log("save button pressed");
    			break;
    		case "edit":
    			var storeModel = Ext.ModelManager.getModel('LWD.model.Snowprofile');
    			storeModel.save({
    				success: function(record, operation) {
    					console.log("test");
    			    }
    			});
    			break;
    	}
    }
});