

app.controller("DetailController", function($scope, $http, $routeParams) {
	
	var id = $routeParams.id;
	
	$scope.product ={
		name:"",
		model:"",
		year:"",
		price:"",
		producer:"",
		available:""
	};
	
	$http.get("http://localhost:9000/fresherangular/product/get/"+ id)
	.then(function(res){		
		$scope.product = res.data;
	});					
    
});