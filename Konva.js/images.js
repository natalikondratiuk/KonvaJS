const imageSrc = "http://i.imgur.com/wehQ1GV.jpg";

var sliders = [
  "red",
  "green",
  "blue",
  "alpha",
  "brightness",
  "hue",
  "saturation",
  "luminance",
  "value",
  "noise",
  "pixelSize",
  "levels",
  "enhance",
  "blurRadius"
];

// set origin image
document.getElementById("originImage").src = imageSrc;

// define canvas and layer
var stage = new Konva.Stage({
  container: "container",
  width: 400,
  height: 300
});
var layer = new Konva.Layer();

// Cross origin image
var imageObj = new Image();
imageObj.crossOrigin = "";
imageObj.src = imageSrc;

// Konva Image
var image = new Konva.Image({
  image: imageObj
});
image.position({
  x: -0,
  y: -0
});
image.width(400);
image.height(300);
image.draggable(true); // ?
image.filters([
  Konva.Filters.RGBA,
  Konva.Filters.Brighten,
  Konva.Filters.HSL,
  Konva.Filters.HSV,
  Konva.Filters.Noise,
  Konva.Filters.Pixelate,
  Konva.Filters.Posterize,
  Konva.Filters.Enhance,
  Konva.Filters.Blur
]);

function updateSliders() {
  var config = {};
  sliders.forEach(function(attr) {
    var slider = document.getElementById(attr);
    const update = () => {
      //console.log(attr,slider.value);
      image[attr](parseFloat(slider.value));
      config[attr] = parseFloat(slider.value);
      document.getElementById("configJson").innerHTML = JSON.stringify(config);
      layer.batchDraw();
      //console.log(image);
    };
    slider.oninput = update;
    update();
  });
}

imageObj.onload = function() {
  // Important
  image.cache();

  // Adding elements
  layer.add(image);
  stage.add(layer);

  // Sliders
  updateSliders();
};

// !! not working ?  add better listener ?
function useConfig() {
  const config = JSON.parse(document.getElementById("configJson").innerHTML);
  sliders.forEach(function(attr) {
    console.log(config);
    image[attr](config[attr]);
    layer.batchDraw();
  });
}
