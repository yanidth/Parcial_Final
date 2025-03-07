// Coordenadas del barrio La Alborada (aproximadas)
const LA_ALBORADA_COORDS = [4.692224704154009, -74.0771391360336];

// Crear el mapa centrado en La Alborada
let map = L.map('map').setView(LA_ALBORADA_COORDS, 15);

// Agregar capa base de OpenStreetMap
let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Cargar el polígono del barrio La Alborada desde GeoJSON
fetch("La_Alborada.geojson")
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: "red",
                weight: 2,
                opacity: 0.7,
                fillOpacity: 0.3
            }
        }).addTo(map);
    })
    .catch(error => console.error("Error cargando el polígono del barrio La Alborada:", error));

// Cargar y mostrar los paraderos del SITP desde el archivo GeoJSON
fetch("Paraderos_Zonales_del_SITP.geojson")
    .then(response => response.json())
    .then(data => {
        let estacionesLayer = L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: "blue",
                    color: "white",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function(feature, layer) {
                layer.on("click", function() {
                    mostrarInformacionParadero(feature.properties);
                });
            }
        }).addTo(map);
    })
    .catch(error => console.error("Error cargando paraderos del SITP:", error));

// Función para mostrar la información detallada del paradero seleccionado
function mostrarInformacionParadero(properties) {
    let infoBox = document.getElementById("station-info");
    
    let infoHtml = "<strong>Detalles del Paradero:</strong><br>";
    
    for (const [key, value] of Object.entries(properties)) {
        infoHtml += `<strong>${key}:</strong> ${value || "No disponible"}<br>`;
    }

    infoBox.innerHTML = infoHtml;
}
