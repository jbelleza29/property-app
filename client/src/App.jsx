import React, { useState } from 'react'
import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

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

const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      firstName
      lastName
    }
  }
`

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openSearch, setopenSearch] = useState(false);

  const onClickSearch = () => {
    console.log(searchValue);
    if(searchValue){
      setSearchQuery(searchValue);
    }
  };

  const { loading, data } = useQuery(USER_PROPERTY_DETAILS, {
    variables: { input: searchQuery }
  });

  const [getAllUsers, allUsers] = useLazyQuery(GET_ALL_USERS);

  React.useEffect(() => {
    (async () => {
      if(openSearch){
        await getAllUsers();
      }
    })();
    
  }, [getAllUsers, openSearch])

  const usersMapped = allUsers?.data?.getAllUsers.map((user) => 
            {return {firstName: user.firstName,
                lastName: user.lastName
              }
          });

  return (
    <>
      <div>
        <div className="search-container">
        <Autocomplete 
          id="async-search"
          sx={{ width: 300 }}
          open={openSearch}
          onOpen={() => {
            setopenSearch(true);
          }}
          onClose={() => {
            setopenSearch(false);
          }}
          options={usersMapped || []}
          isOptionEqualToValue={(option, value) => option.firstName === value.firstName}
          loading={allUsers?.loading}
          getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
          onChange={(event, value) => {
            setSearchValue(value.firstName)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {allUsers?.loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
      )}
        />
         <Button variant="contained" onClick={onClickSearch}>Search</Button>
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
