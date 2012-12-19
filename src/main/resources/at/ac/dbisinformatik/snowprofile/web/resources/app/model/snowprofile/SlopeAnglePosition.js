Ext.define('LWD.model.snowprofile.SlopeAnglePosition', {
	extend : 'Ext.data.Model',
	fields : [ 'position' ],
	belongsTo : [ 'LWD.model.snowprofile.validSlopeAngle' ]
});