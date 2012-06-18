Ext.define('LWD.model.snowprofile.SnowProfileMeasurements', {
	extend: 'Ext.data.Model',
	fields: [
	   'comment',
	   'grainFormPrimary',
	   'grainFormSecondary',
	   'surfRoughness'
	],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'airTempPres', associationKey:'airTempPres'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.densityProfile', name: 'densityProfile', associationKey:'densityProfile'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.grainSize', name: 'grainSize', associationKey:'grainSize'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.hIN', name: 'hIN', associationKey:'hIN'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.hN24', name: 'hN24', associationKey:'hN24'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.hS', name: 'hS', associationKey:'hS'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.layerProfile', name: 'layerProfile', associationKey:'layerProfile'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.lwcProfile', name: 'lwcProfile', associationKey:'lwcProfile'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.microPenResProfile', name: 'microPenResProfile', associationKey:'microPenResProfile'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'penetrationFoot', associationKey:'penetrationFoot'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'penetrationRam', associationKey:'penetrationRam'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'penetrationSki', associationKey:'penetrationSki'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'snowTempGrnd', associationKey:'snowTempGrnd'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'snowTempSfc', associationKey:'snowTempSfc'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.specSurfAreaProfile', name: 'specSurfAreaProfile', associationKey:'specSurfAreaProfile'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.tempProfile', name: 'tempProfile', associationKey:'tempProfile'}
    ],
    belongsTo: 'LWD.model.snowprofile.snowProfileResultsOf'
});