function initMap() {

    // control to toggle streen vs satelite
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

    const height = 30;
    const repy = 15;
    const repx = -10;
    const repd = 30;
    
    // path for pointer
    function pathPointer(width) {
        const w = width / 2;
        const h = height / 2;
        const r = repy / 2;

        var p = '';
        p += 'M -' +r+   ',-' +h+   ' ';
        p += 'l -' +7*r+ ',-' +8*r+ ' ';
        p += 'l -' +r+   ',+' +r+   ' ';
        p += 'l  ' +0+   ',-' +3*r+ ' ';
        p += 'l +' +3*r+ ', ' +0+   ' ';
        p += 'l -' +r+   ',+' +r+   ' ';
        p += 'L +' +r+   ',-' +h+   ' ';
        p += 'L +' +w+   ',-' +h+   ' ';
        p += 'L +' +w+   ',+' +h+   ' ';
        p += 'L -' +w+   ',+' +h+   ' ';
        p += 'L -' +w+   ',-' +h+   ' ';
        p += 'z';

        return p;
    }

    // path for marker
    function pathMarker(width) {
        const w = width / 2;
        const r = repy;
        const h = height + repy;

        var p = '';
        p += 'M  ' +0+   ', ' +0+   ' ';
        p += 'L  ' +0+   ',-' +r+   ' ';
        p += 'L -' +w+   ',-' +r+   ' ';
        p += 'L -' +w+   ',-' +h+   ' ';
        p += 'L +' +w+   ',-' +h+   ' ';
        p += 'L +' +w+   ',-' +r+   ' ';
        p += 'L +' +r+   ',-' +r+   ' ';
        p += 'z';

        return p;
    }

    // another path for marker
    function pathMarker2(width) {
        const x = 0;
        const y = 0;
        const w2 = width / 2;
        const h = -height;
        const rh = -h;
        const rx = repx;
        const ry = -repy;
        const rd = repd;
        
        const t0 = {x:rx, y:0};
        const t1 = {x:0, y:ry};
        const t2 = {x:rd, y:ry};
        const t3 = {x:w2, y:ry};
        const t4 = {x:w2+rh, y:ry};
        const t5 = {x:w2+rh, y:ry+h};
        const t6 = {x:w2, y:ry+h};

        var p = '';
        p += 'M '+ (+t0.x) +' '+ (+t0.y) +' ';
        p += 'C '+ (-t1.x) +' '+ (+t1.y) +' '+ (-t2.x) +' '+ (+t2.y) +' '+ (-t3.x) +' '+ (+t3.y) +' ';
        p += 'C '+ (-t4.x) +' '+ (+t4.y) +' '+ (-t5.x) +' '+ (+t5.y) +' '+ (-t6.x) +' '+ (+t6.y) +' ';
        p += 'L '+ (-t6.x) +' '+ (+t6.y) +' '+ (+t6.x) +' '+ (+t6.y) +' ';
        p += 'C '+ (+t5.x) +' '+ (+t5.y) +' '+ (+t4.x) +' '+ (+t4.y) +' '+ (+t3.x) +' '+ (+t3.y) +' ';
        p += 'C '+ (+t2.x) +' '+ (+t2.y) +' '+ (+t1.x) +' '+ (+t1.y) +' '+ (+t0.x) +' '+ (+t0.y) +' ';
        return p;
    }

    // icon common 
    var myIcon = {
        scale: 1,
        fillColor: '#C5A46D',
        fillOpacity: 0.5,
        strokeColor: '#C5A46D',
        strokeWeight: 2,
    };

    // label common 
    var myLabel = {
        color: '#004F46',
        fontFamily: 'Palanquin, sans-serif',
        fontSize: '18px',
        fontWeight: 'bold',
    };

    // create pointer
    function setPointer(text, width, position, map) {

        var pIcon = myIcon;
        pIcon.labelOrigin = new google.maps.Point(0,0);
        pIcon.path = pathPointer(width);

        pLabel = myLabel;
        pLabel.text = text;

        var pointer = new google.maps.Marker({
            position: position,
            map: map,
            label: pLabel,
            icon: pIcon,
            clickable: true,        
        });

        return pointer;
    }

    // create marker
    function setMarker(text, width, position, map) {

        var mIcon = myIcon;
        const m = height/2 + repy;
        mIcon.labelOrigin = new google.maps.Point(0,-m);
//        mIcon.path = pathMarker2(width);
        mIcon.path = pathMarker(width);

        mLabel = myLabel;
        mLabel.text = text;

        var marker = new google.maps.Marker({
            position: position,
            map: map,
            label: mLabel,
            icon: mIcon,
            clickable: true,        
        });

        return marker;
    } 

// start of initMap    
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

    var mSelena = setMarker('Vila Selena', 100, vilaSelena, map);
    
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

    var mBusRail = setMarker('Avtobusna in železniška postaja', 250, {lat: 46.058525, lng: 14.511328}, map); 
    var mTivoli = setMarker('Park Tivoli', 80, {lat: 46.056134, lng: 14.496694}, map);
    var mTromost = setMarker('Tromostovje', 100, {lat: 46.051016, lng: 14.506297}, map);
    var mZmaj = setMarker('Zmajski most', 100, {lat: 46.052098, lng: 14.510292}, map);
    var mGrad = setMarker('Ljubljanski grad', 120, {lat: 46.048919, lng: 14.508608}, map);

    // to airpport 
//    var mAirp22 = setPointer('Letališče Jožeta Pučnika (22km)', 260, {lat: 46.058994, lng: 14.498985}, map); 
    var mAirp22 = setPointer('Letališče Jožeta Pučnika (22km)', 260, {lat: 46.0595, lng: 14.4983}, map); 
    var mAirport = setMarker('Letališče Jožeta Pučnika', 220, {lat: 46.233116, lng: 14.453966}, map);

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
            mAirp22.setVisible(false);
        }
        else {
            mBusRail.setVisible(true);
            mTromost.setVisible(true);
            mTivoli.setVisible(true);
            mZmaj.setVisible(true);
            mGrad.setVisible(true);
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
