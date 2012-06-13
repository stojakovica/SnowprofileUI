Ext.define('LWD.model.snowprofile.caaml_Layer', {
	extend: 'Ext.data.Model',
	fields: [
	   'caaml_comment',
	   'caaml_coordNum',
	   'caaml_grainFormPrimary',
	   'caaml_grainFormSecondary',
	   'caaml_hardness',
	   'caaml_lwc',
	   'gml_id'
	],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_Tortuosity', name: 'caaml_Tortuosity', associationKey:'caaml_Tortuosity'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_curvGaussian', name: 'caaml_curvGaussian', associationKey:'caaml_curvGaussian'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_curvMean', name: 'caaml_curvMean', associationKey:'caaml_curvMean'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_densityMeasurement', name: 'caaml_densityMeasurement', associationKey:'caaml_densityMeasurement'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_depthTop', name: 'caaml_depthTop', associationKey:'caaml_depthTop'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_grainSize', name: 'caaml_grainSize', associationKey:'caaml_grainSize'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_impurityMeasurement', name: 'caaml_impurityMeasurement', associationKey:'caaml_impurityMeasurement'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel', name: 'caaml_porosity', associationKey:'caaml_porosity'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel', name: 'caaml_specSurfArea', associationKey:'caaml_specSurfArea'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_validDepositionTime', name: 'caaml_validDepositionTime', associationKey:'caaml_validDepositionTime'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_validThickness', name: 'caaml_validThickness', associationKey:'caaml_validThickness'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_layerProfile'
});