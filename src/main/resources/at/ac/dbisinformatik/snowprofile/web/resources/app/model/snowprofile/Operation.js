Ext.define('LWD.model.snowprofile.Operation', {
	extend: 'Ext.data.Model',
    associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.contactPerson', name: 'contactPerson', associationKey:'contactPerson', getterName: 'getContactPerson'},
    ],
    belongsTo: 'LWD.model.snowprofile.srcRef'
});