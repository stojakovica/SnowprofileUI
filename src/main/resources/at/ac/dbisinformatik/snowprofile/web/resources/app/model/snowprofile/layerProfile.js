Ext.define('LWD.model.snowprofile.layerProfile', {
	extend: 'Ext.data.Model',
	fields: [
	   'dir'
	],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.Layer', name: 'Layer', associationKey:'Layer'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});