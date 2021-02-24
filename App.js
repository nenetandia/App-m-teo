
// let now = new Date();
// let annee   = now.getFullYear();
// let mois    = now.getMonth() + 1;
// let jour    = now.getDate();
// let heure   = now.getHours();
// let minute  = now.getMinutes();
// let seconde = now.getSeconds();
// document.write(+jour+"/"+mois+"/"+annee+ +heure+" heure "+minute+" minutes "+seconde+" secondes" );
 
// alert( "Nous sommes le "+jour+"/"+mois+"/"+annee+" et il est "+heure+" heure "+minute+" minutes "+seconde+" secondes" );

var ladate=new Date()
document.write("Heure brute : ");
document.write(ladate.getHours()+":"+ladate.getMinutes()+":"+ladate.getSeconds())
document.write("<BR>");
var h=ladate.getHours();
if (h<10) {h = "0" + h}
var m=ladate.getMinutes();
if (m<10) {m = "0" + m}
var s=ladate.getSeconds();
if (s<10) {s = "0" + s}
document.write("Heure formatée : ");
document.write(h+":"+m+":"+s)

const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
async function main(withIP = true) {
    let ville ; 
    if (withIP){
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(resultat => resultat.json())
            .then(json => json.ip)  
    
    ville = await fetch('http://freegeoip.app/json/' + ip)
        .then(resultat => resultat.json())
        .then(json => json.city)
    }else {
        ville = document.querySelector('#ville').textContent;
    }
    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json);
 
 console.log(meteo);
 displayWeatherInfos(meteo)
 
}
function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];
 
    document.body.className= conditions.toLowerCase();
 
}
    const ville= document.querySelector('#ville')
 
    ville.addEventListener('click', ()=>{
    ville.contentEditable = true ;
    });
    ville.addEventListener('keydown' , (e)=>{
    if (e.keyCode === 13){
    e.preventDefault(); 
    ville.contentEditable = false ;
    main (false);
    
    }
    })
 
main();   


    






