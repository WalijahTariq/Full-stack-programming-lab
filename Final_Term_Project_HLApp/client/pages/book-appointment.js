import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import ConfirmModal from '../components/ConfirmModal'

export default function Book(){
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')

  const submit = async (e)=>{
    e.preventDefault();
    setPending({ date, reason })
    setShowConfirm(true)
  }

  const [showConfirm, setShowConfirm] = useState(false)
  const [pending, setPending] = useState(null)

  const doSubmit = async ()=>{
    setShowConfirm(false)
    const token = localStorage.getItem('token')
    try{
      await axios.post('http://localhost:5000/api/appointments', pending, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('Appointment requested', { duration: 1200 })
      setTimeout(() => window.location.href = '/dashboard', 1300)
    }catch(err){
      const message = err.response?.data?.msg || JSON.stringify(err.response?.data) || err.message || 'Error booking'
      toast.error(message)
    }
  }

  return (
    <div className="card" style={{maxWidth:680, margin:'20px auto'}}>
      <h2 className="section-title">Book Appointment</h2>
      <p className="lead">Request a new appointment for your patient record.</p>
      <form onSubmit={submit}>
        <div className="form-note">
          Booking will use your logged-in patient profile.
        </div>
        <div className="form-group">
          <label>Date and time</label>
          <input type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label>Reason</label>
          <input placeholder="Reason" value={reason} onChange={e=>setReason(e.target.value)} />
        </div>
        <div className="button-group" style={{marginTop:14}}>
          <button type="submit">Request Appointment</button>
        </div>
      </form>
      <ConfirmModal open={showConfirm} title="Confirm Appointment" message={`Book appointment on ${date}?`} onConfirm={doSubmit} onCancel={()=>setShowConfirm(false)} />
    </div>
  )
}
