Ext.define('LWD.model.Snowprofile', {
	extend: 'Ext.data.Model',
	fields: [
	    'gml_id',
	    'xmlns_caaml',
	    'xmlns_gml',
	    'xmlns_xlink',
	    'xmlns_xsi',
	    'xsi_schemaLocation'
	],
	associations: [
        {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_locRef',    name: 'caaml_locRef', associationKey:'caaml_locRef'},
        {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_snowProfileResultsOf', name: 'caaml_snowProfileResultsOf', associationKey:'caaml_snowProfileResultsOf'},
        {type: 'hasMany', model: 'LWD.model.schneeprofil.caaml_validTime', name: 'caaml_validTime', associationKey:'caaml_validTime'},
    ]
});