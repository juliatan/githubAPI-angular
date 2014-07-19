var app = angular.module("github",[]);

app.controller('GithubController', ['$scope', '$http', function ($scope, $http) {

    // var repos;
    // var noOfRepos;
    $scope.repoLanguages = [];
    $scope.repoNames = [];
    $scope.commitMessages = [];
    $scope.commitWords =[];

    $scope.commits = [];

    $http.get("https://api.github.com/users/juliatan/repos")
    .success(function(data){
        $scope.repos = data;
        // console.log($scope.repos)

        $scope.repos.map(function(repo){
          $scope.repoNames.push(repo.name);
          $scope.repoLanguages.push(repo.language);
        })

      $scope.ruby = $scope.repoLanguages.filter(function(language) {return language === "Ruby"}).length
      $scope.javascript = $scope.repoLanguages.filter(function(language) {return language === "JavaScript"}).length
      $scope.css = $scope.repoLanguages.filter(function(language) {return language === "CSS"}).length
      $scope.none = $scope.repoLanguages.filter(function(language) {return language === null}).length

      $scope.noOfRepos = $scope.repoNames.length;

      $scope.repoNames.map(function(repoName){
        $http.get("https://api.github.com/repos/juliatan/" + repoName + "/commits")
        .success(function(data){
          $scope.commits = data;
          $scope.commits.map(function(commitData){
            $scope.commitMessages.push(commitData.commit.message);
          })
          $scope.commitMessages.map(function(message){
            message.split(" ").map(function(word){
              $scope.commitWords.push(word.replace(/[.,]$/g,"").toLowerCase());
            })
          })

          $scope.wordCount = _.flatten($scope.commitWords).reduce(function (acc, curr){
            if (typeof acc[curr] == 'undefined') {
              acc[curr] = 1;
            } else {
              acc[curr] += 1;
            }

            return acc;
          }, {});

          $scope.values = $scope.wordCount;

          // console.log($scope.commitWords);
          // console.log($scope.wordCount);
         
        })
      })
    
    })


}]);