Ext.define('LWD.model.snowprofile.MeasurementComponents', {
	extend: 'Ext.data.Model',
	fields: [
	   'lwc'      
	],
    associations: [
       {type: 'belongsTo', model: 'LWD.model.snowprofile.microPenResProfile', name: 'microPenResProfile', associationKey:'microPenResProfile'},
       {type: 'belongsTo', model: 'LWD.model.snowprofile.densityProfile', name: 'densityProfile', associationKey:'densityProfile'},
       {type: 'belongsTo', model: 'LWD.model.snowprofile.lwcProfile', name: 'lwcProfile', associationKey:'lwcProfile'},
       {type: 'belongsTo', model: 'LWD.model.snowprofile.specSurfAreaProfile', name: 'specSurfAreaProfile', associationKey:'specSurfAreaProfile'},
       {type: 'belongsTo', model: 'LWD.model.snowprofile.tempProfile', name: 'tempProfile', associationKey:'tempProfile'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.contentUomModel', name: 'density', associationKey:'density'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.contentUomModel', name: 'depth', associationKey:'depth'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.contentUomModel', name: 'microPenRes', associationKey:'microPenRes'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.contentUomModel', name: 'snowTemp', associationKey:'snowTemp'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.contentUomModel', name: 'specSurfArea', associationKey:'specSurfArea'}
    ]
});