// Coordenadas aproximadas del barrio La Alborada
const LA_ALBORADA_COORDS = [4.692224704154009, -74.0771391360336];

let map = L.map('map').setView(LA_ALBORADA_COORDS, 15);

// Agregar capa base
let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let barrioLayer; // Variable para almacenar el polígono del barrio

// Cargar el polígono del barrio La Alborada desde GeoJSON
fetch("La_Alborada.geojson")
    .then(response => response.json())
    .then(data => {
        barrioLayer = L.geoJSON(data, {
            style: {
                color: "red",
                weight: 2,
                opacity: 0.7,
                fillOpacity: 0.3
            }
        }).addTo(map);

        map.fitBounds(barrioLayer.getBounds());
    })
    .catch(error => console.error("Error cargando GeoJSON del barrio:", error));

// Función para mostrar el área del polígono
document.getElementById("area").addEventListener("click", function() {
    if (barrioLayer) {
        let geojson = barrioLayer.toGeoJSON();
        let area = turf.area(geojson);
        alert(`Área del barrio: ${area.toFixed(2)} m²`);
    }
});

// Función para mostrar el perímetro del polígono
document.getElementById("perimetro").addEventListener("click", function() {
    if (barrioLayer) {
        let geojson = barrioLayer.toGeoJSON();
        let perimeter = turf.length(turf.polygonToLine(geojson)) * 1000; // Convertir a metros
        alert(`Perímetro del barrio: ${perimeter.toFixed(2)} m`);
    }
});

// Función para mostrar el centroide del polígono
document.getElementById("centroide").addEventListener("click", function() {
    if (barrioLayer) {
        let geojson = barrioLayer.toGeoJSON();
        let centroide = turf.centroid(geojson);
        let coords = centroide.geometry.coordinates;
        
        // Agregar marcador en el centroide
        L.marker([coords[1], coords[0]]).addTo(map)
            .bindPopup("Centroide del Barrio").openPopup();
        
        alert(`Centroide en: [${coords[1].toFixed(6)}, ${coords[0].toFixed(6)}]`);
    }
});

// Función para mostrar la Bounding Box (caja envolvente)
document.getElementById("boundingBox").addEventListener("click", function() {
    if (barrioLayer) {
        let geojson = barrioLayer.toGeoJSON();
        let bbox = turf.bbox(geojson); // Bounding box [minX, minY, maxX, maxY]

        // Crear un rectángulo en el mapa
        let bboxPolygon = turf.bboxPolygon(bbox);
        L.geoJSON(bboxPolygon, {
            style: { color: "blue", weight: 2, opacity: 0.7, fillOpacity: 0.2 }
        }).addTo(map);

        alert(`Bounding Box: [${bbox}]`);
    }
});

// Función para mostrar los vértices del polígono
document.getElementById("vertices").addEventListener("click", function() {
    if (barrioLayer) {
        let geojson = barrioLayer.toGeoJSON();
        let vertices = turf.explode(geojson); // Extraer vértices

        vertices.features.forEach(feature => {
            let coords = feature.geometry.coordinates;
            L.circleMarker([coords[1], coords[0]], {
                radius: 5,
                color: "black",
                fillColor: "yellow",
                fillOpacity: 1
            }).addTo(map);
        });

        alert(`Se han marcado ${vertices.features.length} vértices.`);
    }
});
