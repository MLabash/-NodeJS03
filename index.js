"use strict";
console.log("it works");
const express = require ("express");
const app = express();

var toDo = [];

app.get('/tasks', (request, response, next)=>{
  response.status(200).json(toDo);
});

app.post('/task',(request, response, next)=>{
  var task = {};
  task.task = request.query.task;
  if (task.task !== '' && task.task !== undefined){
    toDo.push(task);
    response.status(201).json({ addStatus:'Added successfully'});
  }
  else{
    response.status(404).json({ addStatus:'Task text not found'});
  }
});

app.patch('/task/:id',(request, response, next)=>{
  let index = request.params.id - 1;
  if ((toDo.length > 0)&&(index >= 0) && (index < toDo.length)&&(request.query.task !== '') && (request.query.task !== undefined)){
    toDo[index].task = request.query.task;
    response.status(200).json({updateStatus: 'Updated successfully'});
   }
   else{
     response.status(404).json({updateStatus: 'Task number not found' });
   }
});

app.delete('/task/:id',(request, response, next)=>{
  let index = request.params.id - 1;
    if ((toDo.length > 0)&&(index >= 0) && (index <= toDo.length)){
      toDo.splice(index, 1);
      console.log('the task has been removed');
      response.status(200).json({ deleteStatus:'deleted successfully'});
    }
    else{
      response.status(404).json({ deleteStatus:'Task number not found'});
    }
});

app.delete('/tasks',(request, response, next)=>{
  var taskNumber = toDo.length;
    if(taskNumber > 0){
      toDo.length = 0;
      response.status(200).json({ deleteStatus:'All tasks deleted successfully'});
    }
    else{
      response.status(404).json({ deleteStatus:'There is no tasks to delete'});
    }
});

app.listen(3000,()=>{
  console.log("application is listining");  
});

