function getIconByIndex( widx ){

    var idxs = [
        // cloud
        [ 395, 392, 377, 374, 371, 368, 350, 338, 335, 332, 329, 326, 323, 281, 227 ],
        // thundr
        [ 389, 386, 230, 200 ],
        // rainsmall
        [ 365, 362, 359, 353, 320, 317, 314, 311, 296, 293, 266, 182, 176 ],
        // rain
        [ 356, 308, 305, 302, 299, 284 ],
        // partcloudrain
        [ 293, 263, 185 ],
        // mist
        [ 260, 248, 143 ],
        // cloud
        [ 122, 119 ],
        // partcloud
        [ 116 ],
        // sunny
        [ 113 ]
    ];

    var icons = [
        // cloud
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 10.6933 10.6933)"/><g stroke-linecap="round" stroke-miterlimit="1.5" stroke-width="20.03"><path d="m11.164 51.365h42.177" transform="matrix(-.149763 0 0 -.149763 31.9901 62.2344)"/><path d="m11.164 51.365h42.177" transform="matrix(-.0748814 .129698 -.129698 -.0748814 36.2369 54.205)"/><path d="m11.164 51.365h42.177" transform="matrix(-.0748814 -.129698 .129698 -.0748814 22.9131 62.5712)"/><path d="m11.164 51.365h42.177" transform="matrix(-.149763 0 0 -.149763 42.9901 57.2344)"/><path d="m11.164 51.365h42.177" transform="matrix(-.0748814 .129698 -.129698 -.0748814 47.2369 49.205)"/><path d="m11.164 51.365h42.177" transform="matrix(-.0748814 -.129698 .129698 -.0748814 33.9131 57.5712)"/></g></g></svg>',
        // thunder
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 10.6933 10.6933)"/><g stroke-linecap="round" stroke-miterlimit="1.5"><path d="m11.164 51.365h42.177" stroke-width="7.75" transform="matrix(-.273813 .273813 -.273813 -.273813 55.7522 51.9349)"/><path d="m11.164 51.365h42.177" stroke-width="10.74" transform="matrix(-.197607 .197607 -.197607 -.197607 45.609 60.5141)"/><path d="m11.164 51.365h42.177" stroke-width="20.03" transform="matrix(-.149763 0 0 -.149763 34.9901 60.2344)"/></g></g></svg>',
        // rainsmall
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 10.6933 5.69329)"/><g stroke-linecap="round" stroke-miterlimit="1.5" stroke-width="4.24"><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -.031952 .031952 11.6668 15.1424)"/><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -.031952 .031952 1.6668 15.1424)"/><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -.031952 .031952 -8.3332 15.1424)"/></g></g></svg>',
        // rain
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 10.6933 5.69329)"/><g stroke-linecap="round" stroke-miterlimit="1.5" stroke-width="1.86"><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -1.4497 1.4497 17.7457 9.0635)"/><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -1.4497 1.4497 -2.2543 9.0635)"/><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -1.4497 1.4497 7.7457 9.0635)"/></g></g></svg>',
        // partcloud
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 4.53098 9.08504)"/><g stroke-linecap="round" stroke-miterlimit="1.5"><path d="m17.154 49.205c1.348-2.874 4.269-4.866 7.651-4.866 4.661 0 8.446 3.784 8.446 8.446 0 3.412-2.028 6.354-4.943 7.686" stroke-width="3" transform="translate(17.43987 -30.00207)"/><path d="m44.596 4.288v3.788" stroke-width="3" transform="translate(-2.050397 1.722368)"/><path d="m44.596 4.288v3.788" stroke-width="3" transform="matrix(0 1 -1 0 63.73697 -21.68127)"/><path d="m44.596 4.288v3.788" stroke-width="3" transform="matrix(.707107 .707107 -.707107 .707107 25.99627 -23.60447)"/><path d="m44.596 4.288v3.788" stroke-width="3" transform="matrix(-.707107 .707107 -.707107 -.707107 89.06387 6.36541)"/><path d="m44.596 4.288v3.788" stroke-width="3" transform="matrix(-.707107 .707107 -.707107 -.707107 67.83647 -14.86197)"/><path d="m44.596 4.288v3.788" stroke-width="4.24" transform="matrix(.707107 .707107 -.031952 .031952 4.6668 21.1424)"/><path d="m44.596 4.288v3.788" stroke-width="4.24" transform="matrix(.707107 .707107 -.031952 .031952 -5.3332 21.1424)"/><path d="m44.596 4.288v3.788" stroke-width="4.24" transform="matrix(.707107 .707107 -.031952 .031952 -15.3332 21.1424)"/></g></g></svg>',
        // mist
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 10.6933 10.6933)"/><g stroke-linecap="round" stroke-miterlimit="1.5"><path d="m11.164 51.365h42.177" stroke-width="6.33" transform="matrix(.474272 0 0 .474272 9.84931 33.0038)"/><path d="m11.164 51.365h42.177" stroke-width="12.56" transform="matrix(.238838 0 0 .238838 37.1739 45.0968)"/><path d="m11.164 51.365h42.177" stroke-width="4.73" transform="matrix(.63457 0 0 .63457 11.7167 19.2789)"/></g></g></svg>',
        // cloud
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" fill="none" stroke="#000" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 10.6933 10.6933)"/></svg>',
        // partcloud
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 4.53098 9.08504)"/><g stroke-linecap="round" stroke-miterlimit="1.5" stroke-width="3"><path d="m17.154 49.205c1.348-2.874 4.269-4.866 7.651-4.866 4.661 0 8.446 3.784 8.446 8.446 0 3.412-2.028 6.354-4.943 7.686" transform="translate(17.43987 -30.00207)"/><path d="m44.596 4.288v3.788" transform="translate(-2.050397 1.722368)"/><path d="m44.596 4.288v3.788" transform="matrix(0 1 -1 0 63.73697 -21.68127)"/><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -.707107 .707107 25.99627 -23.60447)"/><path d="m44.596 4.288v3.788" transform="matrix(-.707107 .707107 -.707107 -.707107 89.06387 6.36541)"/><path d="m44.596 4.288v3.788" transform="matrix(-.707107 .707107 -.707107 -.707107 67.83647 -14.86197)"/></g></g></svg>',
        // sunny
        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000" stroke-width="3"><circle cx="31.6998" cy="31.8687" r="8.446"/><path d="m44.596 4.288v3.788" transform="translate(-12.595467 10.808138)"/><path d="m44.596 4.288v3.788" transform="translate(-12.595467 40.8281)"/><path d="m44.596 4.288v3.788" transform="matrix(0 1 -1 0 53.1919 -12.5955)"/><path d="m44.596 4.288v3.788" transform="matrix(0 1 -1 0 23.1719 -12.5955)"/><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -.707107 .707107 15.4512 -14.5187)"/><path d="m44.596 4.288v3.788" transform="matrix(.707107 .707107 -.707107 .707107 -5.77616 6.70866)"/><path d="m44.596 4.288v3.788" transform="matrix(-.707107 .707107 -.707107 -.707107 78.5188 15.45118)"/><path d="m44.596 4.288v3.788" transform="matrix(-.707107 .707107 -.707107 -.707107 57.2914 -5.7762)"/></g></svg>'
    ];

    var pos = 0;
    for(var idx in idxs){
        if(-1 != idxs[idx].indexOf(widx)){
            pos = idx;
            break;
        }
    };
    
    // console.log(widx, pos);
    return icons[pos];
}

