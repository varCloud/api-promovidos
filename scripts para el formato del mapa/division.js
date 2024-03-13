const geojson = require("./cp_mich.json");
var fs = require('fs');

const cpMorelia = geojson.features.map((item) => {
    if (item.properties.d_cp.toString().startsWith('58')){
        return item
    }
    return null
})

const geojsonFilter = geojson;
const cpMoreliaFilter =  cpMorelia.filter((item)=> item != null)

geojsonFilter.features = cpMoreliaFilter
console.log(geojsonFilter)


fs.writeFile('myjsonfile2.json', JSON.stringify(geojsonFilter), 'utf8' , () => {

});

