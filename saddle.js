var Saddle = {

  BEGIN: 1,
  END: 2,
  STRETCH: 3,

  layer: function(container, child) {
	var layer = {container: container, child: child, h: {}, v: {}, units: {}},
		targetUnits = {left: 'px', right: 'px', top: 'px', bottom: 'px'},
		hTarget = {},
		vTarget = {},
		hPos = Saddle.STRETCH,
		vPos = Saddle.STRETCH; 

	layer.setChildHorizontalPosition = function(position) {
	  hPos = position;
	};
	
	layer.setChildVerticalPosition = function(position) {
	  vPos = position;
	};
	
	layer.setLeftRight = function(left, leftUnit, right, rightUnit) {
	  hTarget = {left: left, right: right};
	  targetUnits.left = leftUnit;
	  targetUnits.right = rightUnit;
	};
	
	layer.setLeftWidth = function(left, leftUnit, width, widthUnit) {
	  hTarget = {left: left, width: width};
	  targetUnits.left = leftUnit;
	  targetUnits.width = widthUnit;
	};
	
	layer.setRightWidth = function(right, rightUnit, width, widthUnit) {
	  hTarget = {right: right, width: width};
	  targetUnits.right = rightUnit;
	  targetUnits.width = widthUnit;
	};
	
	layer.setTopBottom = function(top, topUnit, bottom, bottomUnit) {
	  vTarget = {top: top, bottom: bottom}; 
	  targetUnits.top = topUnit;
	  targetUnits.bottom = bottomUnit;
	};
	
	layer.setTopHeight = function(top, topUnit, height, heightUnit) {
	  vTarget = {top: top, height: height};
	  targetUnits.top = topUnit;
	  targetUnits.height = heightUnit; 
	};
	
	layer.setBottomHeight = function(bottom, bottomUnit, height, heightUnit) {
	  vTarget = {bottom: bottom, height: height};
	  targetUnits.bottom = bottomUnit;
	  targetUnits.height = heightUnit;  
	};
	
	layer.layout = function() {
	  layer.h.left = hTarget.left;
	  layer.v.top = vTarget.top;
	  layer.h.right = hTarget.right;
	  layer.v.bottom = vTarget.bottom;
	  layer.h.width = hTarget.width;
	  layer.v.height = vTarget.height;
	  
	  layer.units.left = targetUnits.left;
	  layer.units.top = targetUnits.top;
	  layer.units.right = targetUnits.right;
	  layer.units.bottom = targetUnits.bottom;
	  layer.units.width = targetUnits.width;
	  layer.units.height = targetUnits.height;	
	};
	
	return layer;
  },

  layout: function(parent) {
    var layout = {},
        layers = [],
		impl = Saddle._getImpl();
		
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
  },

  _getImpl: function() {
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
	  console.log(layer);
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
  }

};
