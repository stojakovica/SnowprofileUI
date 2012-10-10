Ext.define('LWD.model.snowprofile.ProfMetaData', {
	extend: 'Ext.data.Model',
	fields: [
	   'MethodOfMeas'      
	],
	associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.contentUomModel.js', name: 'SurfOfIndentation', associationKey:'SurfOfIndentation'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.contentUomModel.js', name: 'UncertaintyOfMeas', associationKey:'UncertaintyOfMeas'}
    ],
    belongsTo: 'LWD.model.snowprofile.microPenResProfile'
});