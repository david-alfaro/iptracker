
//DOM Elements

const ipAddress = document.getElementById('ipAddress');
const ipLocation = document.getElementById('ipLocation');
const ipUTC = document.getElementById('ipUTC');
const ipISP = document.getElementById('ipISP');
const ipInput = document.getElementById('userInput');
const btn = document.getElementById('btnSearch');

//Map inizialization
const map = L.map('ipMap').setView([9.748917,-83.753428],5);

const icon = L.icon({
    iconUrl:"./images/icon-location.svg",
    iconSize:[50,50],
    iconAnchor:[25,25],
});

const marker = L.marker([0,0],{icon:icon}).addTo(map);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl,{attribution});

tiles.addTo(map);


//Modify de url to fetch the ip Address

function addUrlToFetch(){
    const ipNumber = ipInput.value;
    const ipNumberStr = ipNumber.toString();
    const url_base = 'http://ip-api.com/json/';
    const url_to_fetch = new URL(ipNumberStr,url_base);
    return url_to_fetch;
}


//API

let view = true;
async function getIPLocation(){
    url = addUrlToFetch();
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const {query,city,country,timezone,isp,lat,lon} = data;
    marker.setLatLng([lat,lon]);

    if(view){
        map.setView([lat,lon],15);
        view=false;
    }


    ipInput.value="";
    ipAddress.textContent=query;
    ipLocation.textContent=`${city},${country}`;
    ipUTC.textContent = timezone;
    ipISP.textContent=isp;
}


main = () => {
    if(ipInput.value === ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Must enter and ip address',

        });
    }else if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipInput.value)){
        getIPLocation();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Must enter a valid ip address',
        });
        ipInput.value="";
    }
    
};
btn.addEventListener("click",main);

