Ext.define('LWD.model.snowprofile.caaml_layerProfile', {
	extend: 'Ext.data.Model',
	fields: [
	   'dir'
	],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_Layer', name: 'caaml_Layer', associationKey:'caaml_Layer'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_SnowProfileMeasurements'
});