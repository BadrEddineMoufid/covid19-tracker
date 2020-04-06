import React, { Component } from 'react';

import {Cards, Chart, CountryPicker} from './components';
import {fetchData} from './api/api';

import styles from './App.module.css'

import cimg from './images/image.png';

class App extends Component {

    //initiating data with empty object in state
    state = {
        data: {},
        country:''
    }


    handleCountryChange = async (country)=>{
        //fetch the country
        const fetchedData = await fetchData(country);
        //console.log(fetchedData);

        //then set the state

        this.setState({data: fetchedData, country: country});
    }

    async componentDidMount(){
        //calling our fetchData method to get data from API
        const fetchedData = await fetchData();

        //setting state
        //passing the fetchedData to state object 
        this.setState({data: fetchedData});
    }

    render() {
        const {data, country} = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} alt='covid19-logo' src={cimg} />
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;