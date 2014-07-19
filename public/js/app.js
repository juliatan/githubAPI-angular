var app = angular.module("github",[]);

app.controller('GithubController', ['$scope', '$http', function ($scope, $http) {

    var repos;
    $scope.repoLanguages = [];
    $scope.repoNames = [];
    var noOfRepos;

    $http.get("https://api.github.com/users/juliatan/repos")
      .success(function(data){
        $scope.repos = data;
        console.log($scope.repos)

        $scope.repos.map(function(repo){
          $scope.repoNames.push(repo.name);
          $scope.repoLanguages.push(repo.language);
          // console.log($scope.reponames);
        })

      $scope.ruby = $scope.repoLanguages.filter(function(language) {return language === "Ruby"}).length
      $scope.javascript = $scope.repoLanguages.filter(function(language) {return language === "JavaScript"}).length
      $scope.css = $scope.repoLanguages.filter(function(language) {return language === "CSS"}).length
      $scope.none = $scope.repoLanguages.filter(function(language) {return language === null}).length

      $scope.noOfRepos = $scope.repoNames.length;
      })


}]);