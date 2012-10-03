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
        'snowprofile.microPenResProfile',
        'snowprofile.Obs',
        'snowprofile.ObsPoint',
        'snowprofile.Point',
        'snowprofile.pointLocation',
        'snowprofile.ProfMetaData',
        'snowprofile.SnowProfileMeasurements',
        'snowprofile.snowProfileResultsOf',
        'snowprofile.specSurfAreaProfile',
        'snowprofile.stratLayer',
        'snowprofile.stratProfile',
        'snowprofile.tempProfile',
        'snowprofile.ThinknessPosition',
        'snowprofile.TimeInstant',
        'snowprofile.TimePeriod',
        'snowprofile.validDepositionTime',
        'snowprofile.validElevation',
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

        var hashString = location.hash;
        var nvPair = hashString.split("=");
        
        var store = Ext.data.StoreManager.lookup('Snowprofile');
    	var storeModel = Ext.ModelManager.getModel('LWD.model.Snowprofile');
		storeModel.load(nvPair[1], {
		    success: function(snowprofile) {
				store.removeAll();
				store.add(snowprofile);
				store.fireEvent("datachanged", store);
		    }
		});
        
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
        				"name": store.getAt(0).raw.metaDataProperty.MetaData.srcRef.Operation.contactPerson.Person.name,
        				"profildatum": datumZeit[0],
        				"zeit": datumZeit[1],
        				"region": "",
        				"hoehe": store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.profileDepth.content,
        				"profilort": store.getAt(0).raw.locRef.ObsPoint.name,
        				"utmKoordinaten": "",
        				"hangneigung": store.getAt(0).raw.locRef.ObsPoint.validSlopeAngle.SlopeAnglePosition.position,
        				"hangneigungCheck": "",
        				"exposition": store.getAt(0).raw.locRef.ObsPoint.validAspect.AspectPosition.position,
        				"windgeschwindigkeit": store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.windSpd.content,
        				"windrichtung": store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.windDir.AspectPosition.position,
        				"lufttemperatur": store.getAt(0).raw.snowProfileResultsOf.SnowProfileMeasurements.airTempPres.content,
        				"niederschlag": "",
        				"intensitaetDesNS": "",
        				"bewoelkung": "",
        				"sonstiges": ""
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
    },
    
    saveData: function(item) {
    	// TODO: save Data in OrientDB
    	alert("save Data");
    }
});