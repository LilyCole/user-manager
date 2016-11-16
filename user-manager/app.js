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
    .when("/login", {
      templateUrl: "templates/login.html",
      controller: "loginController",
      controllerAs: "loginCtrl"
    })
    .otherwise({
      redirectTo: "/users"
    })
});

app.controller("UsersController", function($http, AuthService) {
  AuthService.isAuthenticated();

  var vm = this;

  $http({
  method: 'GET',
  url: 'http://localhost:3000/users',
  headers: {
    "Authorization": "Token token=" + AuthService.getToken()
  }
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
      headers: {
        "Authorization": "Token token=" + AuthService.getToken()
      },
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

app.controller("EditController", function($http, $routeParams, $location, AuthService) {
  AuthService.isAuthenticated();
  
  var vm = this;
  id = $routeParams.id;

  $http({
  method: 'GET',
  url: 'http://localhost:3000/users/'+id+'/edit',
  headers: {
        "Authorization": "Token token=" + AuthService.getToken()
  }
    }).success(function(response) {
        vm.user = response;
    }).error(function(response) {
        alert("Error getting users");
    });
  
  vm.submitEdits = function(event) {
    event.preventDefault();

    $http({
      method: 'PUT',
      url: 'http://localhost:3000/users/' + id,
      headers: {
        "Authorization": "Token token=" + AuthService.getToken()
      },
      data: {
          user: vm.user
        }
      }).success(function(response) {
          $location.path("/users");
      }).error(function(response) {
          alert("Error editing user");
      });
  }

});

app.controller("loginController", function($http, $location, AuthService) {

  var vm = this;

  vm.loginUser = function(event) {
    event.preventDefault();

    $http({
      method: "POST",
      url: "http://localhost:3000/login",
      data: vm.user
    }).success(function(user) {
      AuthService.setSession(user);
      $location.path("/users");
    }).error(function() {
      alert("Unauthorized!");
    });
  }

});

app.service("AuthService", function($location) {

  this.setSession = function(user) {
    return localStorage.setItem("current_user", JSON.stringify(user));
  }

  this.getToken = function() {
    var currentUser = JSON.parse(localStorage.getItem("current_user"));
    return currentUser.auth_token;
  }

  this.currentUser = function() {
    return JSON.parse(localStorage.getItem("current_user"));
  }

  this.isAuthenticated = function() {
    if (this.getToken()) {
      return;
    } else {
      $location.path("/login");
    }
  }

});
