import React, { useState, useEffect } from 'react'
import ReactMapGL, {Marker, WebMercatorViewport} from 'react-map-gl'
import MapMarker from './MapMarker'
import ListOfCities from './ListOfCities'
import CityEntry from './CityEntry'
import axios from 'axios'
import Header from './Header'
import '../index.css'


const CITIES = [
    {
        key:"New York",
        latitude: 40.748817,
        longitude: -73.985428
    },
    {
        key:"Tampa",
        latitude: 27.9506,
        longitude: -82.4572
    },
    {
        key:"Boise",
        latitude: 43.6150,
        longitude: -116.2023
    }
]

const Map = () => {
  const [cities, setCities] = useState([])

  const getCities = () => {
      axios.get('/cities')
        .then(res => setCities(res.data))
        .catch(err => console.log(err))
  }

  useEffect(() => {
   getCities()
  },[])

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '500px',
    latitude: 43.6150,
    longitude: -116.2023,
    zoom: 2
  });

  return (
    <div>
      
      <Header/>

    <div className="wrapper">

    <div className="map-styles">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/blockerbella/ck759dbd108ff1ip577hjsqqm"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}>

      {
          <MapMarker data={CITIES}/>
      }
      </ReactMapGL>
      </div>
    <div className="city-names">
      <a>Places Traveled</a>
      <p> </p>
      {cities.map(city => <ListOfCities {...city} key={city.title}/>)}
    </div>

    <div className="form-entry">
      <CityEntry/>
    </div>
    
    </div>
    </div>
  );
}


export default Map;
