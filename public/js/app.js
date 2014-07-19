var app = angular.module("github",[]);

app.controller('GithubController', ['$scope', '$http', function ($scope, $http) {

    var repos;
    $scope.repoNames = [];
    var noOfRepos;

    $http.get("https://api.github.com/users/juliatan/repos")
      .success(function(data){
        $scope.repos = data;
        // console.log($scope.repos)

        $scope.repos.map(function(repo){
          $scope.repoNames.push(repo.name);
          // console.log($scope.reponames);
        })

      $scope.noOfRepos = $scope.repoNames.length;
      })


}]);