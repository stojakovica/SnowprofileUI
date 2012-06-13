Ext.define('LWD.model.snowprofile.caaml_ProfMetaData', {
	extend: 'Ext.data.Model',
	fields: [
	   'caaml_MethodOfMeas'      
	],
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_UncertaintyOfMeas', name: 'caaml_UncertaintyOfMeas', associationKey:'caaml_UncertaintyOfMeas'}
    ]
    belongsTo: 'LWD.model.snowprofile.caaml_specSurfAreaProfile'
});