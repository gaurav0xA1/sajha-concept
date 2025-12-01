import './RouteList.css';
import { useState, useEffect } from 'react';
import routesData from '../../data/routes.json';
import stationsData from '../../data/stations.json';

import { TbArrowAutofitWidth } from "react-icons/tb";   // yellow arrow icon
import { FaBus } from "react-icons/fa";                  // bus count
import { MdOutlineTrain } from "react-icons/md";         // stop count
import { LuNetwork } from "react-icons/lu";              // distance
import { WiHumidity } from "react-icons/wi";             // humidity
import { FiWind } from "react-icons/fi";                 // wind speed
import { MdCompress } from "react-icons/md";             // pressure

function RouteList({ onRouteClick, selectedRoute, searchQuery }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=27.6766&lon=85.3144&appid=7b15d3d9d16924015911f1dd38f5bd84&units=metric";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setWeather({
                    temp: Math.round(data.main.temp),
                    pressure: data.main.pressure,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    city: data.name
                });
            })
            .catch(error => console.error('Error:', error));
    }, []);

    // Filter routes based on search query
    const filteredRoutes = routesData.filter(route => {
        if (!searchQuery) return true;
        
        // Search by station names in the route
        const routeStations = route.stationIds.map(id => {
            const station = stationsData.find(s => s.id === id);
            return station ? station.name.toLowerCase() : '';
        });
        
        const query = searchQuery.toLowerCase();
        return routeStations.some(stationName => stationName.includes(query)) ||
               route.mainName.toLowerCase().includes(query);
    });

    return (
        <div className="route-list">
            <div className="cards-container scrollable">

                {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route) => (
                    <div 
                        className={`card ${selectedRoute?.id === route.id ? 'active' : ''}`}
                        key={route.id}
                        onMouseEnter={() => onRouteClick(route)}
                        onMouseLeave={() => onRouteClick(null)}
                    >

                        {/* TITLE (small green text) */}
                        <h4 className="route-title">{route.title}</h4>

                        {/* MAIN NAME WITH ICON */}
                        <div className="route-main">
                            <TbArrowAutofitWidth size={26} color="#FDBE34" />
                            <h3>{route.mainName}</h3>
                        </div>

                        {/* META INFO */}
                        <div className="route-meta">
                            <span>
                                <FaBus size={18} color="#777" />
                                {route.busCount} buses
                            </span>
                            <span>
                                <MdOutlineTrain size={18} color="#777" />
                                {route.stopCount} stops
                            </span>
                            <span>
                                <LuNetwork size={18} color="#777" />
                                {route.distanceKm} km
                            </span>
                        </div>

                    </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No routes found for "{searchQuery}"</p>
                    </div>
                )}

            </div>

            {/* WEATHER WIDGET */}
            <div className="weather-widget">
                {weather ? (
                    <>
                        <div className="weather-header">
                            <div className="weather-main">
                                <img 
                                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                                    alt="Weather icon"
                                    className="weather-icon"
                                />
                                <div className="weather-temp">{weather.temp}°C</div>
                            </div>
                            <div className="weather-location">
                                <div className="weather-city">{weather.city}</div>
                                <div className="weather-desc">{weather.description}</div>
                            </div>
                        </div>
                        <div className="weather-details">
                            <div className="weather-item">
                                <WiHumidity size={24} color="#ffffff" />
                                <span>{weather.humidity}%</span>
                            </div>
                            <div className="weather-item">
                                <FiWind size={20} color="#ffffff" />
                                <span>{weather.windSpeed} m/s</span>
                            </div>
                            <div className="weather-item">
                                <MdCompress size={20} color="#ffffff" />
                                <span>{weather.pressure} hPa</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="weather-loading">Loading weather...</div>
                )}
            </div>
        </div>
    );
}

export default RouteList;
