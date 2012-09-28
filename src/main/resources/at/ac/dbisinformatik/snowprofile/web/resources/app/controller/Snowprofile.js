Ext.define('LWD.controller.Snowprofile', {
    extend: 'Ext.app.Controller',
	stores: [
        'Snowtemperature',
	    'Schichtprofil',
	    'Snowprofile'
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
        'snowprofile.kopf',
        'snowprofile.kopfreadonly',
        'snowprofile.schichtprofil',
        'snowprofile.snowtemperature',
        'snowprofile.stabilitytest',
        'graph.Graph',
        'menuleiste.Menu',
        'menuleiste.SelectProfile'
    ],

    init: function() {
        console.log('Snowprofile loaded!');
        this.control({
        	'toolbar #newData': {
        		click: this.newData
        	},
	    	'toolbar #saveData': {
				click: this.saveData
			},
			'toolbar #loadData': {
				click: this.loadData
			},
			'selectprofile button[action=save]': {
                click: this.loadSnowProfile
            }
		});
        
        this.getSnowprofileStore().on('load', function(store, records, success, operations) {
        	//breakpoint;
        	store.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			var originalStratProfiles = snowProfileMeassurements.stratProfiles(); 
        			var schichtProfileStore = this.getSchichtprofilStore();
        			schichtProfileStore.getProxy().clear();
        			schichtProfileStore.add(originalStratProfiles.data.items);

        			var originalTempProfiles = snowProfileMeassurements.tempProfile(); 
        			var tempProfileStore = this.getSnowtemperatureStore();
        			tempProfileStore.getProxy().clear();
        			Ext.each(originalTempProfiles.data.items, function(tempLayer, index) {
        				tempLayer.data.snowTemp = tempLayer.data.snowTemp / 10;
    				});
        			tempProfileStore.add(originalTempProfiles.data.items);
        		}, this);
        	}, this);
//        	this.getSchichtprofilStore().loadRawData(store.proxy.reader.jsonData.SnowProfile.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer);
        }, this);
        
        this.getSnowprofileStore().on('datachanged', function(store, records, success, operations) {
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
//        	this.getSchichtprofilStore().loadRawData(snowProfileStore.proxy.reader.jsonData.SnowProfile.snowProfileResultsOf.SnowProfileMeasurements.stratProfile.Layer);
        }, this);
        this.getSnowtemperatureStore().on('dataupdate', function(snowtemperatureStore, eOpts) {
        	var snowProfileStore = this.getSnowprofileStore();
        	snowProfileStore.getAt(0).getSnowProfileData(function(snowProfileResultOf) {
        		snowProfileResultOf.getSnowProfileMeasurements(function(snowProfileMeassurements) {
        			var originalTempProfile = snowProfileMeassurements.tempProfile(); 
        			var snowtemperatureStore = this.getSnowtemperatureStore();
        			originalTempProfile.removeAll(true);
        			originalTempProfile.add(snowtemperatureStore.data.items);
        			snowProfileStore.fireEvent("datachanged", snowProfileStore);
        		}, this);
        	}, this);
        }, this);
    },

    newData: function(item) {
    	var store = Ext.data.StoreManager.lookup('Snowprofile');
    	store.removeAll();
    	store.fireEvent("datachanged", store);
    },
    
    saveData: function(item) {
    	console.log(item);
    },
    
	loadData: function(item) {
    	var itemId = item.getItemId();
		var view = Ext.widget('selectprofile');
    },
    
    loadSnowProfile: function(button) {
    	var win = button.up('window'),
    	    form   = win.down('form'),
    	    values = form.getValues();
    	win.close();
    	
    	var store = Ext.data.StoreManager.lookup('Snowprofile');
    	var storeModel = Ext.ModelManager.getModel('LWD.model.Snowprofile');
		storeModel.load(values.profile_id, {
		    success: function(snowprofile) {
				store.removeAll();
				store.add(snowprofile);
				store.fireEvent("datachanged", store);
		    }
		});
    }
});