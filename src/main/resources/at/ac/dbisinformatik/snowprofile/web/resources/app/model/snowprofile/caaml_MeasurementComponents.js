Ext.define('LWD.model.snowprofile.caaml_MeasurementComponents', {
	extend: 'Ext.data.Model',
	fields: [
	   'caaml_lwc'      
	],
    associations: [
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_microPenResProfile', name: 'caaml_microPenResProfile', associationKey:'caaml_microPenResProfile'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_densityProfile', name: 'caaml_densityProfile', associationKey:'caaml_densityProfile'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_lwcProfile', name: 'caaml_lwcProfile', associationKey:'caaml_lwcProfile'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_specSurfAreaProfile', name: 'caaml_specSurfAreaProfile', associationKey:'caaml_specSurfAreaProfile'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_tempProfile', name: 'caaml_tempProfile', associationKey:'caaml_tempProfile'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel', name: 'caaml_density', associationKey:'caaml_density'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel', name: 'caaml_depth', associationKey:'caaml_depth'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel', name: 'caaml_microPenRes', associationKey:'caaml_microPenRes'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel', name: 'caaml_snowTemp', associationKey:'caaml_snowTemp'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.contentUomModel', name: 'caaml_specSurfArea', associationKey:'caaml_specSurfArea'}
    ]
});