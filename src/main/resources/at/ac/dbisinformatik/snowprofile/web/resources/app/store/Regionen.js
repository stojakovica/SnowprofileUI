Ext.define('LWD.store.Regionen', {
	extend: 'Ext.data.Store',
	model: 'LWD.model.Region',
	data: [
		{
			region: 'R5', 
			profilort: 'Unterhalb Ruderhof', 
			datum: '07.03.2012', 
			seehoehe: '2200 m', 
			exposition: 'S', 
			typ: '-', 
		},
		{
			region: 'R1', 
			profilort: 'J&ouml;chelspitze', 
			datum: '04.03.2012', 
			seehoehe: '1780 m', 
			exposition: '-', 
			typ: '-', 
		},
		{
			region: 'R6', 
			profilort: 'Sonntagsk&ouml;pfl', 
			datum: '02.03.2012', 
			seehoehe: '1900 m', 
			exposition: 'SO', 
			typ: '-', 
		},
		{
			region: 'R1', 
			profilort: 'Biberwier', 
			datum: '02.03.2012', 
			seehoehe: '1650 m', 
			exposition: 'SW', 
			typ: '-', 
		},
		{
			region: 'R5', 
			profilort: 'Mitterzeiger', 
			datum: '02.03.2012', 
			seehoehe: '2095 m', 
			exposition: 'NO', 
			typ: '-', 
		}
	]
});