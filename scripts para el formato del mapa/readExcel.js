const geojson = require("./cp_mich.json");
var fs = require('fs');
const xlsx = require('xlsx');  

const workbook = xlsx.readFile('./DisritosdeMorelia.xlsx');  // Step 2
let workbook_sheet = workbook.SheetNames; 
console.log(workbook_sheet)
var data = []
for( const sheet of workbook_sheet){
    let workbook_response = xlsx.utils.sheet_to_json(        // Step 4
        workbook.Sheets[sheet]
    );
    if(workbook_response.length > 0){
       workbook_response.forEach((item) => data.push(item))
    }
}
console.log(data)
fs.writeFile('seccion_cp.json', `${JSON.stringify(data)}`, 'utf8' , () => {

});



