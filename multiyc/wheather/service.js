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
            var weather_icon = json.current.weather_icons[0];
            
            document.getElementById('location:' +rid).innerHTML = name +', ' +country;
            document.getElementById('temperature:' +rid).innerHTML = temperature;
            document.getElementById('wind_speed:' +rid).innerHTML = wind_speed;
            document.getElementById('wind_dir:' +rid).innerHTML = wind_dir;
            document.getElementById('weather_icon:' +rid).src = weather_icon;
        });
    
    req.open('GET', url);
    req.send();
};
