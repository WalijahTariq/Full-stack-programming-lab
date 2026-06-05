import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Patients(){
  const [patients, setPatients] = useState([])

  useEffect(()=>{
    const tok = localStorage.getItem('token')
    if(!tok) { window.location.href='/login'; return }
    axios.get('http://localhost:5000/api/patients', { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=> setPatients(r.data))
      .catch(()=> toast.error('Unable to load patients'))
  },[])

  return (
    <div className="card" style={{maxWidth:1000, margin:'20px auto'}}>
      <h2 className="section-title">Patient Records</h2>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:18}}>
        {patients.map(p=> (
          <div key={p._id} className="card" style={{padding:18, background:'var(--surface-soft)'}}>
            <div style={{fontWeight:700, marginBottom:6}}>{p.user.name}</div>
            <div className="small-text">{p.user.email}</div>
            <div style={{margin:'12px 0'}}><strong>Gender:</strong> {p.gender || 'N/A'} • <strong>Age:</strong> {p.age || 'N/A'}</div>
            <div className="small-text"><strong>Primary doctor:</strong> {p.primaryDoctor?.user?.name || 'None'}</div>
            <div className="button-group" style={{marginTop:14}}>
              <button onClick={()=>window.location.href=`/patient/${p._id}`}>View / Assign</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
