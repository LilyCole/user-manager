var app = angular.module("userApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/users", {
      templateUrl: "templates/user-list.html",
      controller: "UsersController",
      controllerAs: "usersCtrl"
    })
    .otherwise({
      redirectTo: "/users"
    })
});

app.controller("UsersController", function($http) {
  $http({
  method: 'GET',
  url: 'http://localhost:3000/users'
    }).success(function(response) {
        $('body').append(response);
    }).error(function(response) {
        alert("Error getting users");
    });
});