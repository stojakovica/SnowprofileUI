Ext.define('LWD.model.snowprofile.specSurfAreaProfile', {
	extend: 'Ext.data.Model',
	fields: [
        'dir'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.MeasurementComponents',    name: 'MeasurementComponents', associationKey:'MeasurementComponents'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.Measurements', name: 'Measurements', associationKey:'Measurements'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.ProfMetaData', name: 'ProfMetaData', associationKey:'ProfMetaData'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});