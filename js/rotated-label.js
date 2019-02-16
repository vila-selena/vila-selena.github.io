// adapted from https://github.com/javidalpe/map-label-rotated 
RotatedLabel.prototype = new google.maps.OverlayView();

// constructor     
function RotatedLabel(position, text, rotation, map, customStyles) {
    // Initialize all properties.
    this.position_ = position;
    this.text_ = text;
    if (rotation > 90 && rotation < 270) {
            rotation += 180;
    }
    this.rotation_ = rotation;
    this.customStyles_ = customStyles;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
}

//    onAdd() {
RotatedLabel.prototype.onAdd = function() {
    const div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    // Create the img element and attach it to the div.
    const textElement = document.createElement('div');
    textElement.textContent = this.text_;
    textElement.style.transform = `rotate(${this.rotation_}deg)`;
    textElement.style.transformOrigin = "50% 50%";
    textElement.style.position = 'absolute';
    textElement.style.whiteSpace = 'nowrap';
    var cstyles = this.customStyles_;
    for ( var key in cstyles) {
        textElement.style[key] = cstyles[key];
    }
    this.textElement_ = textElement;
    div.appendChild(textElement);
    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    const panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
};

//    draw() {
RotatedLabel.prototype.draw = function() {
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position.
    // To do this, we need to retrieve the projection from the overlay.
    this.overlayProjection = this.getProjection();
    this.moveOverlayDiv();
};

//    moveOverlayDiv() {
RotatedLabel.prototype.moveOverlayDiv = function() {
    // Retrieve position coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    const divPixel = this.overlayProjection.fromLatLngToDivPixel(this.position_);

    const div = this.div_;
    div.style.left = divPixel.x + 'px';
    div.style.top = divPixel.y + 'px';
};

//    onRemove() {
RotatedLabel.prototype.onRemove = function() {
    if (!this.div_) {
            return;
    }
    
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};

//    getPosition() {
RotatedLabel.prototype.getPosition = function() {
    return this.position_;
};

//    setPosition(position) {
RotatedLabel.prototype.setPosition = function(position) {        
    this.position_ = position;

    if (!this.overlayProjection) return;

    this.moveOverlayDiv();
};

//    getText() {
RotatedLabel.prototype.getText = function() {        
    return this.text_;
};

//    setText(text) {
RotatedLabel.prototype.setText = function(text) {        
    this.text_ = text;
    this.textElement_.textContent = this.text_;
};

//    getRotation() {
RotatedLabel.prototype.getRotation = function() {
    return this.rotation_;
};

//    setRotation(rotation) {
RotatedLabel.prototype.setRotation = function(rotation) {
    this.rotation_ = rotation;
    this.textElement_.style.transform = `rotate(${this.rotation_}deg)`;
};

//    getCustomStyles() {
RotatedLabel.prototype.getCustomStyles = function() {
    return this.customStyles_;
};

//    setCustomStyles(customStyles) {
RotatedLabel.prototype.setCustomStyles = function(customStyles) {
    this.customStyles_ = customStyles;
    var cstyles = this.customStyles_;
    for ( var key in cstyles) {
        this.textElement_.style[key] = cstyles[key];
    }
};

