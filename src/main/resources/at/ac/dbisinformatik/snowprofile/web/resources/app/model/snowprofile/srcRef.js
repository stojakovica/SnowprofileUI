Ext.define('LWD.model.snowprofile.srcRef', {
	extend: 'Ext.data.Model',
    associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.Operation', name: 'Operation', associationKey:'Operation'},
    ],
    belongsTo: 'LWD.model.snowprofile.MetaDataMetaProperty'
});