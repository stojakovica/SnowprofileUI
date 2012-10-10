Ext.define('LWD.model.snowprofile.validSlopeAngle', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.SlopeAnglePosition', name: 'SlopeAnglePosition', associationKey:'SlopeAnglePosition', getterName: 'getSlopeAnglePosition'}
    ],
    belongsTo: 'LWD.model.snowprofile.ObsPoint'
});