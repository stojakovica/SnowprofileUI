Ext.define('LWD.model.snowprofile.caaml_lwcProfile', {
	extend: 'Ext.data.Model',
	fields: [
        'dir'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_MeasurementComponents',    name: 'caaml_MeasurementComponents', associationKey:'caaml_MeasurementComponents'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_Measurements', name: 'caaml_Measurements', associationKey:'caaml_Measurements'}
    ]
    belongsTo: 'LWD.model.snowprofile.caaml_SnowProfileMeasurements'
});