Ext.define('LWD.view.menuleiste.Menu', {
	extend : 'Ext.Panel',
	alias : 'widget.menuleiste',
	border : false,
	tbar : [ {
		text : 'Übersicht',
		reorderable : false,
		handler : function() {
			var newToken = "";
			Ext.History.add(newToken);
			var store = Ext.data.StoreManager.lookup('SnowprofilePreview');
			store.reload();
		}
	}, "-", {
		text : 'PDF-Export',
		reorderable : false,
		id : 'printPDF'
	}, "-", {
		text : 'PNG-Export',
		reorderable : false,
		id : 'printPNG'
	}, "-", {
		text : 'XML-Export',
		reorderable : false,
		id : 'exportXML'
	}, "-", {
		text : 'Logout',
		itemId : 'logout',
		reorderable : false,
		handler : function() {
			// TODO: destroy Session
			window.location.href = "/lwd/static/1.0.0.0/login.html";
		}
	} ],

	initComponent : function() {
		this.callParent(arguments);
	}
});