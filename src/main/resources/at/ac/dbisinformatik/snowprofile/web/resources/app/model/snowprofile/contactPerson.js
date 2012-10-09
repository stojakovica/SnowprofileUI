Ext.define('LWD.model.snowprofile.contactPerson', {
	extend: 'Ext.data.Model',
    associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.Person', name: 'Person', associationKey:'Person'},
    ],
    belongsTo: 'LWD.model.snowprofile.Operation'
});