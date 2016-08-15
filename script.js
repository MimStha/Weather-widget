'use strict';
var app = angular.module('weatherWidget', []);

// Factory (Service)
app.factory('weatherWidgetService', ['$http', '$q', function($http, $q) {
  function getweatherForecast() {
    var deferred = $q.defer();
    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20%28select%20woeid%20from%20geo.places%281%29%20where%20text%3D%22fairfax%2C%20va%22%29&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke').success(function(data) {
      deferred.resolve(data);
    }).error(function(err) {
      console.log("Error, could not retrieve weather.")
      deferred.reject(err);
    });
    return deferred.promise;
  }
  return {
    getweatherForecast: getweatherForecast
  };
}]);

// Controller
app.controller('weatherWidgetCtrl', ['$scope', 'weatherWidgetService', function($scope, weatherWidgetService) {
  function getWeatherForecast() {
    weatherWidgetService.getweatherForecast().then(function(data) {
      $scope.data = data;
      $scope.widgetData = data.query.results.channel.item;
      let getTitle = $scope.widgetData.title.split(" ");
      $scope.title = getTitle[2] + " " + getTitle[3].replace(",", "");
    });
  }
  getWeatherForecast();
}]);