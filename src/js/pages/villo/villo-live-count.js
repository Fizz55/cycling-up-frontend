import mapboxgl from 'mapbox-gl';


const MAP_VILLO_API_URL = 'http://data-mobility.brussels/geoserver/bm_bike/wfs?service=wfs&version=1.1.0&request=GetFeature&srsName=EPSG:4326&outputFormat=json&typeName=bm_bike:rt_counting';

let villoMap;
// eslint-disable-next-line
let jsonData;


export function showMap(container) {
  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

  villoMap = new mapboxgl.Map({
    container,
    style: process.env.MAPBOX_STYLE,
    zoom: 11.5,
    center: [4.355, 50.847]
  });

  window.addEventListener('load', () => {
    villoMap.resize();
  });

  villoMap.on('load', () => {
    villoMap.loadImage('../assets/icons/noun_marker.png', function(
      error,
      image
    ) {
      if (error) throw error;
      villoMap.addImage('Villo!', image);
    });
    showVilloStationsLayer();
  });
};

const showVilloStationsLayer = () => {
  villoMap.addSource('bikeVillo', {
    type: 'geojson',
    data: MAP_VILLO_API_URL
  });

  villoMap.addLayer({
    id: 'bikeVillo',
    type: 'symbol',
    source: 'bikeVillo',
    filter: ['!', ['has', 'point_count']],
    layout: {
      visibility: 'visible',
      'icon-image': 'Villo!',
      'icon-size': 0.1
    }
  });
};

export function onChangeLanguage(translations) {
}
