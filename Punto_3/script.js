// Crear el mapa
var map = L.map('map', {
    center: [4.692224704154009, -74.0771391360336], // Coordenadas aproximadas
    zoom: 15
});

// Capas del mapa
var vectorBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});

var satelliteBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri, Maxar, Earthstar Geographics'
});

// Crear los grupos de capas para el control deslizante
var leftLayer = L.layerGroup([vectorBase]).addTo(map);
var rightLayer = L.layerGroup([satelliteBase]).addTo(map);

// Barra deslizante para comparar las capas
L.control.sideBySide(leftLayer, rightLayer).addTo(map);

// Cargar el polígono desde GeoJSON
fetch("La_Alborada.geojson") // Verifica que el nombre sea exacto
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo GeoJSON");
        }
        return response.json();
    })
    .then(data => {
        var geojsonLayer = L.geoJSON(data, {
            style: {
                color: "red",
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.4
            }
        }).addTo(map);

        // Ajustar la vista al polígono
        map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(error => console.error("Error cargando GeoJSON:", error));
