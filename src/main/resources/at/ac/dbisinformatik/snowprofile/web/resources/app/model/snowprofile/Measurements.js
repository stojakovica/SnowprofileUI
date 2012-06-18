Ext.define('LWD.model.snowprofile.Measurements', {
	extend: 'Ext.data.Model',
	fields: [
        'tupleList'
    ],
    associations: [
	    {type: 'belongsTo', model: 'LWD.model.snowprofile.microPenResProfile',    name: 'microPenResProfile', associationKey:'microPenResProfile'},
	    {type: 'belongsTo', model: 'LWD.model.snowprofile.densityProfile',    name: 'densityProfile', associationKey:'densityProfile'},
	    {type: 'belongsTo', model: 'LWD.model.snowprofile.lwcProfile',    name: 'lwcProfile', associationKey:'lwcProfile'},
	    {type: 'belongsTo', model: 'LWD.model.snowprofile.tempProfile',    name: 'tempProfile', associationKey:'tempProfile'},
    ]
});