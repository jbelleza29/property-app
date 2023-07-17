import { useState, useRef } from 'react'
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import './App.css'

const USER_PROPERTY_DETAILS = gql`
  query userInfo($input: String!){
    search(input: $input) {
      firstName
      lastName
      properties {
        city
        state
        street
        zip
        rent
      }
    }
  }
`

function App() {
  const [searchValue, setSearchValue] = useState('');
  const onChangeInput = (value) => {
    setSearchValue(value)
  };

  const onClickSearch = () => {
    userPropertyDetails();
  };

  const [userPropertyDetails, { loading, error, data }] = useLazyQuery(USER_PROPERTY_DETAILS, {
    variables: { input: searchValue }
  });

  return (
    <>
      <div>
        <div className="search-container">
          <label htmlFor='search-input'>Search</label>
          <input id='search-input' value={searchValue} onChange={(e) => onChangeInput(e.target.value)}></input>
          <button onClick={onClickSearch}>Search</button>
        </div>
        <ul className="search-results">
          {data?.search?.map((item, index) => {
            return <li key={`user-info-${index}`}>
              <p>First Name: {item.firstName}</p>
              <p>Last Name: {item.lastName}</p>
              <h3>Properties</h3>
              {item?.properties?.map((property, index2) => {
                return <div key={`user-info-${index}-property-${index2}`}>
                  <p>City: {property.city}</p>
                  <p>State: {property.state}</p>
                  <p>Street: {property.street}</p>
                  <p>Zip: {property.zip}</p>
                  <p>Rent: ${property.rent}</p>
                </div>
              })}
            </li>
          })}
        </ul>
      </div>
    </>
  )
}

export default App
