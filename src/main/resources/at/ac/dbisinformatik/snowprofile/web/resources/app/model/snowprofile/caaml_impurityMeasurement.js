Ext.define('LWD.model.snowprofile.caaml_impurityMeasurement', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_Components_impurityMeasurement', name: 'caaml_Components_impurityMeasurement', associationKey:'caaml_Components'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});