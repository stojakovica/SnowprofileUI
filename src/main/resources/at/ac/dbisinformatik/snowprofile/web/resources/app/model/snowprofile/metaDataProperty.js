Ext.define('LWD.model.snowprofile.metaDataProperty', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.MetaDataMetaProperty', name: 'MetaData', associationKey:'MetaData', getterName: 'getMetaData'}
    ],
    belongsTo: 'LWD.model.Snowprofile'
});