function consumeWheatherService(qry, rid){;

    var url = '';
        url+= '/?rest_route=/multiyc/wheather';
        url+= '/'+qry;
    
    var req = new XMLHttpRequest();
        req.responseType = 'text';
        req.addEventListener('load', ()=> {
    
            if(200 != req.status){
                console.log(req.status);
                return;
            }

            var json = JSON.parse(req.responseText);
            if(null == json){
                console.log('no JSON:', req.responseText);
                return;
            }

            if('false' == json.success || false == json.success){
                console.log('no result:', req.responseText);
                return;
            }
            
            var temperature = json.current.temperature;
            var wind_speed = json.current.wind_speed;
            var wind_dir = json.current.wind_dir;
            var name = json.location.name;
            var country = json.location.country;
            var weather_code = parseInt(json.current.weather_code);
            var snowIcon = getIconByIndex(weather_code);

            document.getElementById('location:' +rid).innerHTML = name +', ' +country;
            document.getElementById('temperature:' +rid).innerHTML = temperature;
            document.getElementById('wind_speed:' +rid).innerHTML = wind_speed;
            document.getElementById('wind_dir:' +rid).innerHTML = wind_dir;
            
            document.getElementById('weather_icon:' +rid).innerHTML = snowIcon;
        });
    
    req.open('GET', url);
    req.send();
};
