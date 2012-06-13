Ext.define('LWD.model.snowprofile.caaml_grainSize', {
	extend: 'Ext.data.Model',
	fields: [
        'uom'
    ],
    associations: [
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_SnowProfileMeasurements', name: 'caaml_SnowProfileMeasurements', associationKey:'caaml_SnowProfileMeasurements'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_Layer', name: 'caaml_Layer', associationKey:'caaml_Layer'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_Components', name: 'caaml_Components', associationKey:'caaml_Components'}
    ]
});