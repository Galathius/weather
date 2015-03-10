require.config({
  baseUrl: 'js',
  paths: {
    jquery: 'vendor/jquery-2.1.3.min',
    simple_weather: 'vendor/jquery.simpleWeather'
  },
  shim: {
    simple_weather: {
      deps: ['jquery']
    }
  }
});

require([ 'weather' ], function(Weather) {
  Weather('.location-wrapper input[type="text"]', '.weather', '.errors')
});