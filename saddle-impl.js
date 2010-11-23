Saddle.impl = function() {
  var impl = {};

  var createRuler = function(widthUnit, heightUnit) {
    var ruler = document.createElement('div');
    ruler.innerHTML = '&nbsp;';
    ruler.style.position = 'absolute';
    ruler.style.zIndex = -32767;
    ruler.style.top = '-20' + heightUnit;
    ruler.style.width = '10' + widthUnit;
    ruler.style.height = '10' + heightUnit;
    return ruler;
  };

  impl.initParent = function(parent) {
    parent.style.position = 'relative';
    parent.appendChild(createRuler('em', 'ex'));
  };

  impl.attachChild = function(parent, child) {
    var container = document.createElement('div');
    container.appendChild(child);
    container.style.position = 'absolute';
    container.style.overflow = 'hidden';
    impl.fillParent(child);
    parent.appendChild(container);
    return container;
  };

  impl.removeChild = function(container, child) {
    container.parentNode.removeChild(container);
    if (child.parentNode === container) {
      container.removeChild(child);	
    }

    child.style.position = '';
    child.style.left = '';
    child.style.top = '';
    child.style.width = 'width';
    child.style.height = 'height';
  };

  impl.fillParent = function(el) {
    el.style.position = 'absolute';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.right = '0px';
    el.style.bottom = '0px';
  };

  impl.layout = function(layer) {
    var style = layer.container.style,
    childStyle = layer.child.style;

    style.left = layer.h.left !== undefined ? '' + layer.h.left + layer.units.left : '';
    style.top = layer.v.top !== undefined ? '' + layer.v.top + layer.units.top : '';
    style.right = layer.h.right !== undefined ? '' + layer.h.right + layer.units.right : '';
    style.bottom = layer.v.bottom !== undefined ? '' + layer.v.bottom + layer.units.bottom : '';
    style.width = layer.h.width !== undefined ? '' + layer.h.width + layer.units.width : '';
    style.height = layer.v.height !== undefined ? '' + layer.v.height + layer.units.height : '';

    switch(layer.hPos) {
      case Saddle.BEGIN:
      childStyle.left = '0px';
      childStyle.right = '';
      break;
      case Saddle.END:
      childStyle.left = '';
      childStyle.right = '0px';
      break;
      case Saddle.STRETCH:
      childStyle.left = '0px';
      childStyle.right = '0px';
      break;	
    }

    switch(layer.vPos) {
      case Saddle.BEGIN:
      style.top = '0px';
      style.bottom = '';
      break;
      case Saddle.END:
      style.top = '';
      style.bottom = '0px';
      break;
      case Saddle.STRETCH:
      style.top = '0px';
      style.bottom = '0px';
      break;	
    }

  };

  impl.finalizeLayout = function(parent) {
  }

  return impl;
};
