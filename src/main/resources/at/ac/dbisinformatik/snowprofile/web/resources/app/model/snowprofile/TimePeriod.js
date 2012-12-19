Ext.define('LWD.model.snowprofile.TimePeriod', {
	extend : 'Ext.data.Model',
	fields : [ 'beginPosition', 'endPosition', 'id' ],
	belongsTo : 'LWD.model.snowprofile.validDepositionTime'
});