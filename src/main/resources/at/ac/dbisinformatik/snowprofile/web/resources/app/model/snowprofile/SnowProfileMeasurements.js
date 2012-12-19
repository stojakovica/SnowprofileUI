Ext.define('LWD.model.snowprofile.SnowProfileMeasurements', {
	extend : 'Ext.data.Model',
	fields : [ 'comment', 'dir', 'precipTI', 'skyCond' ],
	associations : [ {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.airTempPres',
		name : 'airTempPres',
		associationKey : 'airTempPres',
		getterName : 'getAirTempPres'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.densityProfile',
		name : 'densityProfile',
		associationKey : 'densityProfile'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.hS',
		name : 'hS',
		associationKey : 'hS'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.hardnessProfile',
		name : 'hardnessProfile',
		associationKey : 'hardnessProfile'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.contentUomModel',
		name : 'penetrationSki',
		associationKey : 'penetrationSki'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.profileDepth',
		name : 'profileDepth',
		associationKey : 'profileDepth',
		getterName : 'getProfileDepth'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.stratProfile',
		name : 'stratProfile',
		associationKey : 'stratProfile',
		getterName : 'getStratProfile'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.tempProfile',
		name : 'tempProfile',
		associationKey : 'tempProfile',
		getterName : 'getTempProfile'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.stbTests',
		name : 'stbTests',
		associationKey : 'stbTests',
		getterName : 'getStbTests'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.windDir',
		name : 'windDir',
		associationKey : 'windDir',
		getterName : 'getWindDir'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.windSpd',
		name : 'windSpd',
		associationKey : 'windSpd',
		getterName : 'getWindSpd'
	} ],
	belongsTo : 'LWD.model.snowprofile.snowProfileResultsOf'
});