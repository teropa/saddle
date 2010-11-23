Saddle.layer = function(container, child) {
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
};