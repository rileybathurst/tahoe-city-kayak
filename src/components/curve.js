import { createElementObject, createPathComponent, extendContext } from '@react-leaflet/core';
// import { Polyline as LeafletPolyline } from 'leaflet';

import { Curve } from 'react-leaflet-curve';

export const Curve = createPathComponent(function createPolyline({ positions, ...options }, ctx) {
  const curve = new LeafletPolyline(positions, options);
  return createElementObject(curve, extendContext(ctx, {
    overlayContainer: curve
  }));
}, function updatePolyline(layer, props, prevProps) {
  if (props.positions !== prevProps.positions) {
    layer.setLatLngs(props.positions);
  }
});
