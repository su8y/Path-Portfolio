const curvedRouteCoordinates = [
    [127.0, 37.5],     // 한국 (서울 근처)
    [140.0, 45.0],     // 일본 북부 상공
    [165.0, 50.0],     // 북태평양 상공 (점차 북쪽으로 이동)
    [140.0, 45.0],     // 일본 북부 상공
    [-130.0, 42.0],    // 미국 오레곤 상공
    [-122.4, 37.7],    // 샌프란시스코 상공
    [-118.2, 34.0]     // 로스앤젤레스
];
let zoomLevel = null;
document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('mapContainer');
    const mapDiv = document.getElementById('map');
    const historyItems = document.querySelectorAll('.work-item');
    const toggleMapBtn = document.getElementById('toggleMapBtn');
    let flag = false

    let map;

    initializeMap(); // 맵초기화

    function initializeMap() {
        maplibregl.accessToken = 'YOUR_MAPLIBRE_API_KEY';
        map = new maplibregl.Map({
            container: 'map',
            // style:'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json',
            style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
            // style:'https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: [127.0017, 37.5665],
            zoom: 10
        });

        map.on('load', function() {
            visualizeRoute(historyItems);
        });
    }

    function visualizeRoute(items) {
        if (!map) return;

        if (map.getLayer('history-route-line')) map.removeLayer('history-route-line');
        if (map.getSource('history-route')) map.removeSource('history-route');
        document.querySelectorAll('.maplibregl-marker').forEach(marker => marker.remove());

        // const curvedRouteCoordinates = [
        //   [127.1265, 37.4139],
        //   [127.1350, 37.4200],
        //   [127.1500, 37.4050],
        //   [127.1800, 37.4100],
        //   [127.2050, 37.4000],
        //   [127.2300, 37.4150],
        //   [127.2450, 37.4200],
        //   [127.2610, 37.4290]
        // ];


        const bounds = new maplibregl.LngLatBounds();
        for (const coord of curvedRouteCoordinates) {
            bounds.extend(coord);
        }

        const center = bounds.getCenter();
        const northeast = bounds.getNorthEast();
        const southwest = bounds.getSouthWest();

        const latDelta = northeast.lat - southwest.lat;

        let lngDelta = northeast.lng - southwest.lng;
        if (lngDelta < 0) {
            lngDelta += 360;
        }

        const maxDelta = Math.max(latDelta, lngDelta);


        const padding = 20;
        zoomLevel = map.cameraForBounds(bounds, { padding: padding }).zoom;

        map.flyTo({
            center: bounds.getCenter(),
            zoom: zoomLevel,
            speed: 1.5
        })
        map.once('moveend', () => {
            const currentBounds = map.getBounds();
            map.setMinZoom(zoomLevel);
            map.setMaxBounds(currentBounds);
        });


        for (let i = 0; i < items.length; i++) {
            const curvedRatio = (i + 1) / (items.length + 1);
            const point30 = GeoPort.getPointAtRatio(curvedRouteCoordinates, curvedRatio);
            new maplibregl.Marker({ color: 'red' })
                .setLngLat(point30)
                .setPopup(new maplibregl.Popup().setText(`${Math.round(curvedRatio * 100)}% 지점`))
                .addTo(map);

        }

        map.addSource('history-route', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: curvedRouteCoordinates
                }
            }
        });
        map.addLayer({
            id: 'history-route-line',
            type: 'line',
            source: 'history-route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.7
            }
        });
    }


    toggleMapBtn.addEventListener('click', function() {
        if (mapContainer.style.zIndex == -1 || mapDiv.style.opacity == 0.3) {
            mapContainer.style.zIndex = 999;
            mapDiv.style.opacity = 1;

            toggleMapBtn.textContent = '🗺️';

            if (!map) {
                initializeMap();
            } else {
                // Add a small delay to ensure the container is rendered before resizing
                setTimeout(() => {
                    if(!flag){
                        visualizeRoute(historyItems);
                        flag = true
                    }
                    map.resize();
                }, 100);
            }
        } else {
            toggleMapBtn.textContent = '📄';
            mapContainer.style.zIndex = -1;
            mapDiv.style.opacity = 0.3;
        }
    });

    historyItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Determine the ratio based on the item's index
            const ratio = (index + 1) / (historyItems.length+1);

            // Use the getPointAtRatio function from your library
            // to get the coordinates at that ratio
            const coords = GeoPort.getPointAtRatio(curvedRouteCoordinates, ratio);

            // Fly to the new location
            if (map && coords) {
                map.flyTo({
                    center: coords,
                    zoom: zoomLevel*2,
                    speed: 1.5
                });
            }
        });
    });
});