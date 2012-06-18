Ext.define('LWD.model.snowprofile.validDepositionTime', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.TimePeriod', name: 'TimePeriod', associationKey:'TimePeriod'}
    ],
    belongsTo: 'LWD.model.snowprofile.Layer'
});