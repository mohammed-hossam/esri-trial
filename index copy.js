const data_trial = [
  {
    id: 1,
    address: '200 N Spring St, Los Angeles, CA 90012',
    longitude: -118.24354,
    latitude: 34.05389,
  },
  {
    id: 2,
    address: '419 N Fairfax Ave, Los Angeles, CA 90036',
    longitude: -118.31966,
    latitude: 34.13375,
  },
];

require([
  'esri/config',
  'esri/Map',
  'esri/views/MapView',

  'esri/Graphic',
  'esri/layers/GraphicsLayer',

  'esri/layers/FeatureLayer',
], function (esriConfig, Map, MapView, Graphic, GraphicsLayer, FeatureLayer) {
  esriConfig.apiKey =
    'AAPK0824cd7d2bec46faa7356b4d1e758da1CXq8aYFk18lCgz07ECLgE3yJ-xHIVsVjXnoCXyafSPS6QCXgUHMTd3IknRAaxxYy';

  const map = new Map({
    basemap: 'arcgis-topographic', // Basemap layer service
  });

  const view = new MapView({
    map: map,
    center: [26.8206, 30.8025], // Longitude, latitude
    zoom: 6, // Zoom level
    container: 'viewDiv', // Div element
  });

  //graphic layers:
  //A graphics layer is a container for graphics. It is used with a map view to display graphics on a map. You can add more than one graphics layer to a map view. Graphics layers are displayed on top of all other layers.
  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  //point:

  //Create a point and simpleMarkerSymbol that will be used to create a Graphic:
  const point = {
    //Create a point
    type: 'point',
    longitude: -118.80657463861,
    latitude: 34.0005930608889,
  };
  const simpleMarkerSymbol = {
    type: 'simple-marker',
    color: [226, 119, 40], // Orange
    outline: {
      color: [255, 255, 255], // White
      width: 1,
    },
  };

  //Create a Graphic and set the geometry and symbol properties. The Graphic class will autocast point and simpleMarkerSymbol when it is constructed:
  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
  });
  graphicsLayer.add(pointGraphic);

  //polyline:

  //Define the polyline and simpleLineSymbol that will be used to create a Graphic.
  const polyline = {
    type: 'polyline',
    paths: [
      [-118.821527826096, 34.0139576938577], //Longitude, latitude
      [-118.814893761649, 34.0080602407843], //Longitude, latitude
      [-118.808878330345, 34.0016642996246], //Longitude, latitude
    ],
  };
  const simpleLineSymbol = {
    type: 'simple-line',
    color: [226, 119, 40], // Orange
    width: 2,
  };

  //Create a Graphic and set the geometry and symbol properties. The Graphic class will autocast the polygon and simpleFillSymbol when it is created.
  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol,
  });
  graphicsLayer.add(polylineGraphic);

  //polygon

  //Define the polygon and simpleFillSymbol that will be used to create a Graphic
  const polygon = {
    type: 'polygon',
    rings: [
      [-118.818984489994, 34.0137559967283], //Longitude, latitude
      [-118.806796597377, 34.0215816298725], //Longitude, latitude
      [-118.791432890735, 34.0163883241613], //Longitude, latitude
      [-118.79596686535, 34.008564864635], //Longitude, latitude
      [-118.808558110679, 34.0035027131376], //Longitude, latitude
    ],
  };

  const simpleFillSymbol = {
    type: 'simple-fill',
    color: [227, 139, 79, 0.8], // Orange, opacity 80%
    outline: {
      color: [255, 255, 255],
      width: 1,
    },
  };

  //You can display a pop-up for a graphic when it is clicked. The code that creates the polygon graphic to show a pop-up containing the name and description of the graphic uses the attribute and popupTemplate properties.

  const popupTemplate = {
    title: '{Name}',
    content: '{Description}',
  };
  const attributes = {
    Name: 'this is the title',
    Description: 'I am a polygon',
  };

  //Create a Graphic and set the geometry and symbol properties. The Graphic class will autocast the polygon and simpleFillSymbol when it is created.
  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,

    attributes: attributes,
    popupTemplate: popupTemplate,
  });
  graphicsLayer.add(polygonGraphic);

  // featureLayer
  //   Trailheads feature layer (points)
  //   const trailheadsLayer = new FeatureLayer({
  //     url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0',
  //   });
  //   map.add(trailheadsLayer);

  //   const parksLayer = new FeatureLayer({
  //     url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0',
  //   });
  //   map.add(parksLayer, 0);

  const graphics = data_trial.map(function (place) {
    return new Graphic({
      attributes: {
        ObjectId: place.id,
        address: place.address,
      },
      geometry: {
        type: 'point',
        longitude: place.longitude,
        latitude: place.latitude,
      },
      symbol: {
        // autocasts as new SimpleMarkerSymbol()
        type: 'simple-marker',
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2,
        },
      },
    });
  });

  const featureLayer = new FeatureLayer({
    source: graphics,
    renderer: {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        // autocasts as new SimpleMarkerSymbol()
        type: 'simple-marker',
        color: '#102A44',
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: '#598DD8',
          width: 2,
        },
      },
    },
    popupTemplate: {
      // autocasts as new PopupTemplate()
      title: 'Places in Los Angeles',
      content: [
        {
          type: 'fields',
          fieldInfos: [
            {
              fieldName: 'address',
              label: 'العنوان',
              visible: true,
            },
          ],
        },
      ],
    },
    objectIdField: 'ObjectID', // This must be defined when creating a layer from `Graphic` objects
    fields: [
      {
        name: 'ObjectID',
        alias: 'ObjectID',
        type: 'oid',
      },
      {
        name: 'address',
        alias: 'address',
        type: 'string',
      },
    ],
  });

  map.layers.add(featureLayer); // or map.add(featureLayer);
});
