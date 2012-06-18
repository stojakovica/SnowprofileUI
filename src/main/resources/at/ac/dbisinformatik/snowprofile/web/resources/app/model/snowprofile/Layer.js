Ext.define('LWD.model.snowprofile.Layer', {
	extend: 'Ext.data.Model',
	fields: [
	   'comment',
	   'coordNum',
	   'grainFormPrimary',
	   'grainFormSecondary',
	   'hardness',
	   'lwc',
	   'gml_id'
	],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'Tortuosity', associationKey:'Tortuosity'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'curvGaussian', associationKey:'curvGaussian'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'curvMean', associationKey:'curvMean'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.densityMeasurement', name: 'densityMeasurement', associationKey:'densityMeasurement'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'depthTop', associationKey:'depthTop'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.grainSize', name: 'grainSize', associationKey:'grainSize'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.impurityMeasurement', name: 'impurityMeasurement', associationKey:'impurityMeasurement'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'porosity', associationKey:'porosity'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'specSurfArea', associationKey:'specSurfArea'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.validDepositionTime', name: 'validDepositionTime', associationKey:'validDepositionTime'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.validThickness', name: 'validThickness', associationKey:'validThickness'}
    ],
    belongsTo: 'LWD.model.snowprofile.layerProfile'
});