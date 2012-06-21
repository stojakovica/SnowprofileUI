Ext.define('LWD.model.snowprofile.hardnessProfile', {
	extend: 'Ext.data.Model',
	fields: [
        'uomDepthTop',
        'uomDropHeight',
        'uomHardness',
        'uomThickness',
        'uomWeightHammer',
        'uomWeightTube'
    ],
    associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.hardnessLayer', name: 'Layer', associationKey:'Layer'},
       {type: 'hasMany', model: 'LWD.model.snowprofile.MetaData', name: 'MetaData', associationKey:'MetaData'}
    ],
    belongsTo: 'LWD.model.snowprofile.SnowProfileMeasurements'
});