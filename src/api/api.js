import axios from 'axios';

//this the API url from where im getting all covid19 data
const url = 'https://covid19.mathdro.id/api';

//fetching the basic data infected, recovered, deaths.....
export const fetchData = async (country)=>{
    //hhhhh running out of names
    let dynamicUrl = url;

    //if there is country then use this end point else use the standerd url
    if(country){
        dynamicUrl = `${url}/countries/${country}`;

    }

    try {

        //destructuring  response object 
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(dynamicUrl);
        
        //returning data 
        return { confirmed, recovered, deaths, lastUpdate};
    } catch (error) {
        console.error(error);
    }
}

//fetching daily data for chart component
//don't forget to return the data so that it can be used 
export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`)

        //destructuring data object and returning a new array whith the needed data for Chart Component
        const result = data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));

        

        return result;
    } catch (error) {
        console.error(error);
    }
}


//fetching countries from API

export const fetchCountries = async ()=>{
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
        
    } catch (error) {
        console.error("API component /fetchCountries method" + error);
    }
}