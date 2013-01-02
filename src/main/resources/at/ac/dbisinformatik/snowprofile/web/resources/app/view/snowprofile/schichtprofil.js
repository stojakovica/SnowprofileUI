var renderValue = function(datastore) {
    return function(value, metaData, record, rowIndex, colIndex, store, view) {
        var rec = datastore.findRecord('value', value);
        return rec ? rec.get('display') : value;
    };
};

var humidityDatastore = Ext.create('Ext.data.Store', {
    fields: ['value', 'display'],
    data: [
        {value: "D", display: "trocken"},
        {value: "M", display: "schwach feucht"},
        {value: "W", display: "feucht"},
        {value: "V", display: "nass"},
        {value: "S", display: "sehr nass"}
    ]
});

var grainFormStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'display'],
    data: [
        {value: "PP", display: "Neuschnee"},
        {value: "DF", display: "filziger Schnee"},
        {value: "RG", display: "rundkörniger Schnee"},
        {value: "FC", display: "kantigkörniger Schnee"},
        {value: "DH", display: "Tiefenreif, Schwimmschnee"},
        {value: "SH", display: "Oberflächenreif"},
        {value: "MF", display: "Schmelzform"},
        {value: "IF", display: "Eislamelle"},
        {value: "FCxr", display: "kantig, abgerundete Kristalle"},
        {value: "PPgp", display: "Graupel"},
        {value: "MFcr", display: "Schmelzkruste"}
    ]
});

var hardnessStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'display'],
    data: [
        {value: "F", display: "1: <b>Faust</b> [FA] sehr weich"},
        {value: "F-4F", display: "1–2: FA–4F"},
        {value: "4F", display: "2: <b>4 Finger</b> [4F] weich"},
        {value: "4F-1F", display: "2–3: 4F–1F"},
        {value: "1F", display: "3: <b>1 Finger</b> [1F] mittelhart"},
        {value: "1F-P", display: "3–4: 1F–B"},
        {value: "P", display: "4: <b>Bleistift</b> [B] hart"},
        {value: "P-K", display: "4–5: B–M"},
        {value: "K", display: "5: <b>Messer</b> [M] sehr hart"},
        {value: "I", display: "6: <b>Eis</b> [–] kompakt"}
    ]
});

Ext.define('LWD.view.snowprofile.schichtprofil' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.schichtprofil',
    itemId: 'schichtprofilGrid',
    store: 'Schichtprofil',

    border: false,

    selType: 'rowmodel',

    tbar: [{
        text: 'Neue Schicht',
        handler: function(){
            var grid = this.up("grid");
            var rowEditing = grid.getPlugin("rowplugin");
            grid.getStore().insert(0, new LWD.model.LayerProfile());
            rowEditing.startEdit(0, 0);
        }
    }, '-', {
        itemId: 'delete',
        text: 'Löschen',
        handler: function(){
            var grid = this.up("grid");
            var selection = grid.getView().getSelectionModel().getSelection()[0];
            if (selection) {
                grid.getStore().remove(selection);
                grid.getStore().fireEvent("dataupdate", grid.getStore());
            }
        }
    }],
    plugins:[Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2,
        pluginId:'rowplugin'
    })],

    columns: [
        {
            header: '<b>[H]</b><br>Oberkante [cm]',
            id: 'depthTop_content',
            dataIndex: 'depthTop_content',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            }
        },
        {
            header: '<b>[Θ]</b><br>Feuchte',
            dataIndex: 'lwc_content',
            renderer: renderValue(humidityDatastore),
            flex: 1,
            field: {
                xtype: 'combobox',
                editable: false,
                matchFieldWidth: false,
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: humidityDatastore,
                valueField: 'value',
                displayField: 'display',
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
        },
        {
            header: '<b>[F<sup>1</sup>]</b><br>Kornform 1',
            sortable: false,
            dataIndex: 'grainFormPrimary',
            renderer: renderValue(grainFormStore),
            flex: 1,
            typeAhead: true,
            field: {
                xtype: 'combobox',
                editable: false,
                matchFieldWidth: false,
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: grainFormStore,
                valueField: 'value',
                displayField: 'display',
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
        },
        {
            header: '<b>[F<sup>2</sup>]</b><br>Kornform 2',
            dataIndex: 'grainFormSecondary',
            renderer: renderValue(grainFormStore),
            flex: 1,
            field: {
                xtype: 'combobox',
                editable: false,
                matchFieldWidth: false,
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: grainFormStore,
                valueField: 'value',
                displayField: 'display',
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
        },
        {
            header: '<b>[D–]</b><br>min. Größe [mm]',
            dataIndex: 'grainSize_Components_avg',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            }
        },
        {
            header: '<b>[–D]</b><br>max. Größe [mm]',
            dataIndex: 'grainSize_Components_avgMax',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0
            }
        },


        {
            header: '<b>[K]</b><br>Härte',
            dataIndex: 'hardness',
            renderer: renderValue(hardnessStore),
            flex: 1,
            field: {
                xtype: 'combobox',
                editable: false,
                matchFieldWidth: false,
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: hardnessStore,
                valueField: 'value',
                displayField: 'display',
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
        }
    ],

    initComponent: function() {
        this.on('edit', this.commit);
        this.callParent(arguments);
    },

    commit: function(edit, e) {
        this.getStore().fireEvent("dataupdate", this.getStore());
    }
});
