Ext.define('LWD.model.snowprofile.caaml_validDepositionTime', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.gml_TimePeriod', name: 'gml_TimePeriod', associationKey:'gml_TimePeriod'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_Layer'
});