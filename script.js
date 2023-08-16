const button = document.getElementById("btn")
const result = document.getElementById("result")
const inpPage = document.getElementById("numberPage")
const inpLimit = document.getElementById("limit")



function quare (inpPage, inpLimit) {
    return fetch(`https://picsum.photos/v2/list?page=${inpPage}&limit=${inpLimit}`)
        .then(response => response.json())
        .catch(() => {
            console.log('error') });

}

function loadingImg (apiData) {
    let images = '';
    apiData.forEach(item => {
      const lastImages = `
            <div class="imgs">
              <img src="${item.download_url}">
              <p>${item.author}</p>
            </div>
          `;
      images = images + lastImages;
    });
    result.innerHTML = images;
  }



function outsideBand (inpPage, inpLimit){
    if ((inpPage < minimum || inpPage > maximum) && (inpLimit < minimum|| inpLimit > maximum)) {
        result.innerHTML = `<h3>Номер страницы и лимит вне диапазона от ${minSize} до ${maxSize}</h3>`;
    } else if ((inpPage < minimum || inpPage > maximum)) {
        result.innerHTML = `<h3>Номер страницы вне диапазона от ${minimum} до ${maximum}</h3>`;
    } else {
        result.innerHTML = `<h3>Лимит вне диапазона от ${minimum} до ${maximum}</h3>`;
    }
}

 
const minimum = 1;
const maximum = 10;



if (localStorage.lastJson){
    const json = JSON.parse(localStorage.getItem('lastJson'));
    loadingImg(json);
}


button.addEventListener('click', async () => {
    const inpPage = document.getElementById("numberPage").value;
    const inpLimit = document.getElementById("limit").value;
    localStorage.setItem('page', inpPage);
    localStorage.setItem('limit', inpLimit);
    if ((inpPage >= minimum && inpPage <= maximum) && (inpLimit >= minimum && inpLimit <= maximum)){
        const json = await quare(inpPage, inpLimit);
        localStorage.setItem('lastJson', JSON.stringify(json));
        console.log(localStorage.getItem('lastJson'))
        loadingImg(json);
    } else  {
        outsideBand(inputPage, inputLimit);
     }
});
