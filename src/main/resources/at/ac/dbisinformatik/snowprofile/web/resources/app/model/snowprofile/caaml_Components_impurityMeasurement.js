Ext.define('LWD.model.snowprofile.caaml_Components_impurityMeasurement', {
	extend: 'Ext.data.Model',
	fields: [
	   'caaml_description'      
	],
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_massFraction', name: 'caaml_massFraction', associationKey:'caaml_massFraction'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});