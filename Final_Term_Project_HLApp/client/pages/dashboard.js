import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Dashboard(){
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])

  useEffect(()=>{
    const tok = localStorage.getItem('token')
    if(!tok) { window.location.href = '/login'; return }
    try{ const payload = JSON.parse(atob(tok.split('.')[1])); setUser(payload) }catch(e){ }
    axios.get('http://localhost:5000/api/appointments', { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=>setAppointments(r.data)).catch(()=>{})
    axios.get('http://localhost:5000/api/patients/me', { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=> localStorage.setItem('patientRecord', JSON.stringify(r.data)) ).catch(()=>{})
  },[])

  const logout = ()=>{ localStorage.removeItem('token'); window.location.href='/'; }

  return (
    <div className="grid grid-2" style={{gap:24}}>
      <div className="card">
        <h2 className="section-title">Welcome back</h2>
        {user && <div className="lead">{user.name} <span className="small-text">({user.role})</span></div>}
        <div className="button-group" style={{flexWrap:'wrap', gap:12}}>
          <button onClick={()=>window.location.href='/book-appointment'}>Book Appointment</button>
          {user && (user.role==='admin' || user.role==='doctor') && (
            <>
              <button onClick={()=>window.location.href='/manage-appointments'}>Manage Appointments</button>
              <button onClick={()=>window.location.href='/record-checkup'}>Record Checkup</button>
              <button onClick={()=>window.location.href='/patients'}>Patients</button>
            </>
          )}
          <button onClick={()=>window.location.href='/checkups'}>My Checkups</button>
          <button onClick={()=>window.location.href='/medical-history'}>Medical History</button>
          <button onClick={logout} className="button-secondary">Logout</button>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Your Appointments</h2>
        {appointments.length === 0 ? (
          <p className="lead">No appointments scheduled yet.</p>
        ) : (
          <div className="grid" style={{gap:14}}>
            {appointments.map(a => (
              <div key={a._id} className="card" style={{padding:'18px', background:'var(--surface-soft)'}}>
                <div style={{fontWeight:700}}>{new Date(a.date).toLocaleString()}</div>
                <div className="small-text">Status: {a.status}</div>
                <div className="small-text">Doctor: {a.doctor?.user?.name || 'Unassigned'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
