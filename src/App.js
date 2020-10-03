import React, { useState, Fragment } from 'react';
import './App.scss';

import CustomSelect from './components/CustomSelect';
import { countries } from './data';

const App = () => {
  const [formData, setFormData] = useState({
    countryOne: {
      value: '',
      error: ''
    },
    countryTwo: {
      value: 'Croatia',
      error: ''
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();

    let errors = {};
    for(let key in formData) {
      if(formData[key].value === '') {
        errors[key] = 'Please select one option';
      }
    }

    if(Object.keys(errors).length === 0) {
      console.log(formData.countryOne.value, formData.countryTwo.value);
      console.log('submit form...');
    }else {
      setFormData(prev => {
        let data = {};
        for(let key in errors) {
          data[key] = {
            ...prev[key],
            error: errors[key]
          }
        }

        return {
          ...prev,
          ...data
        }
      });
    }
  }

  const changeHandler = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: {
        value,
        error: value !== '' ? '' : prev[name].error
      }
    }));
  }

  return (
    <Fragment>
      <header>
        <h1>ReactJS custom select element with search filter</h1>
      </header>
      <div className="container">
        <form className="form" onSubmit={submitHandler}>
          <CustomSelect 
            label="Select a country"
            searchPlaceholder="Search"
            data={countries}
            value={formData.countryOne.value}
            onChange={changeHandler}
            error={formData.countryOne.error}
            name="countryOne"
          />
          <CustomSelect 
            label="Select another country"
            data={countries}
            value={formData.countryTwo.value}
            onChange={changeHandler}
            error={formData.countryTwo.error}
            name="countryTwo"
          />
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </Fragment>
  );
}

export default App;
