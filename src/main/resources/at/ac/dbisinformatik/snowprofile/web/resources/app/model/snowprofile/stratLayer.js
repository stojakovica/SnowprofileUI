Ext.define('LWD.model.snowprofile.stratLayer', {
	extend: 'Ext.data.Model',
	fields: [
	   'grainFormPrimary',
	   'grainFormSecondary',
	   'hardness'
	],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'depthTop', associationKey:'depthTop'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.grainSize', name: 'grainSize', associationKey:'grainSize'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'lwc', associationKey:'lwc'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'thickness', associationKey:'thickness'}
    ],
    belongsTo: 'LWD.model.snowprofile.stratProfile'
});