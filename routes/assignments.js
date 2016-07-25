var router = require('express').Router();

var Assignment = require('../models/assignments');

router.get('/', function(request, response){
  Assignment.find({}, function(err, assignments){
    if(err){
      console.log('Router error', err);
      response.sendStatus(500);
    }else {
      response.send(assignments);
    }
  })
}); //end get

router.post('/createAssignment', function(request, response){
  console.log('Creating Assignment');
  var data = request.body;

  var createdAssignment = new Assignment ({
    assignment_number: data.assignment_number,
    student_name: data.student_name,
    score: data.score,
    date_completed: data.date_completed,
    extras: data.extras
  });

  createdAssignment.save(function(err){
    if(err){
      console.log('Error Saving new assignment', err);
      response.sendStatus(500);
    } else {
      console.log('Data saved!', data);
      response.sendStatus(200);
    }
  });
}); //end posting

//for the individual remove button
router.delete('/deleteAssignmentWithId/:id', function(request, response){

    var id = request.params.id;

Assignment.findById(id, function(err, assignment){
  if (err){
    console.log('deletion error', err);
    response.sendStatus(500);
  } else {
    assignment.remove(function(err){
      if(err){
        console.log('Error deleting this assignment', err);
        response.sendStatus(500);
      }
    })

      console.log('you have deleted assignment:', id);
      response.sendStatus(200);

  }
})
});


//this is the router for the remove button that requires cut/paste or typing of the object id from the assignment
router.delete('/removeWithId/:id', function(request, response){
  var id = request.params.id;

  Assignment.findById(id, function(err, assignment){
    if (err){
      console.log('deletion error', err);
      response.sendStatus(500);
    } else {
      assignment.remove(function(err){
        if(err){
        console.log('removal error', err);
      }
    })

    console.log('assignment deleted', id);
    response.sendStatus(200);
  }

})
});




module.exports = router;
