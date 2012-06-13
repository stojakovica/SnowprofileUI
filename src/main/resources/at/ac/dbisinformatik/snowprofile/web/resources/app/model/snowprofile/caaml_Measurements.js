Ext.define('LWD.model.snowprofile.caaml_Measurements', {
	extend: 'Ext.data.Model',
	fields: [
        'caaml_tupleList'
    ],
    associations: [
	    {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_microPenResProfile',    name: 'caaml_microPenResProfile', associationKey:'caaml_microPenResProfile'},
	    {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_densityProfile',    name: 'caaml_densityProfile', associationKey:'caaml_densityProfile'},
	    {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_lwcProfile',    name: 'caaml_lwcProfile', associationKey:'caaml_lwcProfile'},
	    {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_tempProfile',    name: 'caaml_tempProfile', associationKey:'caaml_tempProfile'},
    ]
});