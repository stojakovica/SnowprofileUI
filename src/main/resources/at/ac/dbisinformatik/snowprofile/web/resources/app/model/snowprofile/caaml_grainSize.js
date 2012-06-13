Ext.define('LWD.model.snowprofile.caaml_grainSize', {
	extend: 'Ext.data.Model',
	fields: [
        'uom'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_Components', name: 'caaml_Components', associationKey:'caaml_Components'}
    ],
    belongsTo: 'LWD.model.snowprofile.caaml_SnowProfileMeasurements'
});