Ext.define('LWD.model.schneeprofil.Schneetemperatur', {
	extend: 'Ext.data.Model',
	fields: [
         {name: 'hoehe_schneetemperatur', type: 'float'},
         {name: 'temperatur', type: 'float'},
     ],
 	validations: [{
         type: 'length',
         field: 'temperatur',
         min: 1
     }]
});