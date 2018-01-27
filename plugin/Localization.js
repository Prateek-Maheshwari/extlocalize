/**
 * @Author : Prateek Maheshwari
 * email - prateeknitr41@gmail.com
 * Created Date - 27/01/2018
 * 
 * This plugin is used to support localization in any extjs application.
 * It helps change UI text as per user locale.
 * For example - In a cloud based application, users can be from different countries like India, US, France.
 * It is usually expected that user from particular country/region see content in his/her language.
 *
 *
 * This plugin can localize any component text, even if it is added dynamically as long as component has attribute
 *  extlocalize :"localize"
 *
 *
 * Benefits - 
 * 1. No separate builds for application
 * 2. Application can decide what language to show based on user locale (dictionary has to be loaded for that)
 *
 * dictionary can be loaded from backend server based on user locale.
 *
 * Usage - classic application (same way for modern application)
 * Ext.create('Ext.panel.Panel', {
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
 */

Ext.define('Ext.plugin.Localization', {
	extend: 'Ext.plugin.Abstract',
    alias: 'plugin.localization',
	
	dictionary : {},
    init: function (component) {
		var me = this;
		if(this.isJSONEmpty(me.dictionary)){
			console.log('Dictionary not loaded. Will use default values');
			return;
		}
		component.addListener('afterRender', function(){
			if(me.isJSONEmpty(me.dictionary)){
				console.warn('Dictionary not defined. Skipping localization.');
				return;
			}
			// For Already added items
			var existingElements = component.el.select('[extlocalize="localize"]').elements;
			for(var index in existingElements){
				if(existingElements[index].textContent && me.dictionary[existingElements[index].textContent]){
					var selector = "*:contains('" + existingElements[index].textContent + "')";
					var children = $(existingElements[index]).find(selector).addBack(selector);
					if(children.length > 0)
						children[children.length-1].textContent = me.dictionary[existingElements[index].textContent];
				}
			}
			
			// For items added dynamically - after page load
			var config = {childList : true, subtree: true };
			// Callback function to execute when mutations are observed
			var callback = function(mutationsList) {
				for(var j in mutationsList){
					if(mutationsList[j].addedNodes[0]){
						existingElements = $(mutationsList[j].addedNodes[0]).find('*[extlocalize="localize"]');
						var i = 0;
						while(i < existingElements.length && existingElements[i].textContent &&
							me.dictionary[existingElements[i].textContent]){
							var selector = "*:contains('" + existingElements[i].textContent + "')";
							var children = $(existingElements[i]).find(selector).addBack(selector);
							if(children.length > 0)
								children[children.length - 1].textContent = me.dictionary[existingElements[i].textContent];
							i++;
						}
					}
				}
			};
			var observer = new MutationObserver(callback);

			// Start observing the target node for configured mutations
			observer.observe(component.el.dom, config);
			component.addListener('destroy', function(){
				observer.disconnect();
			}, component);
		});
	},
	
	isJSONEmpty : function(jsonObject){
		if(!jsonObject)
			return true;
		for(var key in jsonObject)
			return false;
		return true;
	}
});