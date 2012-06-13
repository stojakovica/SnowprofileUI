Ext.define('LWD.model.snowprofile.caaml_snowProfileResultsOf', {
	extend: 'Ext.data.Model',
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_SnowProfileMeasurements', name: 'caaml_SnowProfileMeasurements', associationKey:'caaml_SnowProfileMeasurements'}
    ],
    belongsTo: 'LWD.model.Snowprofile'
});