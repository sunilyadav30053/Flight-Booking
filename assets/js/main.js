let city_code = new Array();
let airports_list=[];
let cities_list=[];
let plane_data=[];
from_city_list = document.querySelector('#from_city_list');
to_city_list = document.querySelector('#to_city_list');
const options = {
    method: 'GET',
    headers: {
        'X-Access-Token': 'undefined',
        'X-RapidAPI-Key': '497b068c0amsh06ecb20569d564bp1236dbjsn5a446b82f01f',
        'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com'
    }
};

(()=>{
    fetch('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/en-GB/airports.json', options)
	.then(response => response.json())
	.then(response => {
        for(let data of response){
            if(data.country_code=="IN")
            {
                //console.log(data);
                airports_list.push(data);
            }
        }
    })
	.catch(err => console.error(err));
})();

(()=>{
    
    
    fetch('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/en-GB/cities.json', options)
        .then(response => response.json())
        .then(response => {
            for(let data of response) 
            {
                cities_list.push(data);
                if(data.country_code=="IN")
                {
                    
                    for(let ap of airports_list)
                    {
                        if(ap.city_code == data.code)
                        {
                           // console.log(ap);
                            let option=`<option value="${data.code}">${data.name_translations.en} - ${data.code} - ${ap.name}-${ap.code}</option>`
                            from_city_list.insertAdjacentHTML("beforeend",option);
                            to_city_list.insertAdjacentHTML("beforeend",option);
                        }
                    }
                }
            }
        })
        .catch(err => console.error(err));
})();
(()=>{
    fetch('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/planes.json', options)
	.then(response => response.json())
	.then(response => {
        for(let data of response){
            plane_data.push(data);
            //console.log(data);
        }
    })
	.catch(err => console.error(err));
})();
console.log(plane_data);
document.getElementById("check_plain").addEventListener("click", () => {
    let from_city_name=document.querySelector("#from_city_list");
    let departure_airport=document.querySelector("#from_city_list").value;
    let to_city_name=document.querySelector("#to_city_list");
    let arrival_airport=document.querySelector("#to_city_list").value;
    let show_err=document.querySelector("#show_err");
    if(departure_airport==arrival_airport){  
        //alert("Departure and arrival_airport could not be same.");
        to_city_name.style.border="solid 2px red";
        from_city_name.style.border="solid 2px red";
        show_err.innerHTML="Departure and arrival_airport could not be same"
    }
    var show_plane=document.querySelector("#show_plane");
    show_plane.innerHTML="";
    
    fetch('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/routes.json', options)
	.then(response => response.json())
	.then(response => {
        for(data of response){
           if(data.departure_airport_iata==departure_airport && data.arrival_airport_iata==arrival_airport)
           {
                console.log(data);
                let show_palne_card="";
                let from_city_name="";
                let to_city_name="";
                let plane_name="";
                for(let cn of cities_list)
                {
                    if(cn.code==data.departure_airport_iata)
                    {
                        from_city_name=cn.name_translations.en;
                    }
                    
                    if(cn.code==data.arrival_airport_iata)
                    {
                        to_city_name=cn.name_translations.en;
                    }
                }
                for(let arpln of plane_data){
                    if(arpln.code==data.planes[0])
                    {
                        plane_name=arpln.name;
                    }
                }
                show_palne_card=
                    `<div class="card-content">
                        <p> From ${from_city_name} To ${to_city_name}</p>
                        <div class="card-title">
                        <img src="assets/images/31738.jpg" />
                        <span >${plane_name}-${data.planes[0]}</span>
                        <div class="content-button">
                            <button onClick="bookTickt()">Book Now</button>
                        </div>
                        </div>
                     </div>` 
                show_plane.innerHTML+=show_palne_card;
                //console.log(data);
           }
           
        }
        if(show_plane.innerHTML==""){
            `<div class="card-content">
                <p>No direct plane From ${from_city_name} To ${to_city_name}</p> 
            </div>` 
        }
    })
	.catch(err => console.error(err));
})
const bookTickt = () =>{
    alert("Ticket Booked");
}

