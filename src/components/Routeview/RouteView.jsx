import './RouteView.css'
import { IoClose } from 'react-icons/io5'
import stationsData from '../../data/stations.json'


function RouteView({ route, onClose }) {
    if (!route) return null

    //declaring constant
    const routeStations = route.stationIds.map(stationId => {
        return stationsData.find(station => station.id === stationId)
    }).filter(Boolean)

    return (
        <div className="route-view-panel expanded-layout">
                <div className="route-view-header">
                    <div className="route-view-title-section">
                        <h2 className="route-view-title">{route.mainName}</h2>
                        <p className="route-view-subtitle">{route.title}</p>
                    </div>
                    <button className="route-view-close" onClick={onClose}>
                        <IoClose size={28} />
                    </button>
                </div>
                <div className="route-view-stats">
                    <div className="route-stat">
                        <span className="stat-value">{route.busCount}</span>
                        <span className="stat-label">Buses</span>
                    </div>
                    <div className="route-stat">
                        <span className="stat-value">{route.stopCount}</span>
                        <span className="stat-label">Stops</span>
                    </div>
                    <div className="route-stat">
                        <span className="stat-value">{route.distanceKm} </span>
                        <span className="stat-label">Distance (km)</span>
                    </div>
                </div>
                <div className="route-view-content">
                    <h3 className="stations-heading">Route Stations ({routeStations.length})</h3>

                    <div className="stations-list">
                        {routeStations.map((station, index) => (
                            <div key={station.id} className="station-item">
                                <div className="station-number">{index + 1}</div>
                                <div className="station-info">
                                    <p className="station-name">{station.name.replace(/_/g, ' ')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default RouteView