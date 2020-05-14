import React from 'react'

const ProfilePicture = (props) => {
  

    const url = `http://localhost:3000/user/profilePicture/${props.userId}`;

    if(!props.style){
        return (
            <div >
                <img src={url} alt="recipe img"/>
            </div>
        )
    }

    return (
        <div >
            <img 
                style={{width: props.style.width, height: props.style.height}} 
                src={url} 
                alt="recipe img"
            />
        </div>
    )
}



export default ProfilePicture;