Ext.define('LWD.model.snowprofile.caaml_Components', {
	extend: 'Ext.data.Model',
	fields: [
	   'caaml_avg',
	   'caaml_avgMax',
	   'caaml_description'
	],
	associations: [
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_grainSize', name: 'caaml_grainSize', associationKey:'caaml_grainSize'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_hIN', name: 'caaml_hIN', associationKey:'caaml_hIN'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_hN24', name: 'caaml_hN24', associationKey:'caaml_hN24'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_hS', name: 'caaml_hS', associationKey:'caaml_hS'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_densityMeasurement', name: 'caaml_densityMeasurement', associationKey:'caaml_densityMeasurement'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_impurityMeasurement', name: 'caaml_impurityMeasurement', associationKey:'caaml_impurityMeasurement'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel.js', name: 'caaml_snowHeight', associationKey:'caaml_snowHeight'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel.js', name: 'caaml_swe', associationKey:'caaml_swe'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel.js', name: 'caaml_density', associationKey:'caaml_density'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel.js', name: 'caaml_massFraction', associationKey:'caaml_massFraction'}
    ]
});