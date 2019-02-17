function MapTypeControl(controlDiv, map) {
    // control border
    var controlUI = document.createElement('div');
    controlUI.style.border = '3px solid #fff';
    controlUI.style.cursor = 'pointer';
    controlUI.style.width = '80px';
    controlUI.style.marginLeft = '20px';
    controlUI.title = 'Satellite';
    controlDiv.appendChild(controlUI);

    // control interior
    var controlPic = document.createElement('img');
    controlPic.src = '/images/map-satelit.jpg';
    controlPic.style.width = '100%';
    controlPic.style.margin = '0px';
    controlUI.appendChild(controlPic);

    // event
    controlUI.addEventListener('click', function() {
        var mt = map.getMapTypeId();
        if (mt == 'roadmap') {
            controlUI.title = 'Street map';
            controlPic.src = '/images/map-street.jpg';  
            map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        }
        else if (mt == 'satellite') {
            controlUI.title = 'Satellite map';
            controlPic.src = '/images/map-satelit.jpg';  
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        };
    });
}


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
        clickable: true,        
    });
    
    return myMarker;
} 


// show google map for location
function initMap() {
    
    var vilaSelena = {lat: 46.056812, lng: 14.503735};
//    var mapCenter = {lat: 46.055, lng: 14.507};
    var mapCenter = vilaSelena;
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center:  mapCenter,
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: false,
        styles: [
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}],
            },
            {
                featureType: 'poi.park',
                stylers: [{visibility: 'on'}],
            }
        ],
    });

    var mSelena = setMarker('Vila Selena', 50, vilaSelena, map);
    
    var c10m = new google.maps.Circle({
        strokeColor: '#783226',  
        strokeOpacity: 1.0,
        strokeWeight: 1,
        fillColor: '#783226',
        fillOpacity: 0.0,
        map: map,
        center:  vilaSelena,
        radius: 666,
        clickable: false,
    });
    var m10m = new google.maps.Marker({
        position: {lat: 46.0506, lng: 14.5036},
        map: map,
        label: {
            color: '#783226',
            fontFamily: 'Palanquin, sans-serif',
            fontSize: '18px',
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

    var mBusRail = setMarker('Avtobusna in železniška postaja', 130, {lat: 46.058525, lng: 14.511328}, map); 
    var mTivoli = setMarker('Park Tivoli', 50, {lat: 46.056134, lng: 14.496694}, map);
    var mTromost = setMarker('Tromostovje', 60, {lat: 46.051016, lng: 14.506297}, map);
    var mZmaj = setMarker('Zmajski most', 60, {lat: 46.052098, lng: 14.510292}, map);
    var mGrad = setMarker('Ljubljanski grad', 70, {lat: 46.048919, lng: 14.508608}, map);

    // to airpport 
    var mAirpLine = new google.maps.Polyline({
        path: [{lat: 46.058994, lng: 14.498985}, {lat: 46.061689, lng: 14.496013}], 
        strokeColor: '#783226',
        strokeOpacity: 1.0,
        strokeWeight: 4,
        icons: [{
          icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
          offset: '100%'
        }],
        map: map,
    });
    var mAirp22 = setMarker('Letališče Jožeta Pučnika (22km)', 130, {lat: 46.058994, lng: 14.498985}, map); 
    var mAirport = setMarker('Letališče Jožeta Pučnika', 110, {lat: 46.233116, lng: 14.453966}, map);

    // click actions
    var mZoom = 15; // zoom to hide/show markers
    map.addListener('zoom_changed', function() {
        var z = map.getZoom();
        if (z < mZoom) {
            mBusRail.setVisible(false);
            mTromost.setVisible(false);
            mTivoli.setVisible(false);
            mZmaj.setVisible(false);
            mGrad.setVisible(false);
            mAirpLine.setVisible(false);
            mAirp22.setVisible(false);
        }
        else {
            mBusRail.setVisible(true);
            mTromost.setVisible(true);
            mTivoli.setVisible(true);
            mZmaj.setVisible(true);
            mGrad.setVisible(true);
            mAirpLine.setVisible(true);
            mAirp22.setVisible(true);
        }
        
        if (z < mZoom-1) {
            c10m.setVisible(false);
            m10m.setVisible(false);
        }
        else {
            c10m.setVisible(true);
            m10m.setVisible(true);
        }
    });
    
    mSelena.addListener('click', function() {
        var z = map.getZoom();
        if (z < mZoom-1) {
            map.setZoom(15);
            map.setCenter(mapCenter);
        }
        else
        {
            map.setZoom(z+1);
            map.setCenter(vilaSelena);
        }
    });
    
    mAirp22.addListener('click', function() {
        map.setZoom(11);
        map.setCenter({lat: 46.142, lng: 14.503});
    });

    // open new info window for markers
    mAirport.addListener('click', function() {
        var cLink = 'https://www.fraport-slovenija.si/sl/Main';
        window.open(cLink, "_blank");
    });

    mBusRail.addListener('click', function() {
        var cLink = 'https://www.ap-ljubljana.si/';
        window.open(cLink, "_blank");
    });
 
    mTivoli.addListener('click', function() {
        var cLink = 'https://www.visitljubljana.com/sl/obiskovalci/aktivnosti/zabava/park-tivoli/';
        window.open(cLink, "_blank");
    });

    mTromost.addListener('click', function() {
        var cLink = 'https://www.visitljubljana.com/sl/obiskovalci/aktivnosti/znamenitosti/tromostovje/';
        window.open(cLink, "_blank");
    });

    mZmaj.addListener('click', function() {
        var cLink = 'https://www.visitljubljana.com/sl/obiskovalci/aktivnosti/znamenitosti/zmajski-most/';
        window.open(cLink, "_blank");
    });

    mGrad.addListener('click', function() {
        var cLink = 'https://www.ljubljanskigrad.si/sl/ljubljanski-grad/';
        window.open(cLink, "_blank");
    });


    // map type control
    var mtControlDiv = document.createElement('div');
    var mtControl = new MapTypeControl(mtControlDiv, map);
    mtControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(mtControlDiv);
    
} // initMap

google.maps.event.addDomListener(window, 'load', initMap);
