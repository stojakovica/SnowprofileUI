Ext.define('LWD.model.snowprofile.Components', {
	extend : 'Ext.data.Model',
	fields : [ 'avg', 'avgMax', 'description' ],
	associations : [ {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.grainSize',
		name : 'grainSize',
		associationKey : 'grainSize'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.hIN',
		name : 'hIN',
		associationKey : 'hIN'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.hN24',
		name : 'hN24',
		associationKey : 'hN24'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.hS',
		name : 'hS',
		associationKey : 'hS'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.densityMeasurement',
		name : 'densityMeasurement',
		associationKey : 'densityMeasurement'
	}, {
		type : 'belongsTo',
		model : 'LWD.model.snowprofile.impurityMeasurement',
		name : 'impurityMeasurement',
		associationKey : 'impurityMeasurement'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.contentUomModel.js',
		name : 'snowHeight',
		associationKey : 'snowHeight'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.contentUomModel.js',
		name : 'swe',
		associationKey : 'swe'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.contentUomModel.js',
		name : 'density',
		associationKey : 'density'
	}, {
		type : 'hasOne',
		model : 'LWD.model.snowprofile.contentUomModel.js',
		name : 'massFraction',
		associationKey : 'massFraction'
	} ]
});