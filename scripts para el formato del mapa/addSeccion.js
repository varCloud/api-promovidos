const secciones = require("./seccion_cp.json");
const geojson = require("./morelia-export_3.json");
var fs = require('fs');

 const cpMorelia = geojson.features.map((itemMap) => {
     const seccion = secciones.find((item) => item.CP == itemMap.properties.d_cp)
     itemMap.properties.extras = seccion
     return itemMap
})
geojson.features = cpMorelia
fs.writeFile('seccion_cp_morelia_map.json', `${JSON.stringify(geojson)}`, 'utf8' , () => {

});

console.log(cpMorelia)