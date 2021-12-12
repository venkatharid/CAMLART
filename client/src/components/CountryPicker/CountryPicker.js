import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';

const CountryPicker = ({ countriesData, handleCountryChange }) => {

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(event) => handleCountryChange(event.target.value)} >
                <option value="World">Global</option>
                {countriesData.length} ? {countriesData.map((country, index) => <option value={country[0].location} key={index}>{country[0].location}</option>)} : null
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;