Ext.define('LWD.model.snowprofile.locRef', {
	extend: 'Ext.data.Model',
	associations: [
       {type: 'hasOne', model: 'LWD.model.snowprofile.ObsPoint', name: 'ObsPoint', associationKey:'ObsPoint'}
    ],
    belongsTo: 'LWD.model.Snowprofile'
});