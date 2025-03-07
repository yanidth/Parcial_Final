// Coordenadas del barrio La Alborada (aproximadas)
const LA_ALBORADA_COORDS = [4.692224704154009, -74.0771391360336];

// Crear el mapa centrado en La Alborada
let map = L.map('map').setView(LA_ALBORADA_COORDS, 15);

// Agregar capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Puntos de interés en La Alborada
let puntosInteres = [
    { nombre: "Parque La Alborada", coords: [4.693, -74.075], imagen: "parque_alborada.jpg" },
    { nombre: "Centro Comercial Plaza", coords: [4.692, -74.078], imagen: "centro_comercial.jpg" },
    { nombre: "Escuela Primaria", coords: [4.694, -74.076], imagen: "escuela.jpg" },
    { nombre: "Iglesia del Barrio", coords: [4.691, -74.077], imagen: "iglesia.jpg" }
];

// Agregar los puntos de interés al mapa
puntosInteres.forEach(punto => {
    let marker = L.marker(punto.coords).addTo(map);
    marker.bindPopup(punto.nombre);
    
    marker.on("click", function() {
        document.getElementById("photo").src = punto.imagen;
    });
});
