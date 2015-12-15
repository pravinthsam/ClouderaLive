var tutorialPages;

  tutorialPages = [
  {  "partial": "partials/tutorial/home.html", "path":"/tutorial/home",  "title":"Introduction"},
  {  "partial": "partials/tutorial/getting_started.html", "path":"/tutorial/getting_started",  "title":"Getting Started"},
  {  "partial": "partials/tutorial/ingest_structured_data.html", "path":"/tutorial/ingest_structured_data",  "title":"Tutorial Exercise 1"},
  {  "partial": "partials/tutorial/query_structured_data.html", "path":"/tutorial/query_structured_data",  "title":"Tutorial Exercise 2"},
  {  "partial": "partials/tutorial/showing_big_data_value.html", "path":"/tutorial/showing_big_data_value",  "title":"Showing Big Data Value"},
  {  "partial": "partials/tutorial/correlate_structured_and_unstructured_data.html", "path":"/tutorial/correlate_structured_and_unstructured_data",  "title":"Tutorial Exercise 3"},
  {  "partial": "partials/tutorial/advanced_analytics_in_the_same_platform.html", "path":"/tutorial/advanced_analytics_in_the_same_platform",  "title":"Advanced Analytics in the Same Platform"},
  {  "partial": "partials/tutorial/relationship_strength_using_spark.html", "path":"/tutorial/relationship_strength_using_spark",  "title":"Tutorial Exercise 4"},
  {  "partial": "partials/tutorial/showing_data_hub_value.html", "path":"/tutorial/showing_data_hub_value",  "title":"Showing \"Data Hub\" Value"},
  {  "partial": "partials/tutorial/explore_log_events.html", "path":"/tutorial/explore_log_events",  "title":"Tutorial Exercise 5"},
//  {  "partial": "partials/tutorial/real_search_in_big_data.html", "path": "/tutorial/real_search_in_big_data", "title": "Realtime search in BigData"},
  {  "partial": "partials/tutorial/building_a_dashboard.html", "path":"/tutorial/building_a_dashboard",  "title":"Tutorial Exercise 6"},
  {  "partial": "partials/tutorial/data_governance_and_compliance.html", "path":"/tutorial/data_governance_and_compliance", "title":"Data Governance and Compliance"},
  {  "partial": "partials/tutorial/using_cloudera_navigator.html", "path":"/tutorial/using_cloudera_navigator", "title":"Tutorial Exercise 7"},
  {  "partial": "partials/tutorial/the_end_game.html", "path":"/tutorial/the_end_game",  "title":"The End Game"}
  ];

  if(platform == 'gogrid') {
    tutorialPages.splice(1, 0, {"partial": "partials/tutorial/go_grid.html", "path":"/tutorial/go_grid",  "title":"Your Cloudera Cluster"});
    if(flavor == 'cloudera-tableau' || flavor == 'cloudera-pentaho') {
        tutorialPages.splice(2, 0, {"partial": "partials/tutorial/go_grid_rdc.html", "path":"/tutorial/go_grid_rdc",  "title":"Your Cloudera Cluster II"});
    }
  }
  if(platform == 'aws') {
    tutorialPages.splice(1, 0, {"partial": "partials/tutorial/aws.html", "path":"/tutorial/aws",  "title":"Your Cloudera Cluster"});
  }
  if(platform == 'quickstart') {
    for (var i = 0; i < tutorialPages.length; i++) {
      if (tutorialPages[i]['title'] == 'Data Governance and Compliance') {
        tutorialPages.splice(i, 2);
        break
      }
    }
  }

data_node_indices = [];
for(i = 0; i < cluster_data.data_nodes.length; i++) {
    data_node_indices[i] = i;
}

tutorialWebApp = angular.module('tutorialWebApp', ['ngRoute', 'zeroclipboard']);

tutorialWebApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/', {templateUrl: 'partials/guidance.html', controller: "PageCtrl"});

  $routeProvider.when('/step1', {templateUrl: 'partials/progress/step1.html', controller: "ProgressCtrl"});
  $routeProvider.when('/step2', {templateUrl: 'partials/progress/step2.html', controller: "ProgressCtrl"});
  $routeProvider.when('/step3', {templateUrl: 'partials/progress/step3.html', controller: "ProgressCtrl"});

  for(var i = 0; i < tutorialPages.length; i++) {
    var page = tutorialPages[i];
    $routeProvider.when(page.path, {templateUrl: page.partial, controller: "TutorialCtrl"});
  }
}]);

