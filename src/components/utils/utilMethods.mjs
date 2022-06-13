const formatImgArray = (unformattedImgArrForNewCol, colTitle) => {
    console.log('call formatImgArray'); 
    let formattedImgArr = unformattedImgArrForNewCol.map((image) => {
        if (image.hasOwnProperty('urls')){
            return ({
                imgSrc: image.urls.regular,
                description: image.description,
                photographer: image.user.name,
                portfolioURL: image.user.links.portfolio,
                apiName: 'Unsplash',
                apiID: image.id
            });
        } else if (image.hasOwnProperty('src')){
            return ({
                imgSrc: image.src.medium, 
                description: image.alt,
                photographer: image.photographer,
                portfolioURL: image.photographer.url,
                apiName: 'Pexels',
                apiID: image.id
            });
        } else if (image.hasOwnProperty('webformatURL')){
            return ({
                imgSrc: image.webformatURL, 
                description: image.tags,
                photographer: image.user,
                portfolioURL: image.userImageURL,
                apiName: 'Pixabay',
                apiID: image.id
            });
        };
    });

    let formattedInput = {
        title: colTitle,
        images: formattedImgArr
    }

    return formattedInput;
}

const gracefullyLoad = () => {
    let delayLoad = setInterval(loadPanels, 1500); 
    function loadPanels(){
        const PanelContainer = document.querySelector('.panelContainer'); 
        let opac = 0; 
        
        let itr8 = setInterval(load, 10);
        function load() {
            opac += 0.03;
            if (opac > 0.99){
                clearInterval(itr8);
                clearInterval(delayLoad); 
            }
            PanelContainer.style.opacity = opac;
        }
    }
}

const hidePanelsWhileLoading = () => {
    const PanelContainer = document.querySelector('.panelContainer'); 
    PanelContainer.style.opacity = 0;
}

export { 
    formatImgArray,
    hidePanelsWhileLoading,
    gracefullyLoad
}