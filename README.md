# Localizing EXT JS Application
 This is ext js plugin to Localize classic/modern application.

## Instructions to use
 Keep the plugin folder in ext js framework directory.
 Load this plugin by adding it to requires.
 
 
  This plugin is used to support localization in any extjs application.
  It helps change UI text as per user locale.
  For example - In a cloud based application, users can be from different countries like India, US, France.
  It is usually expected that user from particular country/region see content in his/her language.
 
 
  This plugin can localize any component text, even if it is added dynamically as long as component has attribute
   extlocalize :"localize"
 
 
  Benefits - 
  1. No separate builds for application
  2. Application can decide what language to show based on user locale (dictionary has to be loaded for that)
 
  dictionary can be loaded from backend server based on user locale.
 
  Usage - classic application (same way for modern application)
  Ext.create('Ext.panel.Panel', {
		plugins: [{
			ptype: 'localization',
			dictionary : {
				'Add Items' : 'आइटम जोड़ें',
				'Remove Items' : 'आइटम हटाएँ'
			}
		}],
		items : [{
			xtype : 'button',
			text : 'Add Items',
			handler : 'someAddHandlerInController',
			scope : 'controller',
			autoEl : {
				extlocalize :"localize"
			}
		},{
			xtype : 'button',
			text : 'Remove Items',
			handler : 'someRemoveHandlerInController',
			scope : 'controller',
			autoEl : {
				extlocalize :"localize"
			}
		}]
   });