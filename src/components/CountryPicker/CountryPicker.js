import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl, Grid, Typography} from '@material-ui/core'
import {fetchCountries} from '../../api/api';

import styles from './CountryPicker.module.css';


function CountryPicker({handleCountryChange}) {

    const [fetchedCountries, setFetchedCountries] = useState([]);


    useEffect(()=>{
        const fetchAPI = async () =>{
            setFetchedCountries(await fetchCountries())
        }
        fetchAPI();
    },[setFetchedCountries]); 

    


    return (
        <FormControl className={styles.formControl}>
            <Grid container spacing={3} justify="center" >
                <Typography variant="h5" className={styles.title} gutterBottom >Select a Country : </Typography>
            </Grid>
            <NativeSelect defaultValue='' onChange={(e)=>handleCountryChange(e.target.value)}>
                <option value=''>Global</option>
                {fetchedCountries.map((country, i)=> <option key={i} value={country}>{country} </option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
