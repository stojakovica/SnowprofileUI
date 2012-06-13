Ext.define('LWD.model.snowprofile.caaml_hIN', {
	extend: 'Ext.data.Model',
	fields: [
        'dateTimeCleared'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_Components', name: 'caaml_Components', associationKey:'caaml_Components'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_SnowProfileMeasurements'
});