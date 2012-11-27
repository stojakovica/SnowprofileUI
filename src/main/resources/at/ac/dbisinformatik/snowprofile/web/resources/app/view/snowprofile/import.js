Ext.define('LWD.view.snowprofile.import', {
    extend: 'Ext.window.Window',
    alias : 'widget.import',

    title : 'XML Import',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
            	xtype: 'form',
            	items: [{
			        xtype: 'filefield',
			        name: 'import',
			        fieldLabel: 'XML Import',
			        labelWidth: 100,
			        msgTarget: 'side',
			        allowBlank: false,
			        anchor: '100%',
			        buttonText: 'XML-Datei auswählen'
			    }],
			    
			    buttons: [{
	               	text: 'Upload',
	                   handler: function() {
	                       var form = this.up('form').getForm();
	                       console.log(form);
	                       if(form.isValid()){
	                           form.submit({
	                               url: '/lwd/snowprofile',
	                               waitMsg: 'Upload XML...',
	                               success: function(fp, o) {
	                            	   var obj = Ext.decode(o.response.responseText);
	                            	   var redirect = '/lwd/static/1.0.0.0/snowprofileDetail.html#action=edit#id='+obj.id; 
		           	                   window.location = redirect;
	                               }
	                           });
	                       }
	                   }
	               },
	               {
	                   text: 'Cancel',
	                   scope: this,
	                   handler: this.close
	               }
	           ]
            }
        ];

        this.callParent(arguments);
    }
});