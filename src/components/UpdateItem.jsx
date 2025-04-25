const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

import axios from "axios";
import { useEffect, useState } from "react";
import DoorCard from "./DoorCard";

const UpdateItem = ({ item }) => {
    // 1. Create a state for the form
    // 2. Create a function to handle the form submission
    // 3. Create a function to handle the form input changes

    // your code here


    const [doors, setDoors]= useState([]);
    const [doorForm, setDoorForm] = useState({
        name:"",
        status:""
    })
    async function getDoors() {
        try {
            const data = await axios.get(API_URI);
            console.log(data.data);
            setDoors(data.data);
        } catch (error) {
            console.log(error);
            alert("SOmething went wrong");
            
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

            await axios.post(API_URI, doorForm);
            alert("Door added successfully");
            getDoors();

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    useEffect(()=>{
        getDoors();
    },[]);


    return (
        <div>
            {
                doors.map((ele)=>(
                    <DoorCard key={ele.id} door={ele} getDoors={getDoors}/>
                ))
            }
            <div>
                <form action="" onSubmit={handleForm}>
                <input type="text" value={doorForm.name} name="name" onChange={handleInput} placeholder="Enter door name..."/>
                <input type="text" value={doorForm.status} name="status" onChange={handleInput} placeholder="Enter status..."/>
                <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;

