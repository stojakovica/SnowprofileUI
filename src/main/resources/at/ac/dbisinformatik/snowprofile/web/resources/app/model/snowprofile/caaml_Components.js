Ext.define('LWD.model.snowprofile.caaml_Components', {
	extend: 'Ext.data.Model',
	fields: [
	   'caaml_avg',
	   'caaml_avgMax'
	],
	associations: [
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_grainSize', name: 'caaml_grainSize', associationKey:'caaml_grainSize'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_hIN', name: 'caaml_hIN', associationKey:'caaml_hIN'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_hN24', name: 'caaml_hN24', associationKey:'caaml_hN24'},
       {type: 'belongsTo', model: 'LWD.model.schneeprofil.caaml_hS', name: 'caaml_hS', associationKey:'caaml_hS'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_snowHeight', name: 'caaml_snowHeight', associationKey:'caaml_snowHeight'},
       {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_swe', name: 'caaml_swe', associationKey:'caaml_swe'}
    ]
});