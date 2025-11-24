import './MapView.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import "leaflet/dist/leaflet.css";

function MapView() {
  const [markers, setMarkers] = useState([
    { lat: 27.7, lng: 85.3, name: 'Kathmandu' },
  ]);

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[27.7172, 85.3240]}
        zoom={13}
        className="map-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]}>
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