tutorialWebApp.config(['uiZeroclipConfigProvider', function(uiZeroclipConfigProvider) {

  // config ZeroClipboard
  uiZeroclipConfigProvider.setZcConf({
    swfPath: 'js/ZeroClipboard.swf'
  });

}])

tutorialWebApp.controller('PaginationCtrl', function($scope,$location) {

  $scope.tutorialPages = tutorialPages;

  $scope.thisPageIndex = function() {
    var tutorialPages = $scope.tutorialPages;
    for(var i = 0; i < tutorialPages.length; i++) {
      var navPage = tutorialPages[i];
      if($location.path() == navPage.path) {
        return i;
      }
    }
  }

  $scope.lastPageTitle = function() {
    var lastPage = $scope.lastPage();
    if (lastPage) return lastPage.title;
  }

  $scope.lastPageUrl = function() {
    var lastPage = $scope.lastPage();
    if (lastPage) return lastPage.path;
  }

  $scope.lastPage = function() {
    var thisPageIndex = $scope.thisPageIndex();
    if(thisPageIndex > 0) {
      return $scope.tutorialPages[(thisPageIndex - 1)];
    }
  }

  $scope.nextPage = function() {
    var thisPageIndex = $scope.thisPageIndex();
    if(thisPageIndex < (tutorialPages.length - 1)) {
      return $scope.tutorialPages[(thisPageIndex + 1)];
    }
  }


  $scope.nextPageTitle = function() {
    var nextPage = $scope.nextPage();
    if(nextPage) return nextPage.title;
  }

  $scope.nextPageUrl = function() {
    var nextPage = $scope.nextPage();
    if(nextPage) return nextPage.path;
  }

});


tutorialWebApp.controller('NavCtrl', function($scope,$location) {


  $scope.cluster_ready = ($location.path().indexOf("step") == -1);
  $scope.flavor = flavor;
  $scope.platform = platform;
  $scope.cluster_data = cluster_data;

  $scope.isActive = function(route) {
    return route === $location.path();
  }

  $scope.flavor = flavor;

  $scope.tutorialPages = tutorialPages;
  $scope.thisPageIndex = function() {
    var tutorialPages = $scope.tutorialPages;
    for(var i = 0; i < tutorialPages.length; i++) {
      var navPage = tutorialPages[i];
      if($location.path() == navPage.path) {
        return i;
      }
    }
  }

  $scope.currentPage = function() {
    var thisPageIndex = $scope.thisPageIndex();
    return $scope.tutorialPages[thisPageIndex];
  }

  $scope.currentPageTitle = function() {
    var currentPage = $scope.currentPage();
    var pageTitle = "";
    if(currentPage) {
      pageTitle = currentPage.title;
    }
    return pageTitle;
  }

});

tutorialWebApp.controller('TutorialCtrl', function ($scope,$location) {
  $scope.cluster_data = cluster_data;
  $scope.user = user;
  $scope.platform = platform;
  $scope.flavor = flavor;
  $scope.lib_dir = parcels ? '/opt/cloudera/parcels/CDH/lib' : '/usr/lib';
  $scope.prompt = '[' + user + '@' + cluster_data.master_node + ' ~]' +
    ((user == 'root') ? '#' : '$');

  $scope.zookeeper_connection_string = cluster_data.data_nodes.map(function(x) {return x+":2181"}).join(',');
  $scope.data_node_indices = data_node_indices;

  $scope.tutorialPages = tutorialPages;

  $scope.isActive = function(route) {
    console.log("Inside of isActive in TutorialCtrl");
    return route === $location.path();
  }
});

tutorialWebApp.controller('ProgressCtrl', function($scope,$location) {
  console.log("In the progress controller");
});

tutorialWebApp.controller('PageCtrl', function ($scope,$location) {
  $scope.cluster_data = cluster_data;
  $scope.data_node_indices = data_node_indices;
  $scope.platform = platform;
  $scope.flavor = flavor;
});
