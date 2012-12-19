Ext.define('LWD.model.snowprofile.ObsPoint', {
	extend : 'Ext.data.Model',
	fields : [ 'description', 'incline', 'name', 'obsPointSubType', 'gml_id' ],
	associations : [ {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.pointLocation',
		name : 'pointLocation',
		associationKey : 'pointLocation',
		getterName : 'getPointLocation'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.validAspect',
		name : 'validAspect',
		associationKey : 'validAspect',
		getterName : 'getValidAspect'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.validSlopeAngle',
		name : 'validSlopeAngle',
		associationKey : 'validSlopeAngle',
		getterName : 'getValidSlopeAngle'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.validElevation',
		name : 'validElevation',
		associationKey : 'validElevation'
	} ],
	belongsTo : 'LWD.model.snowprofile.locRef'
});