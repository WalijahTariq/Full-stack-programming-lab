import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import ConfirmModal from '../../components/ConfirmModal'

export default function PatientDetail(){
  const router = useRouter()
  const { id } = router.query
  const [patient, setPatient] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(()=>{
    const tok = localStorage.getItem('token')
    if(!tok) { window.location.href='/login'; return }
    if(!id) return
    axios.get(`http://localhost:5000/api/doctors`, { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=> setDoctors(r.data))
      .catch(()=>{})
    axios.get(`http://localhost:5000/api/patients/${id}`, { headers: { Authorization: `Bearer ${tok}` } })
      .then(r=> {
        setPatient(r.data)
        setSelectedDoctor(r.data.primaryDoctor?._id || '')
      })
      .catch(()=> toast.error('Unable to load patient'))
  },[id])

  const submit = async (e)=>{
    e.preventDefault()
    setConfirmOpen(true)
  }

  const doSubmit = async ()=>{
    setConfirmOpen(false)
    const tok = localStorage.getItem('token')
    try{
      await axios.put(`http://localhost:5000/api/patients/${id}/primary-doctor`, { doctorId: selectedDoctor || null }, { headers: { Authorization: `Bearer ${tok}` } })
      toast.success('Primary doctor assigned')
      router.push('/patients')
    }catch(err){
      toast.error('Failed to assign doctor')
    }
  }

  if(!patient) return <div className="card" style={{maxWidth:800, margin:'20px auto'}}>Loading...</div>

  return (
    <div className="card" style={{maxWidth:860, margin:'20px auto'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:20}}>
        <div>
          <h2 className="section-title">Patient Detail</h2>
          <div className="small-text">Review patient profile and update primary doctor assignment.</div>
        </div>
        <button type="button" className="button-secondary" onClick={()=>router.push('/patients')}>Back to patients</button>
      </div>

      <div className="grid grid-2" style={{gap:18, marginBottom:22}}>
        <div className="card" style={{padding:18, background:'var(--surface-soft)'}}>
          <div><strong>Name:</strong> {patient.user.name}</div>
          <div><strong>Email:</strong> {patient.user.email}</div>
          <div><strong>Age:</strong> {patient.age || 'N/A'}</div>
          <div><strong>Gender:</strong> {patient.gender || 'N/A'}</div>
        </div>
        <div className="card" style={{padding:18, background:'var(--surface-soft)'}}>
          <div><strong>Phone:</strong> {patient.phone || 'N/A'}</div>
          <div><strong>Primary Doctor:</strong> {patient.primaryDoctor?.user?.name || 'None'}</div>
          <div className="small-text" style={{marginTop:10}}>Assign a primary care physician so care coordination is easier.</div>
        </div>
      </div>

      <form onSubmit={submit}>
        <div className="form-group">
          <label>Assign Primary Doctor</label>
          <select value={selectedDoctor} onChange={e=>setSelectedDoctor(e.target.value)}>
            <option value="">None</option>
            {doctors.map(d=> (
              <option key={d._id} value={d._id}>{d.user.name} — {d.specialization}</option>
            ))}
          </select>
        </div>
        <div className="button-group" style={{marginTop:12}}>
          <button type="submit">Save Assignment</button>
          <button type="button" className="button-secondary" onClick={()=>router.push('/patients')}>Cancel</button>
        </div>
      </form>

      <ConfirmModal open={confirmOpen} title="Confirm Assignment" message={`Assign ${selectedDoctor ? 'this doctor' : 'no doctor'} to the patient?`} onConfirm={doSubmit} onCancel={()=>setConfirmOpen(false)} />
    </div>
  )
}
