import NodeGeocoder from "node-geocoder";



var geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: '5d4a217dcff4408cace3aef589f74d6a'
});

// Using callback
export default geocoder;
