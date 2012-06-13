Ext.define('LWD.model.snowprofile.caaml_tempProfile', {
	extend: 'Ext.data.Model',
	fields: [
        'dir'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_MeasurementComponents',    name: 'caaml_MeasurementComponents', associationKey:'caaml_MeasurementComponents'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_Measurements', name: 'caaml_Measurements', associationKey:'caaml_Measurements'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_ProfMetaData', name: 'caaml_ProfMetaData', associationKey:'caaml_ProfMetaData'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_SnowProfileMeasurements'
});