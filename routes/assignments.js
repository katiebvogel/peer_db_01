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

}); //end post

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

    console.log('assignment deleted');
    response.sendStatus(200);
  }

})
});
// router.get('/assign', function(request, response){
//   Assignment.find({assignmet_number: {$exists: true}}, function(err, assignments){
//     if(err){
//       console.log('error finding your stuff', err);
//       response.sendStatus(500);
//     }else {
//       console.log('Found Assignmet', assignments);
//       response.send(assignments);
//     }
//   })
// });

module.exports = router;
