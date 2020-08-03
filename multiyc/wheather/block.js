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
        
        /*
        var js = '';
            js+= 'var rid="' +props.rid +'";';
            js+= 'var qry="";';
            js+= 'qry+="' +props.location +'";';
            js+= 'var url="";';
            js+= 'url+="/?rest_route=/multiyc/wheather";';
            js+= 'url+= "/"+qry;';
            js+= 'var req = new XMLHttpRequest();';
            js+= 'req.addEventListener("load", ()=> {';   
            js+= 'var json = JSON.parse(req.responseText);';
            js+= 'var temperature = json.current.temperature;';
            js+= 'var wind_speed = json.current.wind_speed;';
            js+= 'var wind_dir = json.current.wind_dir;';
            js+= 'var name = json.location.name;';
            js+= 'var region = json.location.region;';
            js+= 'document.getElementById("location:" +rid).innerHTML = name +", " +region;';
            js+= 'document.getElementById("temperature:" +rid).innerHTML = temperature;';
            js+= 'document.getElementById("wind_speed:" +rid).innerHTML = wind_speed;';
            js+= 'document.getElementById("wind_dir:" +rid).innerHTML = wind_dir;';
            js+= '});';
            js+= 'req.open("GET", url);';
            js+= 'req.send();';
        */
            
        return el( 
            
            'div', {
                id: props.rid,
                rid: props.rid,
                loc: props.location,
                service: props.service,
                class: 'multiyc-wheather-client-div'
            },

            el( 'div', { id: 'location:' +props.rid, class: 'location' }, props.location ),
            
            el( 'div', { class: 'temperatur-title' }, __('Temperature:') ),
            el( 'div', { id: 'temperature:' +props.rid, class: 'temperature' } ),
            
            el( 'div', { class: 'windspeed-title' }, __('Speed:') ),
            el( 'div', { id: 'wind_speed:' +props.rid, class: 'wind-speed' } ),
            
            el( 'div', { class: 'winddir-title' }, __('Direction:') ),
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