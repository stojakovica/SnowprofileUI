Ext.define('LWD.model.snowprofile.densityMeasurement', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.Components', name: 'Components', associationKey:'Components'}
    ],
    belongsTo: 'LWD.model.snowprofile.Layer'
});