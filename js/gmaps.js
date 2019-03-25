function initMap() {

    // control to toggle streen vs satelite
    function MapTypeControl(controlDiv, map) {
        // control border
        var controlUI = document.createElement('div');
        controlUI.style.border = '3px solid #fff';
        controlUI.style.cursor = 'pointer';
        controlUI.style.width = '80px';
        controlUI.style.marginLeft = '20px';
        // controlUI.title = 'Satellite';
        controlUI.title = 'Street map';
        controlDiv.appendChild(controlUI);

        // control interior
        var controlPic = document.createElement('img');
        // controlPic.src = '/images/map-satelit.jpg';
        controlPic.src = '/images/map-street.jpg';  
        controlPic.style.width = '100%';
        controlPic.style.margin = '0px';
        controlUI.appendChild(controlPic);

        var l = {};
        var c = {};
        
        // event
        controlUI.addEventListener('click', function() {
            var mt = map.getMapTypeId();
            if (mt == 'roadmap') {
                l = m10m.getLabel();
                l.color = BELA;
                m10m.setLabel(l);
                c.strokeColor = BELA;
                c.fillColor = BELA;
                c10m.setOptions(c);
                controlUI.title = 'Street map';
                controlPic.src = '/images/map-street.jpg';  
                map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
            }
            else if (mt == 'satellite') {
                l = m10m.getLabel();
                l.color = RDECA;
                m10m.setLabel(l);
                c.strokeColor = RDECA;
                c.fillColor = RDECA;
                c10m.setOptions(c);
                controlUI.title = 'Satellite map';
                controlPic.src = '/images/map-satelit.jpg';  
                map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            };
        });
    }

    // common for all markers
    const height = 26;      // height
    const repy = 24;        // rep height
    const repx = 12;        // rep x minus: left, plus: right
    const repd = 12;        // rep x delta on bottom line

    // strait path for pointer
    function pathPointer1(width) {
        const l = -width/2;
        const r = +width/2;
        const t = -height/2;
        const b = +height/2;
        const h = height;
        const px = -2*h, py = t-3*h;
        const dx = 6, dy = 4;

        var p = '';
        p += 'M '+ (px+dx)   +' '+ (py-dy)    +' ';
        p += 'L '+ (dx+dy)   +' '+ (t)        +' ';
        p += 'L '+ (r)       +' '+ (t)        +' ';
        p += 'L '+ (r)       +' '+ (b)        +' ';
        p += 'L '+ (l)       +' '+ (b)        +' ';
        p += 'L '+ (l)       +' '+ (t)        +' ';
        p += 'L '+ (-dx-dy)  +' '+ (t)        +' ';
        p += 'L '+ (px-dx)   +' '+ (py+dy)    +' ';
        p += 'L '+ (px-3*dx) +' '+ (py+3*dy)  +' ';
        p += 'L '+ (px-3*dx) +' '+ (py-6*dy)  +' ';
        p += 'L '+ (px+3*dx) +' '+ (py-3*dy)  +' ';
        p += 'L '+ (px+dx)   +' '+ (py-dy)    +' ';
        return p;
    }
    
    // rounded path for pointer
    function pathPointer2(width) {
        const l = -width / 2 + height / 2;
        const r = +width / 2 - height / 2;
        const t = -height / 2;
        const b = +height / 2;
        const h = height;
        const px = -1*h, py = t-1.5*h;
        const dx = 6, dy = 6; // dy = 4;

        const px1 = px+dx, py1 = py-dy;
        const px2 = px+3*dx, py2 = py-3*dy;
        const px3 = px1-dy, py3 = py1-dx;
        const px7 = px-dx, py7 = py+dy;
        const px6 = px-3*dx, py6 = py+3*dy;
        const px5 = px7-dy, py5 = py7-dx;
        const px4 = px-4*dy, py4 = py-4*dx;

        var p = '';
        p += 'M '+ (px1)     +' '+ (py1)    +' ';
        // napis
        p += 'C '+ (dx)      +' '+ (t)      +' '+ (dx)  +' '+ (t)  +' '+ (r)     +' '+ (t)      +' ';
        p += 'C '+ (r+h)     +' '+ (t)      +' '+ (r+h) +' '+ (b)  +' '+ (r)     +' '+ (b)      +' ';
        p += 'L '+ (l)       +' '+ (b)      +' ';
        p += 'C '+ (l-h)     +' '+ (b)      +' '+ (l-h) +' '+ (t)  +' '+ (l)     +' '+ (t)      +' ';
        p += 'C '+ (-dx)     +' '+ (t)      +' '+ (-dx) +' '+ (t)  +' '+ (px7)   +' '+ (py7)    +' ';
        // puscica
        p += 'L '+ (px6) +' '+ (py6)  +' ';
        p += 'C '+ (px5) +' '+ (py5)  +' '+ (px5) +' '+ (py5)  +' '+ (px4) +' '+ (py4)  +' ';
        p += 'C '+ (px3) +' '+ (py3)  +' '+ (px3) +' '+ (py3)  +' '+ (px2) +' '+ (py2)  +' ';
        p += 'L '+ (px1) +' '+ (py1)  +' ';
        return p;
    }

    // straight path for marker
    function pathMarker1(width, lr) {
        // lr: -1 for left, +1 for right, 0 for straight
        const m = -repx * lr;
        const l = m - width / 2;
        const r = m + width / 2;
        const b = -repy;
        const t = b - height;
        const h = height;
        const dx = repx, dy = 0;

        var p = '';
        p += 'M '+ (0)    +' '+ (0)    +' ';
        p += 'L '+ (m-dx) +' '+ (b-dy) +' ';
        p += 'L '+ (l)    +' '+ (b)    +' ';
        p += 'L '+ (l)    +' '+ (t)    +' ';
        p += 'L '+ (r)    +' '+ (t)    +' ';
        p += 'L '+ (r)    +' '+ (b)    +' ';
        p += 'L '+ (m+dx) +' '+ (b-dy) +' ';
        p += 'L '+ (0)    +' '+ (0)    +' ';
        return p;
    }

    // rounded path for marker
    function pathMarker2(width, lr) {
        // lr: -1 for left, +1 for right, 0 for straight
        const m = -repx * lr;
        const l = m - width / 2 + height / 2;
        const r = m + width / 2 - height / 2;
        const b = -repy;
        const t = b - height;
        const h = height;
        const dx = repd, dy = 0;

        var p = '';
        p += 'M '+ (0)    +' '+ (0)    +' ';
        p += 'C '+ (m)    +' '+ (b-dy) +' '+ (m-dx) +' '+ (b)   +' '+ (l)  +' '+ (b)  +' ';
        p += 'C '+ (l-h)  +' '+ (b)    +' '+ (l-h)  +' '+ (t)   +' '+ (l)  +' '+ (t)  +' ';
        p += 'L '+ (l)    +' '+ (t)    +' '+ (r)    +' '+ (t)   +' ';
        p += 'C '+ (r+h)  +' '+ (t)    +' '+ (r+h)  +' '+ (b)   +' '+ (r)  +' '+ (b)  +' ';
        p += 'C '+ (m+dx) +' '+ (b)    +' '+ (m)    +' '+ (b+dy)+' '+ (0)  +' '+ (0)  +' ';
        return p;
    }

//    const TEMNOZELENA = '#004F46';
//    const TEMNORDECA = '#783226';
    const ZELENA = '#4E6900';
    const RDECA = '#961F1B';
    const BELA = '#FFFFFF';
    
    // icon common 
    var myIcon = {
        scale: 1,
        fillColor: RDECA,
        fillOpacity: 0.6,
        strokeColor: RDECA,
        strokeWeight: 2,
    };

    // label common 
    var myLabel = {
        color: BELA, //ZELENA,
        fontFamily: 'Palanquin, sans-serif',
        fontSize: '18px',
        fontWeight: 'bold',
    };

    // create pointer
    function setPointer(text, width, position, map) {

        var pIcon = myIcon;
        pIcon.labelOrigin = new google.maps.Point(0,0);
        pIcon.path = pathPointer2(width);

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
    function setMarker(text, width, lr, position, map) {

        var mIcon = myIcon;
        const my = height/2 + repy + 2; // +2 move text up 2 px
        const mx = -repx * lr;
        mIcon.labelOrigin = new google.maps.Point(mx,-my);
        mIcon.path = pathMarker2(width,lr);

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

    var mSelena = setMarker('Vila Selena', 100, 0, vilaSelena, map);
    
    var c10m = new google.maps.Circle({
        strokeColor: BELA, //RDECA, 
        strokeOpacity: 1.0,
        strokeWeight: 1,
        fillColor: BELA, //RDECA, 
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
            color: BELA, //RDECA, 
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

    var mBusRail = setMarker('Avtobusna in železniška postaja', 260, -1,  {lat: 46.058525, lng: 14.511328}, map); 
    var mTivoli = setMarker('Park Tivoli', 90, +1, {lat: 46.056134, lng: 14.496694}, map);
    var mTromost = setMarker('Tromostovje', 110, +1, {lat: 46.051016, lng: 14.506297}, map);
    var mZmaj = setMarker('Zmajski most', 115, -1, {lat: 46.052098, lng: 14.510292}, map);
    var mGrad = setMarker('Ljubljanski grad', 135, -1, {lat: 46.048919, lng: 14.508608}, map);

    // to airpport 
//    var mAirp22 = setPointer('Letališče Jožeta Pučnika (22km)', 260, {lat: 46.058994, lng: 14.498985}, map); 
    var mAirp22 = setPointer('Letališče Jožeta Pučnika (22km)', 260, {lat: 46.0595, lng: 14.4983}, map); 
    var mAirport = setMarker('Letališče Jožeta Pučnika', 210, 0, {lat: 46.233116, lng: 14.453966}, map);

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
        if (z < 9) {
            mAirport.setVisible(false);
        }
        else {
            mAirport.setVisible(true);
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
    map.setMapTypeId(google.maps.MapTypeId.SATELLITE);    
} // initMap

google.maps.event.addDomListener(window, 'load', initMap);
