// Crear el mapa y establecer la vista inicial
var map = L.map('map').setView([4.692367361733081, -74.07725341059628], 15);

// Agregar la capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Verificar que L.PM esté definido antes de agregar los controles
if (map.pm) {
    map.pm.addControls({
        position: 'topleft',
        drawCircle: false
    });
} else {
    console.error("Leaflet-Geoman (L.PM) no está cargado. Verifica que la librería esté incluida.");
}

let drawnLayers = [];

// Manejadores de eventos para dibujo de polígonos
map.on("pm:create", function(e) {  
    let myLayer = e.layer;

    if (myLayer instanceof L.Polygon) {
        drawnLayers.push(myLayer);
        console.info("Se ha creado un polígono");
    }
});

map.on("pm:remove", function(e) {
    drawnLayers = drawnLayers.filter(layer => layer !== e.layer);
    console.log("Se ha eliminado un polígono");
});
