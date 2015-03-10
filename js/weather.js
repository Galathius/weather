define([ 'jquery', 'simple_weather', 'utils' ], function ($, SimpleWeather, Utils) {
  var INPUT_DELAY = 500,
    UNIT = 'f';

  var Weather = function (inputSelector, displaySelector, errorsSelector) {
    var input = $(inputSelector),
      weatherBlock = $(displaySelector),
      errorsBlock = $(errorsSelector);

    var getIconClass = function (iconCode) {
      return 'icon-' + iconCode
    };

    var getResolvedLocation = function (city, region) {
      var location = [];

      if (city.length) { location.push(city) }
      if (region.length) { location.push(region) }

      return location.join(', ')
    };

    var onWeatherLoadedSuccess = function (weather) {
      var icon = '<i class="' + getIconClass(weather.code) + '"></i> ';
      var temp = [icon, weather.temp, '&deg;', weather.units.temp].join('');

      weatherBlock.find('h2').html(temp);
      weatherBlock.find('li.location').html(getResolvedLocation(weather.city, weather.region));
      weatherBlock.find('li.currently').html(weather.currently);
    };

    var onWeatherLoadedError = function (error) {
      weatherBlock.addClass('empty');
      errorsBlock.html(error.message);
    };

    var disableLoader = function (callback) {
      return function (data) {
        weatherBlock.removeClass('enable-loader');
        callback(data)
      }
    };

    var onInputHandler = function () {
      errorsBlock.html('');
      weatherBlock.removeClass('empty').addClass('enable-loader');
      Utils.delay(function () {
        var location = input.val();
        if (location) {
          $.simpleWeather({
            location: location,
            unit: UNIT,
            success: disableLoader(onWeatherLoadedSuccess),
            error: disableLoader(onWeatherLoadedError)
          });
        } else {
          weatherBlock.addClass('empty')
        }
      }, INPUT_DELAY)
    };


    $(inputSelector).on('input', onInputHandler);
  };

  return Weather;
});

