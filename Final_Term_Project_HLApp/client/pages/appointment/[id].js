import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AppointmentDetail(){
  const router = useRouter()
  const { id } = router.query
  const [appt, setAppt] = useState(null)
  const [meds, setMeds] = useState([{ name:'', dosage:'', times:'08:00,20:00', durationDays:7 }])
  const [notes, setNotes] = useState('')

  useEffect(()=>{
    if(!id) return
    const tok = localStorage.getItem('token')
    axios.get(`http://localhost:5000/api/appointments`, { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=>{
        const found = r.data.find(a=> a._id === id)
        if(found) setAppt(found)
      }).catch(()=>{})
  },[id])

  const addMedRow = ()=> setMeds([...meds, { name:'', dosage:'', times:'', durationDays:7 }])
  const updateMed = (i, key, val)=>{ const c = [...meds]; c[i][key]=val; setMeds(c) }

  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingPrescription, setPendingPrescription] = useState(null)
  const submitPrescription = async (e)=>{
    e.preventDefault()
    setPendingPrescription({ medications: meds.map(m=>({ name:m.name, dosage:m.dosage, times: m.times.split(',').map(s=>s.trim()), durationDays: parseInt(m.durationDays||7) })), notes })
    setShowConfirm(true)
  }

  const doSubmitPrescription = async ()=>{
    setShowConfirm(false)
    const tok = localStorage.getItem('token')
    try{
      await axios.post(`http://localhost:5000/api/appointments/${id}/prescription`, pendingPrescription, { headers: { Authorization: `Bearer ${tok}` } })
      toast.success('Prescription added')
      router.push('/manage-appointments')
    }catch(err){ toast.error('Failed to add prescription') }
  }

  if(!appt) return <div className="card" style={{maxWidth:800, margin:'20px auto'}}>Loading...</div>

  return (
    <div className="card" style={{maxWidth:920, margin:'20px auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:20}}>
        <div>
          <h2 className="section-title">Appointment Detail</h2>
          <p className="small-text">Create a prescription for this appointment.</p>
        </div>
        <button className="button-secondary" onClick={()=>router.push('/manage-appointments')}>Back</button>
      </div>

      <div className="grid grid-2" style={{gap:18, marginBottom:24}}>
        <div className="card" style={{padding:18, background:'var(--surface-soft)'}}>
          <div><strong>Patient:</strong> {appt.patient?.user?.name || 'Patient'}</div>
          <div className="small-text">{appt.patient?.user?.email || ''}</div>
        </div>
        <div className="card" style={{padding:18, background:'var(--surface-soft)'}}>
          <div><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</div>
          <div><strong>Status:</strong> {appt.status}</div>
        </div>
      </div>

      <h3 className="section-title">Add Prescription</h3>
      <form onSubmit={submitPrescription}>
        <div className="grid" style={{gap:12}}>
          {meds.map((m,i)=> (
            <div key={i} className="card" style={{padding:16, background:'var(--surface-soft)'}}>
              <div className="form-group">
                <label>Medicine name</label>
                <input placeholder="Medicine name" value={m.name} onChange={e=>updateMed(i,'name',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Dosage</label>
                <input placeholder="Dosage" value={m.dosage} onChange={e=>updateMed(i,'dosage',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Times</label>
                <input placeholder="08:00,20:00" value={m.times} onChange={e=>updateMed(i,'times',e.target.value)} />
              </div>
              <div className="form-group">
                <label>Duration (days)</label>
                <input placeholder="Days" type="number" value={m.durationDays} onChange={e=>updateMed(i,'durationDays',e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        <div className="button-group" style={{marginTop:14}}>
          <button type="button" onClick={addMedRow}>Add medication</button>
        </div>

        <div className="form-group" style={{marginTop:18}}>
          <label>Notes</label>
          <textarea placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} rows={4}></textarea>
        </div>

        <div className="button-group" style={{marginTop:18}}>
          <button type="submit">Create Prescription</button>
        </div>
      </form>
      <ConfirmModal open={showConfirm} title="Confirm Prescription" message={`Add prescription with ${meds.length} medication(s)?`} onConfirm={doSubmitPrescription} onCancel={()=>setShowConfirm(false)} />
    </div>
  )
}
