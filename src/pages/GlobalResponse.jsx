import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useSnackbar } from 'notistack'
import { createRef, useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Endpoints } from '../config/Consts'
import { api } from '../infrastructure/api/instance'
import { CircularProgressComponent } from '../infrastructure/components/CircularProgress.component'
import MapMarker from '../modules/global-response/MapMarker'
import MapModal from '../modules/global-response/MapModal'
import MapSidebar from '../modules/global-response/MapSidebar'
import PrepaireEvent from '../modules/global-response/PrepaireEvent'
import '../modules/global-response/styles.scss'

export const initialPrepaireEvent = {
  cityId: '',
  type: 'event',
  title: '',
  description: '',
}

export const GlobalResponse = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(0.0)
  const [lat, setLat] = useState(14.05)
  const [zoom, setZoom] = useState(1.3)
  const [diseasesData, setDiseasesData] = useState([])
  const [modalData, setModalData] = useState({ isOpen: false })
  const [selectedId, setSelectedId] = useState()
  const [mapFilter, setMapFilter] = useState({})
  const [prepaireEvent, setPrepaireEvent] = useState(initialPrepaireEvent)
  const [countryId, setCountryId] = useState('')
  const [cities, setCities] = useState(null)
  const [cityValue, setCityValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [countryValue, setCountryValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [newPrepaireEvent, setNewPrepaireEvent] = useState(null)
  const [prepaireEvents, setPrepaireEvents] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [newPrepaireEventPos, setNewPrepaireEventPos] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const getPrepaireEvents = useCallback(
    (zoom, lng, lat) =>
      api.get(Endpoints.map.event).then(res => {
        prepaireEvents.forEach(pe => {
          pe.mapElement && pe.mapElement.remove()
        })
        const data = res.data.items.map(item => {
          const ref = createRef()
          ref.current = document.createElement('div')
          ReactDOM.render(
            <PrepaireEvent onClick={() => handlePrepaireEventClick(item)} data={item} created />,
            ref.current
          )
          const { longitude, latitude } = item.city
          const marker = new mapboxgl.Marker(ref.current)
            .setLngLat([longitude, latitude])
            .addTo(map.current)
          item.mapElement = marker
          return item
        })
        setPrepaireEvents(data)
        lng && lat && zoom && map.current.flyTo({ center: [lng, lat], zoom })
        !lng && !lat && zoom && map.current.flyTo({ zoom })
      }),
    [prepaireEvents]
  )

  const resetPrepaireEvent = () => {
    const { lng, lat } = newPrepaireEvent._lngLat
    setPrepaireEvent({ ...initialPrepaireEvent, type: prepaireEvent.type })
    setCountries(null)
    setCountryValue('')
    setCities(null)
    setCityValue('')
    newPrepaireEvent.remove()
    setNewPrepaireEvent(null)
    getPrepaireEvents(7, lng, lat)
    setNewPrepaireEventPos(null)
  }

  const onChangeCountry = e => {
    if (e.target.value.length > 1) {
      setLoading(true)
      api
        .get(Endpoints.map.countriesList(e.target.value))
        .then(({ data }) => setCountries(data))
        .finally(() => setLoading(false))
    }
    setCountryValue(e.target)
  }

  const showPrepaireEventCreating = (longitude, latitude) => {
    setNewPrepaireEventPos([longitude, latitude])
    map.current.flyTo({ center: [longitude, latitude], zoom: 5 })
    const ref = createRef()
    ref.current = document.createElement('div')
    ReactDOM.render(
      <PrepaireEvent onClick={handlePrepaireEventClick} prepaireEvent={prepaireEvent} />,
      ref.current
    )
    newPrepaireEvent && newPrepaireEvent.remove()
    const prepaireEventMarker = new mapboxgl.Marker(ref.current)
      .setLngLat([longitude, latitude])
      .addTo(map.current)
    setNewPrepaireEvent(prepaireEventMarker)
  }

  const onChangeCountryAutoComplete = (_, country) => {
    api
      .get(Endpoints.map.countriesList(country))
      .then(({ data }) => {
        const { id, longitude, latitude } = data.items[0]
        setCountryId(id)
        showPrepaireEventCreating(longitude, latitude)
      })
      .finally(() => setLoading(false))
  }

  const onChangeCity = e => {
    setLoading(true)
    api
      .get(Endpoints.map.citiesList(countryId, e.target.value))
      .then(({ data }) => setCities(data))
      .finally(() => setLoading(false))
    setCityValue(e.target)
  }

  const onChangeCityAutoComplete = (_, city) => {
    api
      .get(Endpoints.map.citiesList(countryId, city))
      .then(({ data }) => {
        const { id, longitude, latitude } = data.items[0]
        setPrepaireEvent(prev => ({ ...prev, cityId: id }))
        showPrepaireEventCreating(longitude, latitude)
      })
      .finally(() => setLoading(false))
  }

  const onMapMarkerClick = (timeoutFunc, longitude, latitude) => {
    if (!map.current) return
    map.current.flyTo({ center: [longitude, latitude], zoom: 4 })
    timeoutFunc &&
      setTimeout(() => {
        timeoutFunc()
      }, 500)
  }

  const handleMarkerClick = useCallback(
    (markerData, id) => {
      const { longitude, latitude } = markerData
      onMapMarkerClick(
        () => setModalData({ ...modalData, ...markerData, isOpen: true, modalType: 'marker' }),
        longitude,
        latitude
      )
      id && setSelectedId(id)
    },
    [modalData]
  )

  const handlePrepaireEventClick = data => {
    const { longitude, latitude } = data.city
    onMapMarkerClick(
      () => setModalData({ ...modalData, ...data, isOpen: true, modalType: 'PrepaireEvent' }),
      longitude,
      latitude
    )
  }

  const handlePrepaireEventDelete = id => {
    setPageLoading(true)
    api
      .delete(Endpoints.map.deleteEvent(id))
      .then(() => {
        enqueueSnackbar('Prepaire event was deleted successfully', { variant: 'success' })
        setModalData(prev => ({ ...prev, isOpen: false }))
        getPrepaireEvents(3)
      })
      .catch(() => enqueueSnackbar('Prepaire event has not been deleted', { variant: 'error' }))
      .finally(() => {
        setPageLoading(false)
      })
  }

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom,
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      projection: 'mercator',
      renderWorldCopies: false,
    })
  }, [])

  useEffect(() => {
    setDiseasesData(
      diseasesData.map(data => ({
        ...data,
        map: data.map.map(mapData => {
          if (mapData.mapElement) {
            mapData.mapElement.remove()
            delete mapData.mapElement
          }
          if (
            mapFilter.diseases[mapData.disease] &&
            (mapData.name.toLowerCase().includes(mapFilter.byCountry.toLowerCase()) ||
              !mapFilter.byCountry)
          ) {
            const ref = createRef()
            ref.current = document.createElement('div')
            ReactDOM.render(
              <MapMarker onClick={handleMarkerClick} markerData={mapData} />,
              ref.current
            )
            const { latitude, longitude } = mapData
            const marker = new mapboxgl.Marker(ref.current)
              .setLngLat([longitude, latitude])
              .addTo(map.current)
            mapData.mapElement = marker
          }
          return mapData
        }),
      }))
    )
  }, [mapFilter])

  useEffect(() => {
    newPrepaireEventPos && showPrepaireEventCreating(...newPrepaireEventPos)
  }, [prepaireEvent.type])

  useEffect(() => {
    if (!map.current) return
    map.current.on('load', () => {
      map.current.addControl(new mapboxgl.NavigationControl())
    })
  }, [])

  useEffect(() => {
    if (!map.current) return
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  }, [])

  useEffect(() => {
    api
      .get(Endpoints.diseaseMaps.list)
      .then(({ data }) => {
        const promises = data.items.map(({ id }) => api.get(Endpoints.diseaseMaps.details(id)))
        return Promise.all(promises).then(res => {
          const data = res.map(({ data }) => ({
            ...data,
            map: data.map.map(country => ({
              ...country,
              disease: data.disease,
              diseaseId: data.id,
            })),
          }))
          setDiseasesData(data)
          setMapFilter({
            diseases: Object.fromEntries(data.map(({ disease }) => [disease, true])),
            byCountry: '',
          })
        })
      })
      .then(() => getPrepaireEvents())
      .finally(() => setPageLoading(false))
  }, [])

  return (
    <div style={{ height: '100vh', width: '100vw', paddingTop: 80, position: 'relative' }}>
      <MapSidebar
        diseasesData={diseasesData}
        selectedId={selectedId}
        handleMarkerClick={handleMarkerClick}
        setMapFilter={setMapFilter}
        mapFilter={mapFilter}
        loading={loading}
        onChangeCountryAutoComplete={onChangeCountryAutoComplete}
        countries={countries}
        countryId={countryId}
        countryValue={countryValue}
        onChangeCountry={onChangeCountry}
        onChangeCityAutoComplete={onChangeCityAutoComplete}
        cityValue={cityValue}
        cities={cities}
        onChangeCity={onChangeCity}
        prepaireEvent={prepaireEvent}
        setPrepaireEvent={setPrepaireEvent}
        setCountries={setCountries}
        setCountryValue={setCountryValue}
        setCities={setCities}
        setCityValue={setCityValue}
        newPrepaireEvent={newPrepaireEvent}
        getPrepaireEvents={getPrepaireEvents}
        resetPrepaireEvent={resetPrepaireEvent}
      />
      <MapModal
        handlePrepaireEventDelete={handlePrepaireEventDelete}
        data={modalData}
        setData={setModalData}
      />
      <div
        style={{ height: '100%', width: '100vw' }}
        ref={mapContainer}
        className='map-container'
      />
      {pageLoading && <CircularProgressComponent />}
    </div>
  )
}
