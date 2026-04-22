const https = require('https');

https.get('https://raw.githubusercontent.com/rukku/ph-province-boundaries/master/RIZAL.geojson', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const geojson = JSON.parse(data);
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    
    function extract(arr) {
      if (typeof arr[0] === 'number') {
        minLng = Math.min(minLng, arr[0]);
        maxLng = Math.max(maxLng, arr[0]);
        minLat = Math.min(minLat, arr[1]);
        maxLat = Math.max(maxLat, arr[1]);
      } else {
        arr.forEach(extract);
      }
    }
    
    geojson.features.forEach(f => extract(f.geometry.coordinates));
    console.log(`[[${minLat}, ${minLng}], [${maxLat}, ${maxLng}]]`);
  });
});
