class Search{

    constructor(query){
        this.query = query;
    }

    async getResults(){

        try{
            
            const result =  await fetch(`http://api.weatherstack.com/current?access_key=d3f0494acce998481d8b1c1c3d6634dc&query=${this.query}`);
             
            const data = await result.json();
            console.log(data);
            this.temp = data.current.temperature;
            this.location = data.location.name;
            const localtime = data.location.localtime;
            const timeArray = localtime.split(" ");
            this.time = timeArray[1];
            const weatherDesc = data.current.weather_descriptions;

            this.weatherType = String(weatherDesc);
            
            this.icon = data.current.weather_icons;
            this.humidity = data.current.humidity;

            this.success  = "Successful";
            
           
         }
     
         catch(error){
             console.log(error);
             alert("Enter the valid location");
             this.success = 'Failure';
         }

         


    }


};




// CASE 1[Location]

// 1 Read the value from the search bar

document.querySelector('.footer__search-1').addEventListener('submit', e => {

e.preventDefault();

controlSearch();
clearInput();





});

// CASE 2

document.querySelector('.footer__search-geolocation').addEventListener('click',e => {
    e.preventDefault();
    landingPage();
});

document.querySelector('.button').addEventListener('click',e => {

alert('Sorry! This feature will be available in the next update.For now you have to do calculations on your own :)');

});


async function controlSearch(){

const query = document.querySelector('.search').value;

loadScreen2(query);

};

// 2 Render the result


// Display the result

async function loadScreen2(query){

    if(query){
        clearScreen();
        renderLoader();
        const weather = new Search(query);
        await weather.getResults();
        console.log(weather);

        if(weather.success == 'Successful'){
            
            changeContent(weather);
            clearLoader();
            loadScreen();
            console.log('success');

        }

        else if(weather.success == 'Failure'){
            landingPage();
            console.log('failure');
            clearLoader();

        }
    
       
    }

};


function changeContent(weather){

    document.querySelector('.location').innerHTML = weather.location;
    
    document.querySelector('.time').innerHTML = weather.time;

    document.querySelector('.temp').innerHTML = `${weather.temp}&deg; C`;

    document.querySelector('.humidity').innerHTML =`Humidity: ${weather.humidity}`;

    document.querySelector('.weather__info-description').innerHTML = `${weather.weatherType}`;
    changeIcons(weather);


};



function clearInput(){

    document.querySelector('.search').value = " ";

}

function clearScreenFailure(){
    document.querySelector('.header').style.visibility = 'hidden';
    document.querySelector('.weather__info').style.visibility = 'hidden';

}

// Loader

const selectLoader = document.querySelector('.loader');

function renderLoader(){

    

    selectLoader.style.visibility = 'visible';
    selectLoader.style.opacity = 1;
    selectLoader.style.zIndex = 100;

};

function clearLoader(){

    selectLoader.style.visibility = 'hidden';
    selectLoader.style.opacity = 0;

}
function clearScreen() {

document.querySelector('.wrapper').style.opacity = '0';
document.querySelector('.wrapper').style.visibility = 'hidden';



};

function placeholder(){
    document.querySelector('.search').placeholder = 'Enter the location';
};

function loadScreen(){

document.querySelector('.wrapper').style.opacity = '1';
document.querySelector('.wrapper').style.visibility = 'visible';



}

function changeIcons(weather){

    if(weather.weatherType == 'Sunny' || weather.weatherType == 'Hot' ||  weather.weatherType == 'Humid' || weather.weatherType == 'Sunshine' ){

        document.querySelector('.weather__info-icon').src = '/img/icon-sunny.png';
    }


    else if(weather.weatherType == 'Rainy' ||weather.weatherType == 'Light rain shower' ||weather.weatherType == 'Heavy rain' ||  weather.weatherType == 'Partially rainy' || weather.weatherType == 'Partly rainy'){


        document.querySelector('.weather__info-icon').src = '/img/icon-Light rain.svg';

    }


    else if(weather.weatherType == 'Thunderstrom' ||weather.weatherType == 'Thunder' ||weather.weatherType == 'Lightning'){


        document.querySelector('.weather__info-icon').src = 'img/icon-thunderstrom.png';
    }

    else if(weather.weatherType == 'Partially cloudy' ||  weather.weatherType == 'Partially sunny' || weather.weatherType == 'Overcast' || weather.weatherType == 'Partly cloudy')
    {

        document.querySelector('.weather__info-icon').src = 'img/icon-Overcast.jpg';

    }

    else if(weather.weatherType == 'Cloudy' ||  weather.weatherType == 'Heavy clouds' || weather.weatherType == 'Moderate clouds'){
        document.querySelector('.weather__info-icon').src = 'img/icons-clouds.png';


    }
    else if(weather.weatherType == 'Haze'){
        document.querySelector('.weather__info-icon').src = 'img/icon-Haze.png';

    }

    else if(weather.weatherType == 'Clear'){
        document.querySelector('.weather__info-icon').src = 'img/icon-clear.png';

    }
};

// Default

landingPage();

function landingPage(){
    clearScreen();
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,handle_error);
    }
    else{
        console.log("Your browser doesn't support Geolocation!");   
    }
};

function showPosition(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const location_Arr = [lat,long];
    loadScreen2(location_Arr);
}

function handle_error(){
alert("Oops!Looks like you denied permission.Our services can't run without your location.Now you have to manually change it in your browser's setting!")
location.reload();
}





