/** @typedef {{genre: string, author:string, title: string, title2?:string}} DataArrType a tablazat torzset tartalmazo objektum tipusa */

/**
 * letrehoz egy cellat
 * @param {"td"|"th"} cellType a cella tipusa (td v th)
 * @param {string} cellContent //cella tartalma
 * @param {HTMLTableRowElement} parentTr //tr amihez hozzafuz
 * @returns {HTMLTableCellElement} egy cellaval ter vissza
 */
function createCell(cellType, cellContent, parentTr){
    const cellTdOrTh = document.createElement(cellType)
    cellTdOrTh.innerText = cellContent
    parentTr.appendChild(cellTdOrTh)
    return cellTdOrTh
}
/**
 * letrehozza a tablazat fejlecet
 * @param {string[]} headerArr //fejlec tomb
 * @param {HTMLTableRowElement} parentTr //tr amihez hozzafuz
 */
function generateHeader(headerArr, parentTr){
    createCell("th", headerArr[0], parentTr)
    createCell("th", headerArr[1], parentTr)
    const thColspan = createCell("th", headerArr[2], parentTr)
    thColspan.colSpan = 2
}
/**
 * letrehozza a tablazat torzset
 * @param {DataArrType[]} bodyArr az adattomb
 * @param {HTMLTableSectionElement} parentTbody tbody amihez fuz 
 */
function generateTbody(bodyArr, parentTbody){
    parentTbody.innerText = ""
    for(const element in bodyArr){
        const trTbody = document.createElement("tr")
        parentTbody.appendChild(trTbody)
        createCell("td", bodyArr[element].genre, trTbody)
        createCell("td", bodyArr[element].author, trTbody)
        const tdColSpan = createCell("td", bodyArr[element].title, trTbody )
        if(bodyArr[element].title2){
            createCell("td", bodyArr[element].title2, trTbody)
        }else{
            tdColSpan.colSpan = 2
        }
    }
}