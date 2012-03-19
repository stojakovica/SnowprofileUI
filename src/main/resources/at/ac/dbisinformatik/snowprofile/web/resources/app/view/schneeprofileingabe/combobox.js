Ext.define('LWD.view.schneeprofileingabe.eingabeform', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.combobox',
	
	store: 'ComboBox',
	
	initComponent: function() {
		this.items = [
            {
            	renderTo: 'simpleCombo',
                width: 500,
                labelWidth: 130,
                typeAhead: true
            }
        ];
		
        this.callParent(arguments);
    }
});