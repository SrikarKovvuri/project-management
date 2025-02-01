import React, { useState, useEffect} from "react";

export default function Sidebar() {
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchProjects = async () = {
            try {
                const token = localStorage.getItem("token");
                const response = 
            }
            catch(error) {

            }
        }
    }, [])
}