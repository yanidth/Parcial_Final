// Coordenadas aproximadas de la localidad
const LOCALIDAD_COORDS = [4.692224704154009, -74.0771391360336];

// Crear el mapa
let map = L.map('map').setView(LOCALIDAD_COORDS, 13);

// Agregar capa base
let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Cargar el polígono de la localidad desde JSON
fetch("localidades.json")
    .then(response => response.json())
    .then(data => {
        let localidad = L.geoJSON(data, {
            style: {
                color: "blue",
                weight: 2,
                opacity: 0.7,
                fillOpacity: 0.3
            }
        }).addTo(map);

        map.fitBounds(localidad.getBounds());
    })
    .catch(error => console.error("Error cargando JSON de localidades:", error));

// Función para cargar y mostrar NDVI
document.getElementById("ndvi").addEventListener("click", function() {
    console.log("Mostrando capa NDVI...");
    mostrarNDVI();
});

// Función para cargar y mostrar SAVI
document.getElementById("savi").addEventListener("click", function() {
    console.log("Mostrando capa SAVI...");
    mostrarSAVI();
});

// Función para cargar y mostrar paraderos de TransMilenio
document.getElementById("transmilenio").addEventListener("click", function() {
    console.log("Mostrando paraderos de TransMilenio...");
    mostrarParaderos();
});

// Función para mostrar NDVI
function mostrarNDVI() {
    fetch("ndvi.json")
        .then(response => response.json())
        .then(data => {
            let ndviLayer = L.geoJSON(data, {
                style: {
                    color: "green",
                    weight: 1,
                    opacity: 0.8,
                    fillOpacity: 0.5
                }
            }).addTo(map);

            map.fitBounds(ndviLayer.getBounds());
        })
        .catch(error => console.error("Error cargando NDVI:", error));
}

// Función para mostrar SAVI
function mostrarSAVI() {
    fetch("savi.json")
        .then(response => response.json())
        .then(data => {
            let saviLayer = L.geoJSON(data, {
                style: {
                    color: "orange",
                    weight: 1,
                    opacity: 0.8,
                    fillOpacity: 0.5
                }
            }).addTo(map);

            map.fitBounds(saviLayer.getBounds());
        })
        .catch(error => console.error("Error cargando SAVI:", error));
}

// Función para mostrar los paraderos de TransMilenio
function mostrarParaderos() {
    fetch("paraderos_transmilenio.geojson")
        .then(response => response.json())
        .then(data => {
            let paraderosLayer = L.geoJSON(data, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 5,
                        fillColor: "red",
                        color: "black",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }
            }).addTo(map);

            map.fitBounds(paraderosLayer.getBounds());
        })
        .catch(error => console.error("Error cargando paraderos de TransMilenio:", error));
}
