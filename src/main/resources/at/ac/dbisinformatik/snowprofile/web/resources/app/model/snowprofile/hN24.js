Ext.define('LWD.model.snowprofile.hN24', {
	extend: 'Ext.data.Model',
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.Components', name: 'Components', associationKey:'Components'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});