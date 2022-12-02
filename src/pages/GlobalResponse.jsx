import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRef, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { Endpoints } from '../config/Consts';
import { api } from '../infrastructure/api/instance';
import MapMarker from '../modules/global-response/MapMarker';
import MapModal from '../modules/global-response/MapModal';
import MapSidebar from '../modules/global-response/MapSidebar';
import { useCallback } from 'react'

export const GlobalResponse = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0.0000);
  const [lat, setLat] = useState(14.0500);
  const [zoom, setZoom] = useState(1.30);
  const [diseasesData, setDiseasesData] = useState([])
  const [modalData, setModalData] = useState({ isOpen: false })
  const [selectedId, setSelectedId] = useState()
  const [filteredDiseases, setFilteredDiseases] = useState({})

  const handleMarkerClick = useCallback((markerData, id) => {
    if (!map.current) return;
    if (id) {
      setSelectedId(id)
    }

    const { latitude, longitude } = markerData
    map.current.flyTo({ center: [longitude, latitude], zoom: 4 })

    setTimeout(() => {
      setModalData({ ...modalData, ...markerData, isOpen: true })  
    }, 500)
  }, [modalData])

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom,
      accessToken: 'pk.eyJ1IjoieXVyYWJ1cm92IiwiYSI6ImNsYjBtc3B2MDFsN3AzcG1wa2YxdTRwMngifQ.6sYJf8EeTZbFPuwApyUaCQ',
      projection: 'mercator',
      renderWorldCopies: false
    });
  }, []);

  // useEffect(() => {
  //   // diseasesData.filter(({ disease }) => filteredDiseases[disease]).map(data => {
  //   diseasesData.map(data => {
  //     return data.map.map(mapData => {
  //       const ref = createRef()
  //       ref.current = document.createElement('div')
  //       ReactDOM.render(
  //         <MapMarker onClick={handleMarkerClick} markerData={mapData} />,
  //         ref.current
  //       )
  //       const { latitude, longitude } = mapData
  //       const test = new mapboxgl.Marker(ref.current).setLngLat([longitude, latitude]).addTo(map.current)
  //       console.log('MMMMMMMMMMMMMMMMMMMMmMMMM', test)
  //       if(filteredDiseases['COVID-19']){
  //         test.remove()
  //       }
  //     })
  //   })
  // }, [diseasesData])

  useEffect(() => {
    setDiseasesData(diseasesData.map(data => ({
        ...data,
        map: data.map.map(mapData => {
          if (mapData.mapElement && !(filteredDiseases.diseases[mapData.disease])) {
            mapData.mapElement.remove()
            delete mapData.mapElement
          }
          if (!mapData.mapElement && filteredDiseases.diseases[mapData.disease]) {
            const ref = createRef()
            ref.current = document.createElement('div')
            ReactDOM.render(
              <MapMarker onClick={handleMarkerClick} markerData={mapData} />,
              ref.current
            )
            const { latitude, longitude } = mapData
            const marker = new mapboxgl.Marker(ref.current).setLngLat([longitude, latitude]).addTo(map.current)
            mapData.mapElement = marker
          }
          return mapData
        })
      })))
    }, [filteredDiseases])

  // useEffect(() => {
  //   if (!map.current) return;
  //   map.current.on('click', (e) => {
  //     console.log(e)
  //   });
  // }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.on('load', (e) => {
      map.current.addControl(new mapboxgl.NavigationControl());
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [])

  useEffect(() => {
    api.get(Endpoints.diseaseMaps.list).then(({ data }) => {
      const promises = data.items.map(({ id }) => api.get(Endpoints.diseaseMaps.details(id)))
      Promise.all(promises).then(res => {
        const data = res.map(({ data }) => 
          ({ ...data, map: data.map.map(country => ({ ...country, disease: data.disease, diseaseId: data.id }))}))
        setDiseasesData(data)
        setFilteredDiseases({ diseases: Object.fromEntries(data.map(({ disease }) => [disease, true])), byCountry: '' })
      })
    })
  }, [])

  // useEffect(() => {
  //   setFilteredDiseases(Object.fromEntries(diseasesData.map(({ disease }) => [disease, true])))
  // }, [diseasesData])

  return (
    <div style={{ height: '100vh', width: '100vw', paddingTop: 80, position: 'relative' }}>
      <MapSidebar diseasesData={diseasesData} selectedId={selectedId} handleMarkerClick={handleMarkerClick} setFilteredDiseases={setFilteredDiseases} filteredDiseases={filteredDiseases} />
      <MapModal data={modalData} setData={setModalData} />
      <div style={{height: '100%', width: '100vw'}} ref={mapContainer} className="map-container" />
    </div>
  );
}
