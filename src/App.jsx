import { useEffect, useState} from 'react'
import './App.css'
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  input,
  Checkbox,
} from "@material-tailwind/react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [iniPending, finPending] = useState([{info:"",key:""}]);
  const [iniProgress, finProgress] = useState([{info:"",key:""}]);
  const [iniCompleted, finCompleted] = useState([{info:"",key:""}]);
  const [iniDeployed, finDeployed] = useState([{info:"",key:""}]);
  const [iniDeferred, finDeferred] = useState([{info:"",key:""}]);
  const [inputValue, setInputValue] = useState({ 
        Title:"",
        Description:"",
        StartDate:"",
        EndDate:"",
        Priority:"",
        Status:"",
        });
        const [inistate,finstate] = useState("");
  const [open, setOpen] = useState(false);
    //Window handeler
    const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todosdata');
    console.log(storedTodos)
    if (storedTodos) {
      JSON.parse(storedTodos).map((info,index)=>{
        console.log(info.Status)
        if(info.Status==="In Progress"){
          console.log("Hello1")
          finProgress((mydata)=>[...mydata,{info,key:index}])
        }
        if(info.Status==="Pending"){
          console.log(info)
          finPending((mydata)=>[...mydata,{info,key:index}])
        }
        if(info.Status ==="Completed"){
          console.log(index)
          finCompleted((mydata)=>[...mydata,{info,key:index}])
        }
        if(info.Status==="Deployed"){
          finDeployed((mydata)=>[...mydata,{info,key:index}])
        }
        if(info.Status==="Deferred"){
          finDeferred((mydata)=>[...mydata,{info,key:index}])
        }
      })
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if(todos.length !== 0){
      localStorage.setItem('todosdata', JSON.stringify(todos));
      
    }
  }, [todos]);

const setdata = (e)=>{
const {name,value} = e.target;
setInputValue((info)=>{
  return{
    ...info,
    [name]:value
  }
})
}


