import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLngBounds } from 'leaflet'

import Screen from '../../components/Screen';
import Loading from '../../components/Loading';

import { connect, handleRDF, buildQuery } from '../../connect';
import { getFloat, getString } from '../../dataUtils';

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

  if (data.pending) {
    return (
      <Screen>
        <Loading/>
      </Screen>
      );
  }

  if (data.rejected) {
    console.error(data.reason);
    return (
      <Screen>
        <h1>Unable to fetch data</h1>
        <h2>{data.reason.toString()}</h2>
      </Screen>
    );
  }

  console.log(data.value);

  const firstBounds = data.value[0] ? data.value[0].position : [0, 0];
  const bounds = latLngBounds(firstBounds);
  data.value.forEach(entry => bounds.extend(entry.position));

  const markers = data.value.map((entry) => (
    <Marker key={entry.key} position={entry.position}>
      <Popup>
        <div>
          {entry.title && <strong>{entry.title}</strong>}
          <span>{entry.id}</span>
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
    .then(json => json['@graph'].map((entry, index) => ({
      key: index,
      position: [
        getFloat(entry['schema:latitude']),
        getFloat(entry['schema:longitude'])
      ],
      id: entry['@id'],
      title: getString(entry['dct:title'])
    })));

const requests = () => ({
  data: buildQuery(select)
});

export default connect(handle)(requests)(MAP);
