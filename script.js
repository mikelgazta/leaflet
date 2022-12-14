const ofertasEs = JSON.parse(ofertasEsJson);
const ofertasEusk = JSON.parse(ofertasEuskJson);

//Filtro de irun
var filtroIrunEs = ofertasEs.filter(p => p.municipio === "IRUN");
var filtroIrunEusk = ofertasEusk.filter(p => p.municipio === "IRUN");

//Filtro de hondarribia
var filtroHondarribiEs = ofertasEs.filter(p => p.municipio === "HONDARRIBIA");
var filtroHondarribiEusk = ofertasEusk.filter(p => p.municipio === "HONDARRIBIA");

//Filtro de donosti
var filtroDonostiEs = ofertasEs.filter(p => p.municipio === "DONOSTIA/SAN SEBASTI�N");
var filtroDonostiEusk = ofertasEusk.filter(p => p.municipio === "DONOSTIA/SAN SEBASTI�N");

//Filtro de errenteria
var filtroRenteEs = ofertasEs.filter(p => p.municipio === "ERRENTERIA");
var filtroRenteEusk = ofertasEusk.filter(p => p.municipio === "ERRENTERIA");

const map = L.map('map').setView([43.3390400, -1.7893800], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

L.marker([43.338230, -1.789270]).addTo(map)
    .bindPopup('<canvas id="irun"></canvas>')

L.marker([43.3625, -1.7915]).addTo(map)
    .bindPopup('<canvas id="hondarribia"></canvas>')

L.marker([43.3119500, -1.9023400]).addTo(map)
    .bindPopup('<canvas id="errenteria"></canvas>')

L.marker([43.2918100, -1.9885100]).addTo(map)
    .bindPopup('<canvas id="donostia"></canvas>')





let chartIrun;

map.on('popupopen', () => {
    if (chartIrun) {
        chartIrun.destroy();
    }

    const ctx = document.getElementById('irun');

    if (ctx) {
        mostrarOfertas("IRUN");
        chartIrun = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ES', 'EU'],
                datasets: [{
                    label: 'Ofertas de Lanbide de Irun',
                    data: [filtroIrunEs.length, filtroIrunEusk.length],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});

let chartDonosti

map.on('popupopen', () => {
    if (chartDonosti) {
        chartDonosti.destroy();
    }

    const ctx = document.getElementById('donostia');

    if (ctx) {
        mostrarOfertas("DONOSTIA/SAN SEBASTI�N");
        chartDonosti = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ES', 'EU'],
                datasets: [{
                    label: 'Ofertas de Lanbide de Donosti',
                    data: [filtroDonostiEs.length, filtroDonostiEusk.length],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});

let chartHondarribi
map.on('popupopen', () => {
    if (chartHondarribi) {
        chartHondarribi.destroy();
    }

    const ctx = document.getElementById('hondarribia');

    if (ctx) {
        mostrarOfertas("HONDARRIBIA");
        chartHondarribi = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ES', 'EU'],
                datasets: [{
                    label: 'Ofertas de Lanbide de Hondarribia',
                    data: [filtroHondarribiEs.length, filtroHondarribiEusk.length],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

});

let chartErrenteria
map.on('popupopen', () => {
    if (chartErrenteria) {
        chartErrenteria.destroy();
    }

    const ctx = document.getElementById('errenteria');


    if (ctx) {
        mostrarOfertas("ERRENTERIA");
        chartErrenteria = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ES', 'EU'],
                datasets: [{
                    label: 'Ofertas de Lanbide de Errenteria',
                    data: [filtroRenteEs.length, filtroRenteEusk.length],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

});
function mostrarOfertas(municipio){
    let listaES = document.querySelector('.ofertasES ul');
    let listaEU = document.querySelector('.ofertasEU ul');
    listaES.innerHTML = "<h1>Castellano</h1>";
    listaEU.innerHTML = "<h1>Euskera</h1>";

    var ofertasCastellano = ofertasEs.filter(x => x.municipio === municipio);
    ofertasCastellano.forEach(x => {
        listaES.innerHTML += `<li class="pane sidebar"><a href="${x.url}" target="blank">${x.desEmpleo}</a>
        <p>${x.municipio}</p>
        <p>${x.fecPub}</p>
        </li>
        <hr>`
    });

    var ofertasEuskera = ofertasEusk.filter(x => x.municipio === municipio);
    ofertasEuskera.forEach(x => {
        listaEU.innerHTML += `
        <li class="pane sidebar"><a href="${x.url}" target="blank">${x.desEmpleo}</a>
        <p>${x.municipio}</p>
        <p>${x.fecPub}</p>
        </li>
        <hr>`
    });
}