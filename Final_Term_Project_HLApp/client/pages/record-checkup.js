import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import ConfirmModal from '../components/ConfirmModal'

export default function RecordCheckup(){
  const [appointments, setAppointments] = useState([])
  const [appointmentId, setAppointmentId] = useState('')
  const [vitals, setVitals] = useState({ weight:'', height:'', bp:'', pulse:'', temperature:'' })
  const [notes, setNotes] = useState('')
  const [followUpInDays, setFollowUpInDays] = useState('')

  useEffect(()=>{
    const tok = localStorage.getItem('token')
    if(!tok) { window.location.href = '/login'; return }
    axios.get('http://localhost:5000/api/appointments', { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=> setAppointments(r.data.filter(a=> a.status==='approved' || a.status==='pending' )))
      .catch(()=>{})
  },[])

  const submit = async (e)=>{
    e.preventDefault();
    if(!appointmentId){ toast.error('Select appointment'); return }
    setPending({ vitals, notes, followUpInDays })
    setShowConfirm(true)
  }

  const [showConfirm, setShowConfirm] = useState(false)
  const [pending, setPending] = useState(null)

  const doSubmit = async ()=>{
    setShowConfirm(false)
    const tok = localStorage.getItem('token')
    try{
      await axios.post(`http://localhost:5000/api/checkups/${appointmentId}`, pending, { headers: { Authorization: `Bearer ${tok}` } })
      toast.success('Checkup recorded')
      window.location.href = '/manage-appointments'
    }catch(err){
      toast.error('Failed to record')
    }
  }

  return (
    <div className="card" style={{maxWidth:900, margin:'20px auto'}}>
      <h2 className="section-title">Record Physical Checkup</h2>
      <p className="lead">Add vitals and follow-up guidance after an appointment.</p>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Appointment</label>
          <select value={appointmentId} onChange={e=>setAppointmentId(e.target.value)} required>
            <option value="">Select appointment</option>
            {appointments.map(a=> (
              <option key={a._id} value={a._id}>{a.patient?.user?.name || 'Patient'} — {new Date(a.date).toLocaleString()}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label>Weight (kg)</label>
            <input value={vitals.weight} onChange={e=>setVitals({...vitals, weight: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Height (cm)</label>
            <input value={vitals.height} onChange={e=>setVitals({...vitals, height: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Blood Pressure</label>
            <input value={vitals.bp} onChange={e=>setVitals({...vitals, bp: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Pulse</label>
            <input value={vitals.pulse} onChange={e=>setVitals({...vitals, pulse: e.target.value})} />
          </div>
          <div className="form-group" style={{gridColumn:'1 / -1'}}>
            <label>Temperature (°C)</label>
            <input value={vitals.temperature} onChange={e=>setVitals({...vitals, temperature: e.target.value})} />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={4}></textarea>
        </div>

        <div className="form-group">
          <label>Follow-up in (days)</label>
          <input type="number" value={followUpInDays} onChange={e=>setFollowUpInDays(e.target.value)} />
        </div>

        <div className="button-group" style={{marginTop:16}}>
          <button type="submit">Record Checkup</button>
        </div>
      </form>
      <ConfirmModal open={showConfirm} title="Confirm Checkup" message={`Save checkup for selected appointment?`} onConfirm={doSubmit} onCancel={()=>setShowConfirm(false)} />
    </div>
  )
}
