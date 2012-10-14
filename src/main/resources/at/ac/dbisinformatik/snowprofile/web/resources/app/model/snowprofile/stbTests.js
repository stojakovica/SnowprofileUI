Ext.define('LWD.model.snowprofile.stbTests', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.ComprTest', name: 'ComprTest', associationKey:'ComprTest', getterName: 'getComprTest'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.RBlockTest', name: 'RBlockTest', associationKey:'RBlockTest', getterName: 'getRBlockTest'},
       {type: 'hasOne', model: 'LWD.model.snowprofile.ExtColumnTest', name: 'ExtColumnTest', associationKey:'ExtColumnTest', getterName: 'getExtColumnTest'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});