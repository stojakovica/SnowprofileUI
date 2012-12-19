Ext.define('LWD.model.snowprofile.Person', {
	extend : 'Ext.data.Model',
	fields : [ 'name' ],
	belongsTo : 'LWD.model.snowprofile.contactPerson'
});