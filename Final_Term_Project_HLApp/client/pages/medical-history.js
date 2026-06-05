import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MedicalHistory(){
  const [data, setData] = useState({ appointments: [], checkups: [], prescriptions: [] })

  useEffect(()=>{
    const tok = localStorage.getItem('token')
    if(!tok) { window.location.href='/login'; return }
    axios.get('http://localhost:5000/api/patients/me/history', { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=> setData(r.data)).catch(()=>{})
  },[])

  return (
    <div className="card" style={{maxWidth:1000, margin:'20px auto'}}>
      <h2 className="section-title">Medical History</h2>
      <p className="lead">Your full patient timeline of appointments, checkups, and prescriptions.</p>

      <section style={{marginBottom:24}}>
        <h3 className="section-title">Appointments</h3>
        {data.appointments.length===0 ? (
          <div className="lead">No appointments recorded.</div>
        ) : (
          <div className="grid" style={{gap:12}}>
            {data.appointments.map(a=> (
              <div key={a._id} className="card" style={{padding:16, background:'var(--surface-soft)'}}>
                <div style={{fontWeight:700}}>{new Date(a.date).toLocaleString()}</div>
                <div className="small-text">Status: {a.status}</div>
                <div className="small-text">{a.reason}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{marginBottom:24}}>
        <h3 className="section-title">Checkups</h3>
        {data.checkups.length===0 ? (
          <div className="lead">No checkups recorded.</div>
        ) : (
          <div className="grid" style={{gap:12}}>
            {data.checkups.map(c=> (
              <div key={c._id} className="card" style={{padding:16, background:'var(--surface-soft)'}}>
                <div style={{fontWeight:700}}>{new Date(c.date).toLocaleString()}</div>
                <div className="small-text">Vitals: {c.vitals ? `W:${c.vitals.weight||'-'} H:${c.vitals.height||'-'} BP:${c.vitals.bp||'-'}` : 'N/A'}</div>
                <div className="small-text">Notes: {c.notes || 'None'}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="section-title">Prescriptions</h3>
        {data.prescriptions.length===0 ? (
          <div className="lead">No prescriptions available.</div>
        ) : (
          <div className="grid" style={{gap:12}}>
            {data.prescriptions.map(p=> (
              <div key={p._id} className="card" style={{padding:16, background:'var(--surface-soft)'}}>
                <div style={{fontWeight:700}}>{new Date(p.createdAt).toLocaleString()}</div>
                <div className="small-text">{p.medications.map(m=>`${m.name} ${m.dosage} (${(m.times||[]).join(', ')})`).join('; ')}</div>
                <div className="small-text">Notes: {p.notes || 'None'}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
