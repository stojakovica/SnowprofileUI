Ext.define('LWD.store.Users', {
	extend: 'Ext.data.Store',
	model: 'LWD.model.User',
	data: [
		{name: 'Ed', email: 'ed@sencha.com'},
		{name: 'Tommy', email: 'tommy@sencha.com'}
	]
});