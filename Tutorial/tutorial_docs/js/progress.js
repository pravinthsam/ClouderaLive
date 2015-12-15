setTimeout( function() {
    location.reload(true);
}, 10000);

tutorialWebApp = angular.module('tutorialWebApp', ['ngRoute']);

tutorialWebApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/progress/step.html', controller: "ProgressCtrl"});
}]);

$.ajax({
  url: 'js/progress.json',
  async: false,
  dataType: 'json',
  success: function (response) {
    tutorialWebApp.controller('ProgressCtrl', function($scope,$location) {
      $scope.step_i = response.step_i;
      $scope.step_n = response.step_n;
      $scope.step_text = response.step_text;
      $scope.step_percent = response.step_percent;
    });
  }
});


