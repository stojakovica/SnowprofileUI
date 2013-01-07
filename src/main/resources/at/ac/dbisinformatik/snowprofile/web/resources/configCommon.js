Ext.Loader.setConfig({enabled:true});

// Setze Texte für RowEditing in den Tabellen für Schichtprofil, Schneetemperaturprofil und Stabilitätstests
Ext.grid.RowEditor.prototype.cancelBtnText = "Abbrechen";
Ext.grid.RowEditor.prototype.saveBtnText = "Speichern";

var snowTopValue = 250;
var tempMax = 26;