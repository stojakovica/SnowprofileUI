Ext.define('LWD.store.Messstationen', {
	extend: 'Ext.data.Store',
	model: 'LWD.model.Messstation',
	data: [
		{name: 'Bieberwier', email: 'ed@sencha.com'},
		{name: 'Innsbruck', email: 'tommy@sencha.com'}
	]
});