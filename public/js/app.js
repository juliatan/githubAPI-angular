var app = angular.module("github",[]);

app.controller('GithubController', ['$scope', '$http', function ($scope, $http) {

    var repos;

    $http.get("https://api.github.com/users/juliatan/repos")
      .success(function(data){
        $scope.repos = data;
        console.log($scope.repos);
      })

}]);