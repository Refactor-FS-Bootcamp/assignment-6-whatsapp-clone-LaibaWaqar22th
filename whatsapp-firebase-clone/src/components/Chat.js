import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@mui/icons-material'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'

const Chat = () => {
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")

    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
            db.collection('rooms').doc(roomId).collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 3456))
    }, [])

    const sendMessage = e => {
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${seed}`} />
                <div className="chat__headerInfo">
                    <h3>{roomName ? roomName : ("--")}</h3>
                    <p>Last seen {messages.length !== 0 ? (new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()) : ("...")}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p key={message.timestamp} className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat