Ext.define('LWD.model.snowprofile.contentUomModel', {
	extend: 'Ext.data.Model',
	fields: [
       'content',
       'uom'
    ],
    associations: [
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_SnowProfileMeasurements', name: 'caaml_SnowProfileMeasurements', associationKey:'caaml_SnowProfileMeasurements'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_MeasurementComponents', name: 'caaml_MeasurementComponents', associationKey:'caaml_MeasurementComponents'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_Components', name: 'caaml_Components', associationKey:'caaml_Components'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_Layer', name: 'caaml_Layer', associationKey:'caaml_Layer'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_ProfMetaData', name: 'caaml_ProfMetaData', associationKey:'caaml_ProfMetaData'},
    ]
});