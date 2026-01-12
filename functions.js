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

/**
 *  letrehoz egy sortorest
 * @param {HTMLDivElement} parentDiv a div amihez hozzafuzi a sortorest 
 * @returns {void} nincs visszateresi erteke
 */
function generateBr(parentDiv){ 
    const brDiv = document.createElement("br") 
    parentDiv.appendChild(brDiv) 
} 
/**
 *  letrehozza a form egy mezojet
 * @param {string} labelFor // a label for tulajdonsaga
 * @param {string} labelContent // a label szovege
 * @param {string} inputName // a label name tulajdonsaga
 * @param {HTMLFormElement} parentForm //form amihez hozzafuzi
 * @returns {void} nincs visszateresi erteke
 */
function generateInput(labelFor, labelContent, inputName, parentForm ){ 
    const formDiv = document.createElement("div")
    parentForm.appendChild(formDiv) 
    const labelForm = document.createElement("label") 
    labelForm.htmlFor = labelFor 
    labelForm.innerText = labelContent
    formDiv.appendChild(labelForm) 
    generateBr(formDiv) 
    const inputForm = document.createElement("input") 
    inputForm.type = "text" 
    inputForm.name = inputName 
    inputForm.id = labelFor 
    formDiv.appendChild(inputForm) 
    const spanForm = document.createElement("span") 
    spanForm.classList.add("error") 
    formDiv.appendChild(spanForm) 
    generateBr(formDiv) 
}

/**
 *  letrehozza a teljes formot
 * @param {HTMLDivElement} sectionDiv div amihez hozzafuzi
 * @returns {HTMLFormElement} //egy form a visszateresi erteke
 */
function generateFullForm(sectionDiv){ 
    
    /** @type {{labelfor: string, content: string, name: string }[]} a tomb tartalma */
    const formArr = [ 
        {
            labelfor: "elso", 
            content: "Műfaj", 
            name: "mufaj" 
        },
        {
            labelfor: "masodik",
            content: "Szerző", 
            name: "szerzo" 
        },
        {
            labelfor: "harmadik",
            content: "Mű", 
            name: "mu" 
        },
        {
            labelfor: "negyedik",
            content: "Másik mű", 
            name: "mu2" 
        },

    ]
    const jsForm = document.createElement("form")
    jsForm.id = "jsform" 
    sectionDiv.appendChild(jsForm) 

    for(const element of formArr){ 
    generateInput(element.labelfor, element.content, element.name, jsForm) 
    }

    
    const buttonForm = document.createElement("button") 
    buttonForm.innerText = "Hozzáadás" 
    jsForm.appendChild(buttonForm) 

    return jsForm 
}
/**
 * uj sorokat ad hozza 
 * 
 * @param {BodyArr} contentArr // a tomb
 * @param {HTMLTableSectionElement} parentTbody //tbody amihez hozzacsatolja a sorokat
 * @returns {void} nincs visszateresi erteke
 */
function generateHtmlAddRow(contentArr, parentTbody){
 
    const trAdd = document.createElement("tr") 
    parentTbody.appendChild(trAdd) 
    const tdAddAuthor= createCell("td" ,contentArr.genre, trAdd) 
    createCell("td" ,contentArr.author, trAdd) 
    createCell("td" ,contentArr.title, trAdd) 

    if(contentArr.author2 && contentArr.title2){
        tdAddAuthor.rowSpan = "2" 
        const trAddSecRow = document.createElement("tr") 
        parentTbody.appendChild(trAddSecRow) 
        createCell("td" ,contentArr.author2, trAddSecRow) 
        createCell("td" ,contentArr.title2, trAddSecRow) 
    }

}

/**
 * megvizsgalja hogy a kotelezo mezok ki vannak e toltve ha nem akkor kiir egy hibauzenetet
 * @param {HTMLInputElement} inputField input mezo amit vizsgal
 * @returns {boolean} visszateresi erteke egy logikai ertek
 */
function validateField(inputField){ 
    let validField = true 

    if(inputField.value =="") { 
        const inputFieldParent = inputField.parentElement 
        const emptyDiv = inputFieldParent.querySelector(".error") 
        emptyDiv.innerText = "Kötelező mező" 
        validField = false 
    }
    return validField 
}
/**
 * egybevonja a mezok validalasat es eltunteti a hibauzenetet
 * @param {HTMLInputElement} firstInput elso input mezo a szerzo
 * @param {HTMLInputElement} secondInput masodik input mezo a mu
 * @param {HTMLInputElement} thirdInput harmadik input mezo a fogalmak1
 * @param {HTMLFormElement} parentForm a form amihez tartoznak (js v html)
 * @returns {boolean} logikai ertekkel ter vissza
 */
function validateAllFields(firstInput, secondInput, thirdInput, parentForm){ 
    let validField = true 
    const emptyDivList = parentForm.querySelectorAll(".error") 
    for(const emptyDiv of emptyDivList){ 
        emptyDiv.innerText = "" 
    }

    if(!validateField(firstInput)){ 
        validField = false 
    }
     if(!validateField(secondInput)){ 
        validField = false 
    }
     if(!validateField(thirdInput)){ 
        validField = false 
    }
    return validField 
}