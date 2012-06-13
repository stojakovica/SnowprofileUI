Ext.define('LWD.model.snowprofile.caaml_SnowProfileMeasurements', {
	extend: 'Ext.data.Model',
	fields: [
	   'caaml_comment',
	   'caaml_grainFormPrimary',
	   'caaml_grainFormSecondary',
	   'caaml_surfRoughness'
	],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_airTempPres', name: 'caaml_airTempPres', associationKey:'caaml_airTempPres'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_densityProfile', name: 'caaml_densityProfile', associationKey:'caaml_densityProfile'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_grainSize', name: 'caaml_grainSize', associationKey:'caaml_grainSize'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_hIN', name: 'caaml_hIN', associationKey:'caaml_hIN'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_hN24', name: 'caaml_hN24', associationKey:'caaml_hN24'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_hS', name: 'caaml_hS', associationKey:'caaml_hS'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_layerProfile', name: 'caaml_layerProfile', associationKey:'caaml_layerProfile'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_lwcProfile', name: 'caaml_lwcProfile', associationKey:'caaml_lwcProfile'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_microPenResProfile', name: 'caaml_microPenResProfile', associationKey:'caaml_microPenResProfile'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_penetrationFoot', name: 'caaml_penetrationFoot', associationKey:'caaml_penetrationFoot'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_penetrationRam', name: 'caaml_penetrationRam', associationKey:'caaml_penetrationRam'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_penetrationSki', name: 'caaml_penetrationSki', associationKey:'caaml_penetrationSki'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_snowTempGrnd', name: 'caaml_snowTempGrnd', associationKey:'caaml_snowTempGrnd'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_snowTempSfc', name: 'caaml_snowTempSfc', associationKey:'caaml_snowTempSfc'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_specSurfAreaProfile', name: 'caaml_specSurfAreaProfile', associationKey:'caaml_specSurfAreaProfile'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_tempProfile', name: 'caaml_tempProfile', associationKey:'caaml_tempProfile'}
    ]
    belongsTo: 'LWD.model.snowprofile.caaml_snowProfileResultsOf'
});