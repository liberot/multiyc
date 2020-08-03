function consumeWheatherService(qry, rid){;

    var snowIdxs = [ 395, 392, 377, 374, 371, 368, 350, 338, 335, 332, 329, 326, 323, 281, 227 ];
    var snowIcon = '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000"><path d="m38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z" stroke-width="3.38" transform="matrix(.887779 0 0 .887779 10.6933 10.6933)"/><g stroke-linecap="round" stroke-miterlimit="1.5" stroke-width="20.03"><path d="m11.164 51.365h42.177" transform="matrix(-.149763 0 0 -.149763 31.9901 62.2344)"/><path d="m11.164 51.365h42.177" transform="matrix(-.0748814 .129698 -.129698 -.0748814 36.2369 54.205)"/><path d="m11.164 51.365h42.177" transform="matrix(-.0748814 -.129698 .129698 -.0748814 22.9131 62.5712)"/><path d="m11.164 51.365h42.177" transform="matrix(-.149763 0 0 -.149763 42.9901 57.2344)"/><path d="m11.164 51.365h42.177" transform="matrix(-.0748814 .129698 -.129698 -.0748814 47.2369 49.205)"/><path d="m11.164 51.365h42.177" transform="matrix(-.0748814 -.129698 .129698 -.0748814 33.9131 57.5712)"/></g></g></svg>';

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
            // var weather_icon = json.current.weather_icons[0];
            
            document.getElementById('location:' +rid).innerHTML = name +', ' +country;
            document.getElementById('temperature:' +rid).innerHTML = temperature;
            document.getElementById('wind_speed:' +rid).innerHTML = wind_speed;
            document.getElementById('wind_dir:' +rid).innerHTML = wind_dir;
            // document.getElementById('weather_icon:' +rid).src = weather_icon;

            document.getElementById('weather_icon:' +rid).innerHTML = snowIcon;
        });
    
    req.open('GET', url);
    req.send();
};
