import { useState } from 'react'
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import Card from '@mui/material/Card';
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
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeInput = (value) => {
    setSearchValue(value)
  };

  const onClickSearch = () => {
    if(searchValue){
      setSearchQuery(searchValue);
    }
  };

  const { loading, data } = useQuery(USER_PROPERTY_DETAILS, {
    variables: { input: searchQuery }
  });

  return (
    <>
      <div>
        <div className="search-container">
          <label htmlFor='search-input'>Search</label>
          <input id='search-input' value={searchValue} onChange={(e) => onChangeInput(e.target.value)}></input>
          <button onClick={onClickSearch}>Search</button>
        </div>
        {!loading ?
        data?.search?.length > 0 &&
        <ul className="search-results">
          {data?.search?.map((item, index) => {
            return         <Card key={`user-info-${index}`}><li >
              <p>{item.lastName}, {item.firstName}</p>
              <h3>Properties</h3>
              {item?.properties?.length === 0 && <p>No properties</p>}
              {item?.properties?.map((property, index2) => {
                return <div className="properties-results" key={`user-info-${index}-property-${index2}`}>
                  <p>City: {property.city}</p>
                  <p>State: {property.state}</p>
                  <p>Street: {property.street}</p>
                  <p>Zip: {property.zip}</p>
                  <p>Rent: ${property.rent}</p>
                </div>
              })}
            </li>
            </Card>
          })}
        </ul>
        : <h4>Loading...</h4>}
      </div>
    </>
  )
}

export default App
