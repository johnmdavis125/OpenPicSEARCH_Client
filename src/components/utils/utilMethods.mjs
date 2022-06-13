import axios from 'axios'; 

const configImageCardQueue = (image) => {
    let config = {
        imageTitle: '',
        imgSrc: '',
        apiName: '',
        photographer: '',
        portfolioLink: ''
    };
    
    if (image.hasOwnProperty('urls')){
        config = {
            imageTitle: image.description ? image.description : 'Untitled',
            imgSrc: image.urls.regular,
            apiName: 'Unsplash',
            photographer: image.user.name,
            portfolioLink: image.user.links.portfolio
        }
    } else if (image.hasOwnProperty('src')){
        config = {
            imageTitle: image.alt ? image.alt : 'Untitled',
            imgSrc: image.src.medium,
            apiName: 'Pexels',
            photographer: image.photographer,
            portfolioLink: image.photographer_url
        }  
    } else if (image.hasOwnProperty('webformatURL')){
        config = {
            imageTitle: image.tags ? image.tags : 'Untitled',
            imgSrc: image.webformatURL,
            apiName: 'Pixabay',
            photographer: image.user,
            portfolioLink: image.userImageURL
        }   
    } else {
        console.log('hasOwnProperty conditional did not work in ImageCardQueue'); 
    }
    return config;
}

const deleteCollection = async (collectionID) => {
    try {
        const response = await axios.delete(`http://localhost:3001/api/collections/${collectionID}`); 
        console.log(response); 
    } catch (error) {
        console.error(error); 
    }
}

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

const hidePanelsWhileLoading = () => {
    const PanelContainer = document.querySelector('.panelContainer'); 
    PanelContainer.style.opacity = 0;
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


export { 
    configImageCardQueue,
    deleteCollection,
    formatImgArray,
    gracefullyLoad,
    hidePanelsWhileLoading
}