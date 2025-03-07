// Coordenadas aproximadas del barrio La Alborada
const LA_ALBORADA_COORDS = [4.692224704154009, -74.0771391360336];

// Crear los mapas
let map1 = L.map('map1', { zoomControl: false }).setView(LA_ALBORADA_COORDS, 15);
let map2 = L.map('map2', { zoomControl: false, attributionControl: false }).setView(LA_ALBORADA_COORDS, 15);

// Capas base
let osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' });
let hybridLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Esri' });

osmLayer.addTo(map1);
hybridLayer.addTo(map2);

// Sincronizar ambos mapas
map1.on("move", () => map2.setView(map1.getCenter(), map1.getZoom()));
map2.on("move", () => map1.setView(map2.getCenter(), map2.getZoom()));

// Control deslizante para comparar los mapas
let slider = document.getElementById('slider');
let map2Element = document.getElementById('map2');

slider.onmousedown = function () {
    document.onmousemove = function (e) {
        let percentage = (e.clientX / window.innerWidth) * 100;
        if (percentage > 0 && percentage < 100) {
            slider.style.left = percentage + "%";
            map2Element.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        }
    };
};

document.onmouseup = function () {
    document.onmousemove = null;
};

// Cargar y mostrar el polígono de La Alborada desde el archivo GeoJSON
fetch("la_Alborada.geojson")
    .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar el archivo GeoJSON.");
        return response.json();
    })
    .then(data => {
        let geojsonLayer = L.geoJSON(data, {
            style: {
                color: "red",
                weight: 3,
                opacity: 0.9,
                fillOpacity: 0.4
            }
        });

        geojsonLayer.addTo(map1);
        geojsonLayer.addTo(map2);

        // Ajustar la vista al polígono para que sea visible en ambos mapas
        let bounds = geojsonLayer.getBounds();
        map1.fitBounds(bounds);
        map2.fitBounds(bounds);
    })
    .catch(error => console.error("Error cargando GeoJSON:", error));
