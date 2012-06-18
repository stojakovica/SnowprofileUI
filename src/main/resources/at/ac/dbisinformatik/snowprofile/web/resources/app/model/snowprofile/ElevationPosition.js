Ext.define('LWD.model.snowprofile.ElevationPosition', {
	extend: 'Ext.data.Model',
	fields: [
       'position',
       'uom'
    ],
    belongsTo: 'LWD.model.snowprofile.validElevation'
});