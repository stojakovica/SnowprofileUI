Ext.define('LWD.model.snowprofile.validElevation', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasMany', model: 'LWD.model.snowprofile.ElevationPosition', name: 'ElevationPosition', associationKey:'ElevationPosition'}
    ],
    belongsTo: 'LWD.model.snowprofile.ObsPoint'
});