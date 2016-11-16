var app = angular.module("userApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/users", {
      templateUrl: "templates/user-list.html",
      controller: "UsersController",
      controllerAs: "usersCtrl"
    })
    .when("/users/:id/edit", {
      templateUrl: "templates/edit-user.html",
      controller: "EditController",
      controllerAs: "editCtrl"
    })
    .otherwise({
      redirectTo: "/users"
    })
});

app.controller("UsersController", function($http) {

  var vm = this;

  $http({
  method: 'GET',
  url: 'http://localhost:3000/users'
    }).success(function(response) {
        vm.users = response;
    }).error(function(response) {
        alert("Error getting users");
    });

  vm.submitUser = function(event) {
    event.preventDefault();
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users',
      data: {
          user: vm.user
        }
      }).success(function(newUser) {
          vm.users.push(newUser);
          vm.user = {};
          $("#add-user-modal").modal("hide");
      }).error(function(response) {
          alert("Error saving user");
      });
  }
  
});