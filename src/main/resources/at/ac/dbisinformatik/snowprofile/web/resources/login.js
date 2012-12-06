Ext.onReady(function(){
    Ext.QuickTips.init();
 
	// Create a variable to hold our EXT Form Panel. 
	// Assign various config options as seen.	 
    var login = new Ext.FormPanel({ 
        labelWidth:80,
        frame:true, 
        title:'Bitte anmelden', 
        defaultType:'textfield',
	monitorValid:true,
	// Specific attributes for the text fields for username / password. 
	// The "name" attribute defines the name of variables sent to the server.
        items:[{ 
                fieldLabel:'Benutzername', 
                name:'loginUsername', 
                allowBlank:false 
            },{ 
                fieldLabel:'Passwort', 
                name:'loginPassword', 
                inputType:'password', 
                allowBlank:false 
            }],
 
	// All the magic happens after the user clicks the button     
        buttons:[{ 
                text:'Login',
                formBind: true,	 
                // Function that fires when user clicks the button 
                handler:function(){ 
                    login.getForm().submit({ 
                    	type: 'rest',
                        method:'GET', 
                        url: '/lwd/user/'+login.getForm().getFieldValues().loginUsername+'/'+login.getForm().getFieldValues().loginPassword,
                        waitTitle:'Connecting', 
                        waitMsg:'Sending data...',
 
                        success:function(){ 
	                        var redirect = '/lwd/static/1.0.0.0/singlepage.html'; 
	                        window.location = redirect;
                        },
 
			// Failure function, see comment above re: success and failure. 
			// You can see here, if login fails, it throws a messagebox
			// at the user telling him / her as much.  
 
                        failure:function(form, action){ 
                            if(action.failureType == 'server'){ 
                                obj = Ext.util.JSON.decode(action.response.responseText); 
                                Ext.Msg.alert('Login Failed!', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText); 
                            } 
                            login.getForm().reset(); 
                        } 
                    }); 
                } 
            }] 
    });
 
 
	// This just creates a window to wrap the login form. 
	// The login object is passed to the items collection.       
    var win = new Ext.Window({
        layout:'fit',
        width:300,
        height:150,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        items: [login]
	});
	win.show();
});