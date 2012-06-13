Ext.define('LWD.model.snowprofile.caaml_ProfMetaData', {
	extend: 'Ext.data.Model',
	fields: [
	   'caaml_MethodOfMeas'      
	],
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel.js', name: 'caaml_SurfOfIndentation', associationKey:'caaml_SurfOfIndentation'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_microPenResProfile'
});