angular.module('assignmentApp', []);

angular.module('assignmentApp').controller("AssignmentController", function($http){


  var vm = this;

  vm.message = 'way to display!';
  $http.get('/assign').then(function(response){
    console.log('success getting',response);
    vm.assignments = response.data;
  }, function(response){
    console.log('failure getting');
  });


vm.doAction = function (){
  console.log('you have clicked');

  var sendData = {};

  sendData.assignment_number = vm.assignment_number;
  sendData.student_name = vm.student_name;
  sendData.score = vm.score;
  sendData.date_completed = vm.date_completed;
  sendData.extras = vm.extras;

  $http.post('/assign/createAssignment', sendData).then(function(response){
    console.log(response);
  }, function(response){
    console.log('failure posting');
  })

$http.get('/assign').then(function(response){
  console.log('success getting',response);
  vm.assignments = response.data;
}, function(response){
  console.log('failure getting');
})
} //end click function

vm.removeAction = function(){
console.log('you have clicked REMOVE');
$http.delete('/assign/removeWithId/' + vm._id ).then(function(response){
vm.assignment = response.data;
}, function(response){
  console.log('failure deleting');
})


} //end delete function

}) //end controller
