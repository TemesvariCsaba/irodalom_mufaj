/** @typedef {{genre: string, author:string, title: string, title2?:string}} DataArrType a tablazat torzset tartalmazo objektum tipusa */
/** @type {string[]} stringeket tartalmazo tomb */
const headerArr = ["Műfaj", "Szerző", "Mű"] 

const tableArr = [
    {
        genre: "létértelmező vers",
        author: "Kosztolányi Dezső",
        title: "Boldog, Szomorú dal",
        title2: "Hajnali részegség"
    },
    {
        genre: "kisregény",
        author: "Thomas Mann",
        title: "Tonio Kröger",
        title2: "Mario és a varázsló"
    },
    {
        genre: "kisregény",
        author: "Franz Kafka",
        title: "Az átváltozás"
    },
    {
        genre: "regény",
        author: "Móricz Zsigmond",
        title: "Úri muri"
    },
    {
        genre: "regény",
        author: "Wass Albert",
        title: "Adjátok vissza a hegyeimet"
    }
]
const divJs = document.createElement("div")
divJs.id = "jssection"
document.body.appendChild(divJs)

const tableJs = document.createElement("table")
divJs.appendChild(tableJs)

const theadJs = document.createElement("thead")
tableJs.appendChild(theadJs)

const tbodyJs = document.createElement("tbody")
tableJs.appendChild(tbodyJs)

const trFejlec = document.createElement("tr")
theadJs.appendChild(trFejlec)

generateHeader(headerArr, trFejlec)
generateTbody(tableArr, tbodyJs)

const tableSelect = document.getElementById("tableselector")
tableSelect.addEventListener("change", function(e){ 
    const targetSelect = e.target    
    const htmlDiv = document.getElementById("htmlsection") 
    const jsDiv = document.getElementById("jssection")
    if(targetSelect.value == "htmlsection"){
        htmlDiv.classList.remove("hide") 
        jsDiv.classList.add("hide")  
    }                                  
    else if(targetSelect.value = "jssection"){ 
        jsDiv.classList.remove("hide")
        htmlDiv.classList.add("hide") 
    }
    
})

generateFullForm(divJs)