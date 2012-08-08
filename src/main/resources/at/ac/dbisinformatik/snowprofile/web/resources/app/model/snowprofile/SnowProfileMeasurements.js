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
       {type: 'hasMany', model: 'LWD.model.LayerProfile', name: 'stratProfiles', associationKey:'stratProfile', reader: {
    	   type  : 'json',
    	   root  : 'Layer',
       }},
       {type: 'hasMany', model: 'LWD.model.TempProfile', name: 'tempProfile', associationKey:'tempProfile', reader: {
    	   type  : 'json',
    	   root  : 'Obs',
       }},
       {type: 'hasMany', model: 'LWD.model.snowprofile.windDir', name: 'windDir', associationKey:'windDir'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.contentUomModel', name: 'windSpd', associationKey:'windSpd'}
    ],
    belongsTo: 'LWD.model.snowprofile.snowProfileResultsOf'
});