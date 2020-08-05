( function( blocks, element, i18n ) {
    
    // https://developer.wordpress.org/block-editor/packages/packages-blocks/
    var el = element.createElement;
    var __ = i18n.__;

    var buildClientView = function(model){

        if(null == model.attributes.id){
            model.attributes.id = 'wres'; 
            model.attributes.id+= '_'+parseInt(Math.random() *1000000);
            model.attributes.id+= '_'+parseInt(Math.random() *1000000);
            model.attributes.id+= '_'+parseInt(Math.random() *1000000);
        }
        
        var script = '';
            script+= 'MultiYC.consumeWeatherService("'+model.attributes.location+'", "'+model.attributes.id+'");';
        
        return el( 
        
            'div', {                
                id: model.attributes.id,
                loc: model.attributes.location
            },

            el( 'script', { type: 'text/javascript' }, script )
        );
    }
 
    blocks.registerBlockType('multiyc/weather', {

        title: __('MutliYC Wetterwidget'), 

        icon: 'format-image',
        category: 'widgets',
 
        attributes: {
            
            id: {
                selector: 'div',
                attribute: 'id',
                source: 'attribute',
                type: 'string'
            },

            location: {
                selector: 'div',
                attribute: 'loc',
                type: 'string',
                source: 'attribute'
            }
        },

        edit: function(model) {

            var setLocation = function(event) {
                // model.attributes.location = event.target.value;
                model.setAttributes({ location: event.target.value });
                event.preventDefault();
            }

            var node = [];
        
                node.push(
                    el ( 'div', { class: 'multiyc-title' }, __('MutliYC Wetterwidget') ),
                    el ( 'div', { class: 'multiyc-description' }, __('Ort eingeben und Seite speichern (Aktualisieren)') )
                );
        
                node.push( 
                    buildClientView(model)
                );
           
                node.push(
                    el( 'input', { type: 'text', placeholder: model.attributes.location, onChange: setLocation } )
                );

            return el( 'form', { class: 'multiyc-weather-editor-form' }, node );
        },
 
        save: function(model) {
            return buildClientView(model);
        }
    })
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.i18n
);