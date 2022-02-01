const topside = document.createElement("div")
topside.setAttribute("class", "rowtop");
document.body.append(topside);

const container = document.createElement("div");
container.setAttribute("class", "container-fluid");
document.body.appendChild(container);

const row = document.createElement("div");
row.setAttribute("class", "rowupper");
container.appendChild(row)

const heading = document.createElement("h1");
heading.setAttribute("id", "title");
heading.setAttribute("class", "text-center");
heading.innerHTML = `Anime Land`;
row.appendChild(heading);

const row1 = document.createElement("div");
row1.setAttribute("class", "searchrow");
row.appendChild(row1);

const inputBox = document.createElement("div")
inputBox.setAttribute("class", "inputbox")
inputBox.innerHTML = `<div class="input-group mb-3">
<input type="text" id="reqanime" class="form-control" placeholder="Search for an anime, e.g'Naruto'" aria-label="Example text with button addon" aria-describedby="button-addon1">
<button onclick="getdata()" class="btn btn-outline-secondary" type="button" id="button-addon1">Search</button>
<button type="clear" class="btn btn-outline-secondary" onClick="refreshPage()">Clear</button>
</div>`
row1.appendChild(inputBox);

const baseUrl =  "https://api.jikan.moe/v3";

async function getdata() {
    const searchedName = document.getElementById("reqanime").value;
    row2.innerHTML = '';
    if(searchedName){
        try {
            const animeData = await fetch(`${baseUrl}/search/anime?q=${searchedName}&page=1`, {redirect: 'follow'},{
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                }
            });
            const animeResult = await animeData.json();
            const finalData = animeResult.results;
            if (finalData) {
                for (result of finalData) {
                    animelist(result);
                }
            } else {
                const temp = document.createElement("div");
                temp.setAttribute("class", "row");
                temp.innerHTML = `<div class="no-records-msg">
                    No Records Found
                </div>`
                row2.appendChild(temp)
            }
        }
        catch (error) {
            alert("Something went wrong , Load again")
        }
    }
};
const row2 = document.createElement("div");
row2.setAttribute("class", "row");
row1.appendChild(row2);

function animelist(result) {
    const temp = document.createElement("div");
    temp.setAttribute("class", "col-sm-6 col-md-4 col-lg-4 col-xl-4");
    const startDate = result.start_date ? result.start_date.substring(0, 10) : '';
    const endDate = result.end_date ? result.end_date.substring(0, 10) : '';
    temp.innerHTML = `<div class="card h-100">
                <div class="card-header"><h5>${result.title}</h5></div> 
              <div class="card-body">
              <img src="${result.image_url}" alt="${result.title}" class="animation"  >
              <div class="card-text">  
              <p class="card-title1"><span style="font-weight:bold">Start date: </span> ${startDate} <p>
                <p class="card-title2"><span style="font-weight:bold">End date: </span>${endDate} <p>
                <p class="card-title3"><span style="font-weight:bold">Type: </span> ${result.type} <p>
                <p class="card-title3"><span style="font-weight:bold">IMDB Rating: </span> ${result.score}<p>
              </div>  
              </div>
      </div>`
    row2.appendChild(temp);
}

function refreshPage() {
    window.location.reload();
}