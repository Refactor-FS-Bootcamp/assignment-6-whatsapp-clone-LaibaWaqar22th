import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar, IconButton } from '@mui/material'
import { PersonAdd } from '@mui/icons-material'
import { db } from '../firebase'
import { Link } from 'react-router-dom'

const SidebarChat = ({ id, name, addNewChat }) => {
    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState("")

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 3456))
    }, [])

    const createChat = () => {
        const roomName = prompt("Please Enter Name For Chat")
        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} >
            <div className="sidebarChat">
                <Avatar src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${seed}`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <IconButton><PersonAdd /></IconButton>
            <div className="sidebarChat__addNew">
                <h2>Add New Chat</h2>
            </div>
        </div>
    )
}

export default SidebarChat