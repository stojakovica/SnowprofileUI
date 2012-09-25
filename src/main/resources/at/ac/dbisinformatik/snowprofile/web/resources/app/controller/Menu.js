Ext.define('LWD.controller.Menu', {
    extend: 'Ext.app.Controller',
	views: [
        'menuleiste.Menu'
    ],

    init: function() {
		console.log('Menu loaded!');
		this.control({
	    	'toolbar #dataSave': {
				click: this.onClick
			},
			'toolbar #dataLoad': {
				click: this.onClick
			}
		});
    },

	onClick: function(item) {
    	var itemId = item.getItemId();
    	if(itemId == "dataLoad") {
    		store.on('load', this.refresh, this);
    	}
    }
});