Ext.define('LWD.model.snowprofile.tempProfile', {
	extend: 'Ext.data.Model',
	fields: [
        'uomDepth',
        'uomTemp'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.Obs', name: 'Obs', associationKey:'Obs'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});