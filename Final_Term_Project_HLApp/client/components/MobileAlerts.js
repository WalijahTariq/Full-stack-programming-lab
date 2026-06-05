import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function MobileAlerts(){
  const [notes, setNotes] = useState([])

  const fetchNotes = async ()=>{
    const tok = localStorage.getItem('token')
    if(!tok) return
    try{
      const res = await axios.get('http://localhost:5000/api/notifications', { headers: { Authorization: `Bearer ${tok}` } })
      setNotes(res.data)
      // show new ones as toasts
      res.data.slice(0,3).forEach(n=>{
        if(!n.read) toast((t)=> (<div>{n.message}</div>))
      })
    }catch(e){}
  }

  useEffect(()=>{
    fetchNotes()
    const id = setInterval(fetchNotes, 30000)
    return ()=>clearInterval(id)
  },[])

  return (
    <div className="alert-widget">
      <div className="alert-box">
        <div className="alert-header">Mobile Alerts</div>
        <div className="alert-list">
          {notes.length===0 && <div className="alert-item">No alerts</div>}
          {notes.map(n=> (
            <div key={n._id} className="alert-item">
              <div>{n.message}</div>
              <span className="time">{new Date(n.sentAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
