Ext.define('LWD.model.snowprofile.snowProfileResultsOf', {
	extend: 'Ext.data.Model',
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.SnowProfileMeasurements', name: 'SnowProfileMeasurements', associationKey:'SnowProfileMeasurements'}
    ],
    belongsTo: 'LWD.model.Snowprofile'
});