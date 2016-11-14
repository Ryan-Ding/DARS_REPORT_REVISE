'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]);
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.when('/', {
            templateUrl : 'index.html',
            controller: 'myFirstController'
        })

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

$(function () {			
                    $('a[data-toggle="collapse"]').on('click',function(){
				
				var objectID=$(this).attr('href');
				
				if($(objectID).hasClass('in'))
				{
                                    $(objectID).collapse('hide');
				}
				
				else{
                                    $(objectID).collapse('show');
				}
                    });
                    
                    
                    $('#expandAll').on('click',function(){
                        
                        $('a[data-toggle="collapse"]').each(function(){
                            var objectID=$(this).attr('href');
                            if($(objectID).hasClass('in')===false)
                            {
                                 $(objectID).collapse('show');
                            }
                        });
                    });
                    
                    $('#collapseAll').on('click',function(){
                        
                        $('a[data-toggle="collapse"]').each(function(){
                            var objectID=$(this).attr('href');
                            $(objectID).collapse('hide');
                        });
                    });
                    
		});


app.controller('myFirstController', ['$scope','$http',  function($scope, $http) {
    $http.get('./data/classes.json').
    success(function(data){
      $scope.classes = data;
      
      $scope.noFilter1= data;
      $scope.noFilter1=[];
      
      $scope.noFilter2= data;
      $scope.noFilter2=[];
      
      $scope.noFilter3= data;
      $scope.noFilter3=[];

      $scope.add = function (newClass) {
        console.log(newClass);
        if(newClass.requirement=="Required Courses") 
          {
            $scope.noFilter1.push(newClass);
          }

          else if(newClass.requirement=="Technical Electives") 
          {
            $scope.noFilter2.push(newClass);
          }
          else if(newClass.requirement=="Social Sciences and Humanities") 
          {
            $scope.noFilter3.push(newClass);
          }
    };

    $scope.completed = function () {
            var count =0;

        for(var i=0; i<$scope.classes.length;i++) 
          {
            if($scope.classes[i].status=="Completed") 
          {
            count+=$scope.classes[i].hours;
          }
          }
              return count;
              };

    $scope.inProgress = function () {
            var count =0;

        for(var i=0; i<$scope.classes.length;i++) 
          {
            if($scope.classes[i].status=="In-Progress") 
          {
            count+=$scope.classes[i].hours;
          }
          }
              return count;
              };
    $scope.registered = function () {
            var count =0;

        for(var i=0; i<$scope.classes.length;i++) 
          {
            if($scope.classes[i].status=="Registered") 
          {
            count+=$scope.classes[i].hours;
          }
          }
              return count;
              };
      /*$scope.orderByMe = function(movies) {
      $scope.myOrderBy = movies;
      }*/
    }).
    error(function(err){
    });
}]);
