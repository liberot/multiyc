( function( blocks, element, editor ) {
    // https://developer.wordpress.org/block-editor/packages/packages-blocks/
    var el = element.createElement;
    var textEdit = editor.RichText;

    var buildClientComponent = function( props ){

        if(null == props.rid){
            props.rid = "wres"; 
            props.rid+= "_"+parseInt(Math.random() *1000000);
            props.rid+= "_"+parseInt(Math.random() *1000000);
        }
        
        var js = '';
            js+= 'consumeWheatherService("'+props.location+'", "'+props.rid+'");';
        
        return el( 
            'div', {
                loc: props.location,
                rid: props.rid,
                service: props.service,
                class: 'multiyc-wheather-client-div'
            },
            el( 'div', { id: props.rid }, props.location ),
            el( 'script', { type: 'text/javascript' }, js )
        );
    }
 
    blocks.registerBlockType( 'multiyc/wheather', {

        title: 'MultiYC Wheatherizer', 
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

            var children = [];
                children.push(
                    el ( 'div', { class: 'multiyc-title' }, 'MultiYC Wheatherizer' )
                );
        
            var setLocation = function( event ) {
                // console.log(event.target.value); return;
                // var selected = event.target.querySelector( 'option:checked' );
                // props.setAttributes( { location: selected.value } );
                var val = event.target.value;
                if('' == val){
                    return;
                }
                props.setAttributes( { location: val } );
                event.preventDefault();
            }

            /*
            var setService = function( event ) {
                var selected = event.target.querySelector( 'option:checked' );
                props.setAttributes( { service: selected.value } );
                event.preventDefault();
            }
            */

            if ( props.attributes.location ) {
                children.push( 
                    buildClientComponent( 
                        { location: props.attributes.location },
                        { rid: props.attributes.rid },
                        { service: props.attributes.service }
                    )
                );
            }
 
            children.push(
                el ( 'input', { type: 'text', placeholder: props.attributes.location, onChange: setLocation } )
            );

            children.push(
                el( 'select', { value: props.attributes.location, onChange: setLocation },
                    el( 'option', null, ' -- Example Locations -- ' ),
                    el( 'option', { value: 'New York' }, 'New York' ),
                    el( 'option', { value: 'Chicago' }, 'Chicago' ),
                    el( 'option', { value: 'Munich' }, 'Munich' ),
                    el( 'option', { value: 'Santa Clara' }, 'Santa Clara' ),
                    el( 'option', { value: 'Timmendorfer Strand' }, 'Timmendorfer Strand' )
                )
            );

            return el( 'form', { class: 'multiyc-wheather-editor-form' }, children );
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
    window.wp.blockEditor
);