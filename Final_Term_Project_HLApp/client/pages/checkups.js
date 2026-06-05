import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Checkups(){
  const [checkups, setCheckups] = useState([])

  useEffect(()=>{
    const tok = localStorage.getItem('token')
    if(!tok) { window.location.href='/login'; return }
    axios.get('http://localhost:5000/api/checkups/me', { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=>setCheckups(r.data)).catch(()=>{})
  },[])

  return (
    <div className="card" style={{maxWidth:900, margin:'20px auto'}}>
      <h2 className="section-title">My Checkups</h2>
      {checkups.length===0 ? (
        <p className="lead">No checkups recorded yet.</p>
      ) : (
        <div className="grid" style={{gap:16}}>
          {checkups.map(c=> (
            <div key={c._id} className="card" style={{padding:18, background:'var(--surface-soft)'}}>
              <div style={{fontWeight:700, marginBottom:8}}>{new Date(c.date).toLocaleString()}</div>
              <div className="small-text">Vitals: {c.vitals ? `W:${c.vitals.weight||'-'} H:${c.vitals.height||'-'} BP:${c.vitals.bp||'-'} P:${c.vitals.pulse||'-'} T:${c.vitals.temperature||'-'}` : 'No vitals recorded'}</div>
              <div style={{marginTop:10}}><strong>Notes</strong><div className="small-text">{c.notes || 'None'}</div></div>
              {c.followUpInDays && <div className="small-text" style={{marginTop:8, color:'var(--primary)'}}>Follow up in {c.followUpInDays} days</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
