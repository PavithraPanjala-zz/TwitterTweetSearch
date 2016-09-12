var app = angular.module('Twitter', ['ngResource', 'ngSanitize']);

app.controller('TweetList', function($scope, $resource, $timeout) {

   
    function init () {

		$scope.username = "";
      
      $scope.tweetsResult = [];

      $scope.msnry = new Masonry('#tweet-list', {
        columnWidth: 320,
        itemSelector: '.tweet-item',
        transitionDuration: 0,
        isFitWidth: true
      });

      twttr.events.bind('loaded', function () {
        $scope.msnry.reloadItems();
        $scope.msnry.layout();
      });

      $scope.getTweets();
    }
    function getTweets (paging) {

      var params = {
        action: 'user_timeline',
        user: $scope.username
      };

      if ($scope.maxId) {
        params.max_id = $scope.maxId;
      }

      $scope.tweets = $resource('/tweets/:action/:user', params);

      $scope.tweets.query( { }, function (res) {

        if( angular.isUndefined(paging) ) {
          $scope.tweetsResult = [];
        }

        $scope.tweetsResult = $scope.tweetsResult.concat(res);

        $scope.maxId = res[res.length - 1].id;

        $timeout(function () {
          twttr.widgets.load();
        }, 30);
      });
    }

 
    $scope.getTweets = function () {
      $scope.maxId = undefined;
      getTweets();
    }

    $scope.getMoreTweets = function () {
      getTweets(true);
    }

    init();
});