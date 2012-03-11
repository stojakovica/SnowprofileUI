Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', './ext-4.0/examples/ux');
Ext.require([
    'Ext.ux.GMapPanel'
]);

Ext.define('LWD.view.googlemaps.Map', {
	extend: 'Ext.form.Panel',
	alias: 'widget.googlemaps',
	
	title: 'Google Maps',
	
	
	initComponent: function() {
        this.items = [
            {
            	xtype: 'gmappanel',
                zoomLevel: 14,
                gmapType: 'map',
                mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
                setCenter: {
                    geoCodeAddr: 'Technikerstraße 15, Innsbruck, Austria',
                    marker: {title: 'Technische Universität Innsbruck'}
                },
                markers: [{
                    lat: 47.263068,
                    lng: 11.384271,
                    marker: {title: 'Universität Innsbruck'},
                    listeners: {
                        click: function(e){
                            Ext.Msg.alert({title: 'Its fine', text: 'and its art.'});
                        }
                    }
                }]
            }
        ];

        this.callParent(arguments);
    }
});