Ext.define('LWD.model.snowprofile.SnowProfileMeasurements', {
	extend: 'Ext.data.Model',
	fields: [
	   'comment',
	   'dir',
	   'precipTI',
	   'skyCond'
	],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'airTempPres', associationKey:'airTempPres'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.densityProfile', name: 'densityProfile', associationKey:'densityProfile'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.hS', name: 'hS', associationKey:'hS'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.hardnessProfile', name: 'hardnessProfile', associationKey:'hardnessProfile'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'penetrationSki', associationKey:'penetrationSki'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'profileDepth', associationKey:'profileDepth'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.stratProfile', name: 'stratProfile', associationKey:'stratProfile', 
       	getterName: 'getStratProfile'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.tempProfile', name: 'tempProfile', associationKey:'tempProfile', 
       	getterName: 'getTempProfile'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.windDir', name: 'windDir', associationKey:'windDir'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'windSpd', associationKey:'windSpd'}
    ],
    belongsTo: 'LWD.model.snowprofile.snowProfileResultsOf'
});