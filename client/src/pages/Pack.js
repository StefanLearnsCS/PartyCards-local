import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Pack() {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });
    }, []);

    return (
    <div>
        {postObject.title}
        {postObject.postText}
        {postObject.username}
    </div>
  )
}

export default Pack
