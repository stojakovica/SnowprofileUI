Ext.define('LWD.model.snowprofile.lwcProfile', {
	extend: 'Ext.data.Model',
	fields: [
        'dir'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.MeasurementComponents', name: 'MeasurementComponents', associationKey:'MeasurementComponents'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.Measurements', name: 'Measurements', associationKey:'Measurements'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});