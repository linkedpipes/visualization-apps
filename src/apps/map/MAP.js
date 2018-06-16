import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLngBounds } from 'leaflet'

import withLoading from '../../components/withLoading';
import withClassFilter from '../../components/withClassFilter';

import { connect, handleRDF, buildQuery } from '../../connect';
import { getFloat, map } from '../../dataUtils';
import { log } from '../../utils';

import { select, context } from './query';

import 'leaflet/dist/leaflet.css';
import './MAP.css';

import L from 'leaflet'

// BUG https://github.com/Leaflet/Leaflet/issues/4968
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

const MAP = ({ data }) => {

  let bounds;
  if (data.length > 0) {
    bounds = latLngBounds(data[0].position);
    data.forEach(entry => bounds.extend(entry.position));
  }

  const markers = data.map((entry) => (
    <Marker key={entry.key} position={entry.position}>
      <Popup>
        <div>
          {entry.title && <strong>{entry.title}</strong>}
          <a href={entry.id} target="_blank">
            <span>{entry.id}</span>
          </a>
        </div>
      </Popup>
    </Marker>
  ));

  return (
    <div className="MAP">
      <Map zoom={12} bounds={bounds}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    </div>
  );
}

const handle = response =>
  handleRDF({ context, compactOptions: { graph: true } })(response)
    .then(log)
    .then(map({
      latitude: { key: 'schema:latitude', parser: getFloat },
      longitude: { key: 'schema:longitude', parser: getFloat },
      title: { key: 'dct:title', optional: true }
    }))
    .then(entries => entries.map((entry) => ({
      ...entry,
      position: [
        entry.latitude,
        entry.longitude
      ]
    })));

const requests = () => ({
  data: buildQuery(select)
});

export default connect(handle)(requests)(withLoading(withClassFilter(MAP)));
