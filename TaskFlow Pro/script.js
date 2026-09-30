const form=document.getElementById("task-form");
const taskName=document.getElementById("task-name");
const progress_status= document.getElementById("status");
const dueDate=document.getElementById("due-date");
const priority=document.getElementById("priority");
const addBtn=document.getElementById("add-btn");
const showtbdoy=document.getElementById("taskTbody");


form.addEventListener("submit",function(event){
   event.preventDefault();

   const taks={
      name:taskName.value,
      status:priority.value,
      dueDate: dueDate.value,
      priority:priority.value
   };
});

function displayTasks(){
   showtbdoy.innerHTML="";
   taks
}


