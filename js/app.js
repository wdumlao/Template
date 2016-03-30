var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', '$http', 'toDoListService', 'toDoListFactory', function($scope, $http, toDoListService, toDoListFactory){
	
	$http({
		method: 'GET',
		url: 'json/example.json'
	}).then(function(data){
		//console.log(data);
		
		$scope.cars = data.data;
	}, function(data){
		//console.log(data);
	});
	
	toDoListService.addTodo('text');
	toDoListFactory.addToDo('text');
	
	
}]);

myApp.service("toDoListService", function(){ // anonymous function. A service returns this automatically
	this.toDoList = [];
	this.addTodo = function(toDo){
		console.log('service');
	};
	this.removeToDo = function(toDo){
		
	};
});

myApp.factory("toDoListFactory", function(){ // create an object and return the object
	var obj = {};
	
	obj.toDoList = [];
	
	obj.addToDo = function(toDo) {
		console.log('factory');
	};
	
	obj.removeTodo = function(toDo) {
		
	};
	
	return obj;
});

myApp.factory("ToDo", function(){
	return function(description, priority){
		return {
			description: description,
			priority: priority
		};
	};
});

myApp.directive('carList', function(){
	return {
		restrict: 'E',
		scope: {
			car: '=',
			title: '='
		},
		transclude: true,
		replace: true,
		template: "<div><div ng-transclude></div><span>{{title}}</span><h2>{{car.brand}}</h2><p>Model: {{car.model}}</p><p>Price: {{car.cost | currency}}</p><hr></div>",
		link: function(scope, elem, attrs){
			elem.bind('click', function(){
				console.log('Clicked');
			});
			
			var h2 = elem.find('h2');
			
			h2.click(function(){
				console.log('clicked on h2');
			});
			
			console.log(h2);
		},
		controller: function($scope){
			//console.log($scope.car);
		}
	};
});// Directive for car list
