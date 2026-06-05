import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import ConfirmModal from '../components/ConfirmModal'

export default function ManageAppointments(){
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [user, setUser] = useState(null)
  const [selectedDoctors, setSelectedDoctors] = useState({})
  const [confirmState, setConfirmState] = useState({ open:false, id:null, action:null, doctorId:null })

  const fetch = async ()=>{
    const tok = localStorage.getItem('token')
    if(!tok) { window.location.href='/login'; return }
    try{
      const payload = JSON.parse(atob(tok.split('.')[1])); setUser(payload)
      const [aRes, dRes] = await Promise.all([
        axios.get('http://localhost:5000/api/appointments', { headers: { Authorization: `Bearer ${tok}` } }),
        axios.get('http://localhost:5000/api/doctors', { headers: { Authorization: `Bearer ${tok}` } })
      ])
      setAppointments(aRes.data)
      setDoctors(dRes.data)
    }catch(err){ console.error(err); toast.error('Unable to load') }
  }

  useEffect(()=>{ fetch() },[])

  const handleDoctorChange = (id, value) => {
    setSelectedDoctors(prev => ({ ...prev, [id]: value }))
  }

  const decide = async (id, action) => {
    setConfirmState({ open:true, id, action, doctorId: selectedDoctors[id] || '' })
  }

  const doDecide = async ()=>{
    const { id, action, doctorId } = confirmState
    setConfirmState({ open:false, id:null, action:null, doctorId:null })
    const tok = localStorage.getItem('token')
    try{
      await axios.post(`http://localhost:5000/api/appointments/${id}/decision`, { action, doctorId }, { headers: { Authorization: `Bearer ${tok}` } })
      toast.success(`Appointment ${action}`)
      fetch()
    }catch(err){ toast.error('Action failed') }
  }

  return (
    <div className="card" style={{maxWidth:1000, margin:'20px auto'}}>
      <h2 className="section-title">Manage Appointments</h2>
      <p className="lead">Review appointment requests and assign doctors before approval.</p>
      {appointments.length === 0 ? (
        <div className="lead">No appointments found.</div>
      ) : (
        <div className="grid" style={{gap:18}}>
          {appointments.map(a=> (
            <div key={a._id} className="card" style={{padding:18, background:'var(--surface-soft)'}}>
              <div style={{display:'flex', justifyContent:'space-between', gap:12, alignItems:'flex-start', marginBottom:12}}>
                <div>
                  <div style={{fontWeight:700, marginBottom:6}}><a href={`/appointment/${a._id}`}>{a.patient?.user?.name || 'Patient'}</a></div>
                  <div className="small-text">Date: {new Date(a.date).toLocaleString()}</div>
                  <div className="small-text">Status: {a.status}</div>
                  <div className="small-text">Reason: {a.reason}</div>
                </div>
                <div style={{minWidth:220, display:'grid', gap:10}}>
                  <select value={selectedDoctors[a._id] || a.doctor?._id || ''} onChange={e=>handleDoctorChange(a._id, e.target.value)}>
                    <option value="">Assign doctor (optional)</option>
                    {doctors.map(d=> (
                      <option key={d._id} value={d._id}>{d.user.name} - {d.specialization}</option>
                    ))}
                  </select>
                  <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
                    <button onClick={()=>decide(a._id,'approve')}>Approve</button>
                    <button onClick={()=>decide(a._id,'reject')} style={{background:'#e43'}}>Reject</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal open={confirmState.open} title="Confirm Action" message={`Are you sure you want to ${confirmState.action} this appointment?`} onConfirm={doDecide} onCancel={()=>setConfirmState({ open:false, id:null, action:null, doctorId:null })} />
    </div>
  )
}
