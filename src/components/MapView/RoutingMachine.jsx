import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

function RoutingMachine({ waypoints }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !waypoints || waypoints.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints.map(point => L.latLng(point[0], point[1])),
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
      lineOptions: {
        styles: [{ color: '#4d804a', weight: 6, opacity: 0.9 }]
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: () => null // Hide route waypoint markers
    }).addTo(map);

    // Hide the routing instructions container
    const container = routingControl.getContainer();
    if (container) {
      container.style.display = 'none';
    }

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, waypoints]);

  return null;
}

export default RoutingMachine;
