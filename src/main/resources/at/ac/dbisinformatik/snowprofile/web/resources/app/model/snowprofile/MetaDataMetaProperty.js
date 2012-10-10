Ext.define('LWD.model.snowprofile.MetaDataMetaProperty', {
	extend: 'Ext.data.Model',
	fields: [
        'dateTimeReport'
    ],
    associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.srcRef', name: 'srcRef', associationKey:'srcRef', getterName: 'getSrcRef'},
    ],
    belongsTo: 'LWD.model.snowprofile.metaDataProperty'
});