Saddle.layout = function(parent) {
  var layout = {},
  layers = [],
  impl = Saddle.impl();

  impl.initParent(parent);

  layout.attachChild = function(child) {
    var container = impl.attachChild(parent, child),
    layer = Saddle.layer(container, child);
    layers.push(layer);
    return layer;
  };

  layout.removeChild = function(layer) {
    impl.removeChild(layer.container, layer.child);
    layers.splice(layers.indexOf(layer), 1);	
  };

  layout.fillParent = function() {
    impl.fillParent(parent);
  };

  layout.layout = function() {
    var i;
    for (i=0 ; i<layers.length ; i++) {
      layers[i].layout();
      impl.layout(layers[i]);
    }
    impl.finalizeLayout(parent);
  };

  return layout;
};