import './MapView.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect, useMemo } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import stationsData from '../../data/stations.json';
import RoutingMachine from './RoutingMachine';

function MapView({ selectedRoute, searchQuery, isRouteViewOpen }) {
  const [map, setMap] = useState(null);

  // Always show all stations
  const displayedStations = stationsData;

  // Find stations matching search query
  const searchMatchingStations = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return stationsData.filter(station => 
      station.name.toLowerCase().includes(query)
    ).map(s => s.id);
  }, [searchQuery]);

  // Get waypoints for routing
  const routePoints = useMemo(() => {
    if (!selectedRoute) return [];
    return selectedRoute.stationIds.map(id => {
      const station = stationsData.find(s => s.id === id);
      return [station.lat, station.lng];
    });
  }, [selectedRoute]);

  // Zoom to fit route when selected
  useEffect(() => {
    if (map && selectedRoute && displayedStations.length > 0) {
      const bounds = L.latLngBounds(
        displayedStations.map(s => [s.lat, s.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, selectedRoute, displayedStations]);

  // Custom bus station icon (default)
  const stationIcon = L.divIcon({
    className: 'custom-station-icon',
    html: `<div class="station-marker">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                    fill="#2196F3" stroke="white" stroke-width="1.5"/>
              <rect x="9" y="7" width="6" height="5" rx="0.5" fill="white"/>
              <line x1="9" y1="9.5" x2="15" y2="9.5" stroke="#2196F3" stroke-width="1"/>
              <circle cx="10.5" cy="11" r="0.6" fill="#2196F3"/>
              <circle cx="13.5" cy="11" r="0.6" fill="#2196F3"/>
            </svg>
          </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });

  // Highlighted station icon for selected route (yellow)
  const highlightedIcon = L.divIcon({
    className: 'custom-station-icon',
    html: `<div class="station-marker highlighted">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                    fill="#FDBE34" stroke="white" stroke-width="1.5"/>
              <rect x="9" y="7" width="6" height="5" rx="0.5" fill="white"/>
              <line x1="9" y1="9.5" x2="15" y2="9.5" stroke="#FDBE34" stroke-width="1"/>
              <circle cx="10.5" cy="11" r="0.6" fill="#FDBE34"/>
              <circle cx="13.5" cy="11" r="0.6" fill="#FDBE34"/>
            </svg>
          </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });

  // Search matching icon (green)
  const searchIcon = L.divIcon({
    className: 'custom-station-icon',
    html: `<div class="station-marker search-match">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                    fill="#4CAF50" stroke="white" stroke-width="1.5"/>
              <rect x="9" y="7" width="6" height="5" rx="0.5" fill="white"/>
              <line x1="9" y1="9.5" x2="15" y2="9.5" stroke="#4CAF50" stroke-width="1"/>
              <circle cx="10.5" cy="11" r="0.6" fill="#4CAF50"/>
              <circle cx="13.5" cy="11" r="0.6" fill="#4CAF50"/>
            </svg>
          </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });

  return (
    <div className={`map-wrapper ${isRouteViewOpen ? 'expanded' : ''}`}>
      <MapContainer
        center={[27.6950, 85.3240]}
        zoom={13}
        className="map-container"
        ref={setMap}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {displayedStations.map((station) => {
          const isOnRoute = selectedRoute?.stationIds.includes(station.id);
          const isSearchMatch = searchMatchingStations.includes(station.id);
          
          let icon = stationIcon;
          if (isOnRoute) {
            icon = highlightedIcon; // Yellow for route stations
          } else if (isSearchMatch) {
            icon = searchIcon; // Green for search matches
          }
          
          return (
            <Marker 
              key={station.id} 
              position={[station.lat, station.lng]}
              icon={icon}
            >
              <Popup>{station.name}</Popup>
            </Marker>
          );
        })}

        {selectedRoute && routePoints.length > 0 && (
          <RoutingMachine waypoints={routePoints} />
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