const deleteTodo = (index,key1) => {
  const data = todos[index];
  const Status = data.Status;
  if(Status==="In Progress"){
    const updatedTodos = iniProgress.filter((todo, i) => i !== key1);
    finProgress(updatedTodos)
  }
  if(Status==="Pending"){
    const updatedTodos = iniPending.filter((todo, i) => i !== key1);
    finPending(updatedTodos)
  }
  if(Status ==="Completed"){
    const updatedTodos = iniCompleted.filter((todo, i) => i !== key1);
    finCompleted(updatedTodos)
  }
  if(Status==="Deployed"){
    const updatedTodos = iniDeployed.filter((todo, i) => i !== key1);
    finDeployed(updatedTodos)
  }
  if(Status==="Deferred"){
    const updatedTodos = iniDeferred.filter((todo, i) => i !== key1);
    finDeferred(updatedTodos)  }
  const updatedTodos = todos.filter((todo, i) => i !== index);
  setTodos(updatedTodos);
};

  const addTodo = () => {
    if (inputValue.Description.trim() !== '') {
      setTodos([...todos, inputValue]);
      alert("Save...");
      setInputValue({ 
        Title:"",
        Description:"",
        StartDate:"",
        EndDate:"",
        Priority:"",
        Status:"",
        })
      
    }
    window.location.reload();
  };



  return (
<>
    <div class="bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-600  flex overflow-hidden text-sm">
 
  <div class="flex-grow overflow-hidden h-full flex flex-col">
    <div class="flex-grow flex overflow-x-hidden">
    
      <div class="flex-grow bg-white dark:bg-gray-800 overflow-y-auto">
        <div class="sm:px-7  px-4  flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
          <div class="flex w-full items-center">
            <div class="flex items-center text-3xl text-gray-900 dark:text-white">
              Task Board
            </div>
            <div class="ml-auto flex  items-center justify-end">
            <button onClick={handleOpen} className='flex mb-5 items-center space-x-3 sm:mt-7 mt-4 border border-gray-700 py-2 px-5 font-bold rounded-lg'>Add New Task</button>
            </div>
          </div>           
        </div>
      </div>
    </div>
  </div>
</div>
<div className='mt-5 boredr-2 border-green-100 w-full flex m-auto flex-wrap overflow-x-hidden   justify-evenly '>
      {    (iniPending.length!==0)?(<>     
      <div className='flex flex-col border-red-600 mt-3 p-1  w-60 xs:w-52 min-h-[60vh] border-2 items-center '>
      <h1 className='text-white flex py-2 w-full justify-center border-b-2 font-bold  bg-pink-800 border-white'>Pending</h1>
            {iniPending.map((todo, index) =>{
               if(!todo.key) return null;
          return(
            <>
            <div className='flex flex-col border-2  m-1  border-black  w-full '>
       <div key={index} class="  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
       <div class="mb-8">
        <p class="text-lg text-gray-800 flex font-bold items-center">
          Task {todo.key}
        </p>
        <hr ></hr>
        <div class="text-gray-900 font-semibold text-xl mb-2">{todo.info.Title}</div>
        <p class="text-gray-700 text-base">{todo.info.Description}</p>
      </div>
      <div class="flex justify-between items-center">
      <svg  onClick={() => deleteTodo(todo.key,index)} class="w-6 h-6 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>
  
      </div>
    </div>
         
            </div>
            </>
            )
       
        }

)}
</div>
          </>):(<></>)}
      {    (iniProgress.length!==0)?(<>
      <div className='flex flex-col border-red-200 mt-3 p-1  w-60 xs:w-52  min-h-[60vh] border-2 items-center '>
      <h1 className='text-white flex py-2 w-full justify-center border-b-2 font-bold bg-pink-200 border-white'>Progress</h1>
            {iniProgress.map((todo, index) =>{
              if(!todo.key) return null;
          return(
            <>
            <div className='flex flex-col border-2    m-1  border-black mt-2 w-full '>
       <div  class="border-r  border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
       <div class="mb-8">
        <p class="text-lg text-gray-800 flex font-bold items-center">
          Task {todo.key}
        </p>
        <hr ></hr>
        <div class="text-gray-900 font-semibold text-xl mb-2">{todo.info.Title}</div>
        <p class="text-gray-700 text-base">{todo.info.Description}</p>
      </div>
      <div class="flex justify-between items-center">

      <svg  onClick={() => deleteTodo(todo.key,index)} class="w-6 h-6 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>

  
      </div>
    </div>
         
            </div>
            </>
            )
       
        }

)}
</div>
          </>):(<></>)}
      {    (iniCompleted.length!==0)?(<>
        <div className='flex flex-col border-green-400 mt-3 p-1  w-60 xs:w-52  min-h-[60vh] border-2 items-center '>
      <h1 className='text-white flex py-2 w-full justify-center border-b-2 font-bold bg-green-500 border-white'>Completed</h1>
            {iniCompleted.map((todo, index) =>{
               if(!todo.key) return null;
          return(
            <>
            <div className='flex flex-col m-1  border-black mt-1 border-2 w-full px-1 pt-1 '>
       <div key={index} class="border-r  border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
       <div class="mb-8">
        <p class="text-lg text-gray-800 flex font-bold items-center">
          Task {index}
        </p>
        <hr ></hr>
        <div class="text-gray-900 font-semibold text-xl mb-2">{todo.info.Title}</div>
        <p class="text-gray-700 text-base">{todo.info.Description}</p>
      </div>
      <div class="flex justify-between items-center">

      <svg  onClick={() => deleteTodo(todo.key,index)} class="w-6 h-6 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>
  
      </div>
    </div>
         
            </div>
            </>
            )
       
        }

)}
</div>
          </>):(<></>)}
      {    (iniDeployed.length!==0)?(<>
        <div className='flex flex-col border-blue-500 mt-3 p-1  w-60 xs:w-52   min-h-[60vh] border-2 items-center '>
      <h1 className='text-white flex py-2 w-full justify-center border-b-2 font-bold bg-blue-200 border-white'>Deployed</h1>
            {iniDeployed.map((todo, index) =>{
               if(!todo.key) return null;
          return(
            <>
            <div className='flex flex-col  border-black mt-1 border-2  w-full'>
       <div key={index} class="border-r  border-b border-l border-black lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
       <div class="mb-8">
        <p class="text-lg text-gray-800 flex font-bold items-center">
          Task 1
        </p>
        <hr ></hr>
        <div class="text-gray-900 font-semibold text-xl mb-2">{todo.info.Title}</div>
        <p class="text-gray-700 text-base">{todo.info.Description}</p>
      </div>
      <div class="flex justify-between items-center">

      <svg  onClick={() => deleteTodo(todo.key,index)} class="w-6 h-6 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>
  
      </div>
    </div>
         
            </div>
            </>
            )
       
        }

)}
</div>
          </>):(<></>)}
      {    (iniDeferred.length!==0)?(<>
        <div className='flex flex-col border-gray-700  p-1  w-60 xs:w-52   mt-3 min-h-[60vh] border-2 items-center '>
      <h1 className='text-white flex py-2 w-full justify-center border-b-2 font-bold bg-gray-400 border-white'>Deferred</h1>
            {iniDeferred.map((todo, index) =>{
               if(!todo.key) return null;
          return(
            <>
            <div className='flex flex-col border-2 mt-2 w-full border-black'>
       <div key={index} class="border-r  border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
       <div class="mb-8">
        <p class="text-lg text-gray-800 flex font-bold items-center">
          Task 1
        </p>
        <hr ></hr>
        <div class="text-gray-900 font-semibold text-xl mb-2">{todo.info.Title}</div>
        <p class="text-gray-700 text-base">{todo.info.Description}</p>
      </div>
      <div class="flex justify-between items-center">

      <svg  onClick={() => deleteTodo(todo.key,index)} class="w-6 h-6 text-gray-800 dark:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>
  
      </div>
    </div>
         
            </div>
            </>
            )
       
        }

)}
</div>
          </>):(<></>)}
        

</div>
<Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className=" flex  h-screen items-center bg-transparent shadow-none"
        >
          <Card className="mx-auto p-2 px-5 mt-20 bg-gray-900 text-white rounded-md w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <div className="flex  ">
              <Typography className="flex align-middle m-auto justify-center"  variant="h4" color="blue-gray">
                Add Task
              </Typography>
              <button onClick={handleOpen}  className="flex  w-6 items-center m-auto justify-center h-6 text-2xl absolute right-10  "  variant="h4" color="blue-gray">
                X
              </button>
              </div>
              <Typography className="-mb-2" variant="h6">
              Title
              </Typography>
              <input onChange={setdata} className="py-2 px-1 text-black"  name="Title" placeholder="Title" size="lg" />
              <Typography className="-mb-2" variant="h6">
              Description
              </Typography>
              <input onChange={setdata} className="py-2 px-1 text-black"  name="Description"  placeholder="Description" size="lg" />
              <div className='flex justify-between'>
                <div>

              
              <Typography className="" variant="h6">
              Start Date
              </Typography>
              <input onChange={setdata} className="text-black mt-2" type='date'  name="StartDate"  placeholder="Start Date" size="lg" />
              </div>
              <div>
               
              <Typography className="" variant="h6">
              End Date
              </Typography>
              <input onChange={setdata} className="text-black mt-2" type='date'   name="EndDate"  placeholder="End Date" size="lg" />
 
              </div>
            
              </div>
          
               
               <Typography className="" variant="h6">
               Status
               </Typography>
               <select onChange={setdata} required value={inputValue.Status} name="Status" className="text-gray-400 h-9 " id="cars">
                         <option className='text-gray-400'>Select Status</option>
                         <option value="Pending" className="sm:uppercase text-black  text-xs sm:text-sm"  >Pending</option>
                         <option value="In Progress" className="sm:uppercase text-black  text-xs sm:text-sm"  >In Progress</option>
                         <option value="Completed" className="sm:uppercase text-black  text-xs sm:text-sm"  >Completed</option>
                         <option value="Deployed" className="sm:uppercase text-black  text-xs sm:text-sm"  >Deployed</option>
                         <option value="Deferred" className="sm:uppercase text-black  text-xs sm:text-sm"  >Deferred</option>
                       </select>  
    
              <Typography className="-mb-2" variant="h6">
              Priority
              </Typography>
              <select onChange={setdata} required value={inputValue.Priority} name="Priority" className="text-gray-400 h-10" id="cars">
                        <option>Priority</option>
                        <option value="P0" className="sm:uppercase text-black text-xs sm:text-sm"  >P0</option>
                        <option value="P1" className="sm:uppercase text-black text-xs sm:text-sm"  >P1</option>
                        <option value="P2" className="sm:uppercase text-black text-xs sm:text-sm"  >P2</option>
                      </select>     
                             </CardBody>
            <CardFooter className="my-3 py-2 border-2 rounded-lg">
              <Button variant="gradient" 
              onClick={()=>{
                addTodo()
                handleOpen()
              }}
               fullWidth>
                Add
              </Button>
          
      
            </CardFooter>
          </Card>
        </Dialog>
        </>
  );
};

export default TodoList;

