Ext.define('LWD.model.snowprofile.stbTests', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.ComprTest', name: 'ComprTest', associationKey:'ComprTest'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.RBlockTest', name: 'RBlockTest', associationKey:'RBlockTest'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.ExtColumnTest', name: 'ExtColumnTest', associationKey:'ExtColumnTest'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});