import React from 'react'
import {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api/api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

function Chart({data:{confirmed, recovered, deaths}, country}) {


    const [daillyData, setDaillyData] = useState([]);

    //geeting the data from API and setting it in the state using useEffect hook
    useEffect(()=>{

        const fetchedDailyData = async ()=>{
            //awaiting the data from api component and passing it 
            //to setDailyData to populate daillydata in useState
            setDaillyData(await fetchDailyData());
        }

        
        fetchedDailyData();
    }, []);

    //constructing the lineChart component for global daily data from API
    const LineChart = (

        //first checking if the data is available in the state object if not return null
        daillyData.length ? 
        (
            //mapping over the data object and destructuring the object that i need
            <Line
                data={{
                    labels: daillyData.map(({date})=> date),
                    datasets:[{
                        data: daillyData.map(({confirmed})=> confirmed),
                        label:'Infected',
                        borderColor:'#3333FF',
                        fill:true
                    }, {
                        data:daillyData.map(({deaths})=> deaths),
                        label:'Deaths',
                        borderColor:'red',
                        backgroundColor:'rgba(255, 0, 0, 0.5)',
                        fill:true
                    }]
                }}
            />
        )
        : null
    )


    const BarChart = (
        confirmed 
            ?(
                <Bar
                    data={{
                        labels:['Infected', 'Recovered', 'Deaths'],
                        datasets:[{
                            label:'People',
                            backgroundColor:['rgba(0, 0, 255, 0.7)', 
                                'rgba(0, 255, 0, 0.7)', 
                                'rgba(255, 0, 0, 0.7)'
                            ],
                            data:[confirmed.value, recovered.value, deaths.value]
                        }]
                    }}

                    options={{
                        legend:{display:false},
                        title:{display: true, text:`current state in ${country}`}
                    }}
                
                />
            )  
            :null
    );

    return (
        <div className={styles.container}>
            {country ? BarChart : LineChart}
        </div>
    )
}

export default Chart;
