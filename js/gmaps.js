function setMarker(text, width, position, map) {
    const h = 40;
    const r = 12;
    const m = h/2 + r - 5;
    
    var myIcon = {
//        path: 'M 0,0 L 0,-10 L -60,-10 L -60,-50 L 60,-50 L 60,-10 L 10,-10 z',
//        path: 'M 0,0 L 0,-10 L -'+width+',-10 L -'+width+',-50 L '+width+',-50 L '+width+',-10 L 10,-10 z',
        path: 'M 0,0 L 0,-'+r+' L -'+width+',-'+r+' L -'+width+',-'+h+' L '+width+',-'+h+' L '+width+',-'+r+' L '+r+',-'+r+' z',
        scale: 1,
        fillColor: '#C5A46D',
        fillOpacity: 0.5,
        strokeColor: '#C5A46D',
        strokeWeight: 2,
        labelOrigin: new google.maps.Point(0,-m),
    };

    var myLabel = {
        color: '#004F46',
        fontFamily: 'Palanquin, sans-serif',
        fontSize: '18px',
        fontWeight: 'bold',
        text: text,
    };

    var myMarker = new google.maps.Marker({
        position: position,
        map: map,
        label: myLabel,
        icon: myIcon,
    });
    
    return myMarker;
} 


// show google map for location
function initMap() {

    var mapCenter = {lat: 46.055, lng: 14.507};
    var map = new google.maps.Map(document.getElementById('map'), {
        center:  mapCenter,
        zoom: 16,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: false,
        styles: [{
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            }],
    });
    
    var vilaSelena = {lat: 46.056812, lng: 14.503735};
    var selenaMarker = setMarker('Vila Selena', 50, vilaSelena, map);
    var circle10m = new google.maps.Circle({
        strokeColor: '#783226',  
        strokeOpacity: 0.7,
        strokeWeight: 1,
        fillColor: '#783226',
        fillOpacity: 0.0,
        map: map,
        center:  vilaSelena,
        radius: 666,
        clickable: false,
    });
    
    var vilaSelena10m = {lat: 46.0507, lng: 14.5039};
    var marker10m = new google.maps.Marker({
        position: vilaSelena10m,
        map: map,
        label: {
            color: '#783226',
            fontFamily: 'Palanquin, sans-serif',
            fontSize: '16px',
            fontWeight: 'bold',
            text: '10 min hoje',
        },
        icon: {
            path: 'M 0,0',
            scale: 1,
            fillOpacity: 0.0,
            strokeWeight: 0.0,
        },
        clickable: false,
    });

    setMarker('Železniška postaja', 80, {lat: 46.058555, lng: 14.516291}, map);
    setMarker('Park Tivoli', 50, {lat: 46.056134, lng: 14.496694}, map);
    setMarker('Prešernov trg', 60, {lat: 46.051242, lng: 14.506014}, map);
    setMarker('Zmajski most', 60, {lat: 46.052098, lng: 14.510292}, map);
    setMarker('Ljubljanski grad', 70, {lat: 46.048919, lng: 14.508608}, map);

    // to airpport 
    var line = new google.maps.Polyline({
        path: [{lat: 46.057499, lng: 14.500498}, {lat: 46.059435, lng: 14.498535}],
        strokeColor: '#783226',
        icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '100%'
        }],
        map: map,
    });
    setMarker('Letališče Jožeta Pučnika (22km)', 130, {lat: 46.058103, lng: 14.499892}, map);

} // initMap

google.maps.event.addDomListener(window, 'load', initMap);
