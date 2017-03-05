

app.controller("MainStoreController", function($scope, $http) {
	
	$scope.product ={
		name:"",
		model:"",
		year:"",
		price:"",
		producer:"",
		available:""
	};
	
	$scope.products = [];
	
	$scope.addProduct = function(){
		console.log($scope.product);
		$http.post("http://localhost:9000/fresherangular/product/add", $scope.product)
    	.then(addProductSucces, addProductError);
		
	};
	var addProductSucces = function(res){
		console.log(res);
		$scope.products.push({
			name: res.config.data.name,
			model: res.config.data.model,
			year: res.config.data.year,
			price: res.config.data.price,
			producer: res.config.data.producer,
			available: parseInt(res.config.data.available)
		});
	};
	var addProductError = function(err){
		console.log(err);
	};
		
	$scope.increaseAvailable = function(index) {
		var id = index + 1;
		$http.get("http://localhost:9000/fresherangular/product/increase/"+ id)
    	.then(function(res){
    		console.log(res);
    		$scope.products[index].available = res.data.available;
    	});
    	
    }
    $scope.decreaseAvailable = function(index) {
    	var id = index + 1;
		if($scope.products[index].available >= 1){
			$http.get("http://localhost:9000/fresherangular/product/decrease/" + id)
	    	.then(function(res){
	    		$scope.products[index].available = res.data.available;
	    	});
		}
    }
    $scope.deleteProduct = function(index) {
    	$scope.products.splice(index, 1);
    }
    $scope.searchAll = function(){
    	$http.get("http://localhost:9000/fresherangular/product/list")
    	.then(onSucces, onError);
    };
    var onSucces = function(response){
    	$scope.products =response.data;
    };
    var onError = function(error){
    	$scope.error = "Could not find data";    
    };
    
  
        
});
app.directive("myDirective", function(){
	return{
		restrict: "EA",
		templateUrl:'/fresherangular/views/store/list.html'
	}
});