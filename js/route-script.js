// Map initialization
const map = L.map('map').setView([27.6710, 85.3188], 14);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Sample route data (replace with your actual coordinates)
const routeData = {
    title: "Lagankhel - Naya Buspark",
    stops: 12,
    duration: 45,
    distance: 10,
    coordinates: [
        [27.6710, 85.3188], // Lagankhel
        [27.6780, 85.3200], // Pulchowk
        [27.6810, 85.3220], // Kupondole
        [27.6850, 85.3250]  // Naya Buspark
    ],
    stopNames: [
        "1. Lagankhel Bus Park",
        "2. Pulchowk",
        "3. Kupondole",
        "4. Naya Buspark"
    ]
};

// Display route information
document.getElementById('route-title').textContent = routeData.title;
document.getElementById('stop-count').textContent = routeData.stops;
document.getElementById('duration').textContent = routeData.duration;
document.getElementById('distance').textContent = routeData.distance;

// Add stops to list
const stopsContainer = document.getElementById('stops-container');
routeData.stopNames.forEach(stop => {
    const li = document.createElement('li');
    li.textContent = stop;
    stopsContainer.appendChild(li);
});

// Draw route on map
const routeLine = L.polyline(routeData.coordinates, {
    color: '#2e8b42',
    weight: 5,
    opacity: 0.7
}).addTo(map);

// Add markers for each stop
routeData.coordinates.forEach((coord, index) => {
    L.marker(coord)
        .bindPopup(routeData.stopNames[index])
        .addTo(map);
});

// Fit map to show entire route
map.fitBounds(routeLine.getBounds());