import React, { useState } from 'react'
import axios from 'axios';
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;


const DoorCard = ({door, getDoors}) => {
    const[isEditMode, setIsEditMode]= useState(false);
    const [doorForm, setDoorForm] = useState({
        name:door.name,
        status:door.status
    });
    async function deleteDoor(){
        try {
            await axios.delete(`${API_URI}/${door.id}`);
            alert("Door deleted successfully");
            getDoors();
        } catch (error) {
            console.log(error);
            alert("Something went wrong while deleting door");
            
        }
    }
    function handleInput(event){
        const key = event.target.name;
        const value = event.target.value;
        setDoorForm({...doorForm, [key]: value});
    }

    async function handleForm(e){
        e.preventDefault();

        try {
            const {name, status}= doorForm;
            if(!name || !status){
                alert("Please fill all the details");
                return;

            }

            await axios.put(`${API_URI}/${door.id}`, doorForm);
            alert("Door updated successfully");
            setIsEditMode(false);
            getDoors();

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

  return (
   <>
   {
    !isEditMode? 
    <div>
    <h3>Name: {door.name}</h3>
    <p>Status: {door.status}</p>
    <div style={{display:"flex", justifyContent:"space-between"}}>
     <button onClick={
        ()=>setIsEditMode(true)
     }>Edit</button>
     <button onClick={deleteDoor}>Delete</button>
    </div>
 </div>:
 <div>
   <form action="" onSubmit={handleForm}>
    <input type="text" value={doorForm.name} name="name" onChange={handleInput} placeholder="Enter door name..."/>
    <input type="text" value={doorForm.status} name="status" onChange={handleInput} placeholder="Enter status..."/>
    <input type="submit" />
    </form>
    <button onClick={
        ()=>setIsEditMode(false)
    }>close Edit Mode</button>
 </div>
   }
   </>
  )
}

export default DoorCard