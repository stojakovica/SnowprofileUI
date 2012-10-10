Ext.define('LWD.model.snowprofile.microPenResProfile', {
	extend: 'Ext.data.Model',
	fields: [
       'dir'
    ],
    associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.MeasurementComponents', name: 'MeasurementComponents', associationKey:'MeasurementComponents'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.Measurements', name: 'Measurements', associationKey:'Measurements'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.ProfMetaData', name: 'ProfMetaData', associationKey:'ProfMetaData'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});