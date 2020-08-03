( function( blocks, element, editor, i18n ) {
    
    // https://developer.wordpress.org/block-editor/packages/packages-blocks/
    var el = element.createElement;
    var textEdit = editor.RichText;
    var __ = i18n.__;

    var buildClientComponent = function( props ){

        if(null == props.rid){
            props.rid = 'wres'; 
            props.rid+= '_'+parseInt(Math.random() *1000000);
            props.rid+= '_'+parseInt(Math.random() *1000000);
        }
        
        var js = '';
            js+= 'consumeWheatherService("'+props.location+'", "'+props.rid+'");';
        
        return el( 
            'div', {
                loc: props.location,
                rid: props.rid,
                service: props.service,
                class: 'multiyc-wheather-client-div '+props.rid
            },
            el( 'div', { id: 'location:' +props.rid, class: 'location' }, props.location ),
            el( 'div', { id: 'temperature:' +props.rid, class: 'temperature' } ),
            el( 'div', { id: 'wind_speed:' +props.rid, class: 'wind-speed' } ),
            el( 'div', { id: 'wind_dir:' +props.rid, class: 'wind-dir' } ),
            el( 'script', { type: 'text/javascript' }, js )
        );
    }
 
    blocks.registerBlockType( 'multiyc/wheather', {

        title: __('MultiYC Wheatherizer'), 
        icon: 'format-image',
        category: 'widgets',
 
        attributes: {
            
            location: {
                type: 'string',
                source: 'attribute',
                attribute: 'loc',
                selector: 'div',
            },
            
            service: {
                type: 'string',
                source: 'attribute',
                attribute: 'service',
                selector: 'div',
            },
            
            rid: {
                type: 'string',
                source: 'attribute',
                attribute: 'rid',
                selector: 'div',
            }
        },

        edit: function( props ) {
            
            if(null == props.attributes.location){
                props.attributes.location = 'Location';
            };

            var node = [];
                node.push(
                    el ( 'div', { class: 'multiyc-title' }, __('MultiYC Wheatherizer') )
                );
        
            var setLocation = function( event ) {
                // var selected = event.target.querySelector( 'option:checked' );
                // props.setAttributes( { location: selected.value } );
                var val = event.target.value;
                if('' == val){
                    return;
                }
                props.setAttributes( { location: val } );
                event.preventDefault();
            }

            if( props.attributes.location ) {
                node.push( 
                    buildClientComponent( 
                        { location: props.attributes.location },
                        { rid: props.attributes.rid },
                        { service: props.attributes.service }
                    )
                );
            }
 
            node.push(
                el( 'input', { type: 'text', placeholder: props.attributes.location, onChange: setLocation } )
            );

            node.push(
                el( 'select', { value: props.attributes.location, onChange: setLocation },
                    el( 'option', null, __(' -- Example Locations -- ') ),
                    el( 'option', { value: __('New York') }, 'New York' ),
                    el( 'option', { value: __('Chicago') }, 'Chicago' ),
                    el( 'option', { value: __('Munich') }, 'Munich' ),
                    el( 'option', { value: __('Santa Clara') }, 'Santa Clara' ),
                    el( 'option', { value: __('Brooklyn Los Angeles') }, 'Brooklyn Los Angeles' ),
                    el( 'option', { value: __('Hollywood Miami') }, 'Hollywood Miami' )
                )
            );

            return el( 'form', { class: 'multiyc-wheather-editor-form' }, node );
        },
 
        save: function( props ) {
            
            return buildClientComponent( 
                { 
                    location: props.attributes.location,
                    rid: props.attributes.rid,
                    service: props.attributes.service
                } 
            );
        }
    })
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor,
    window.wp.i18n
);