Ext.define('LWD.store.Schichtprofil', {
	extend: 'Ext.data.Store',
	autoDestroy: true,
	autoLoad: true,
    autoSync: true,
    model: 'LWD.model.snowprofile.stratLayer',
    resourceStore: 'Snowprofile',
    listeners : {
        load : function() {
            console.log(this.resourceStore);
        }
    }
});