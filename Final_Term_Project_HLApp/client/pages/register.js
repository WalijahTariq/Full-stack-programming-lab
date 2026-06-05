import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Register(){
  const [form, setForm] = useState({name:'',email:'',password:'',role:'patient'})
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/auth/register', form)
      localStorage.setItem('token', res.data.token)
      toast.success('Registered')
      window.location.href = '/dashboard'
    }catch(err){
      const message = err.response?.data?.msg || err.response?.data?.errors?.map(item => item.msg).join(', ') || err.message || 'Registration failed'
      toast.error(message)
    }
  }
  return (
    <div className="card" style={{maxWidth:520, margin:'20px auto'}}>
      <h2 className="section-title">Register</h2>
      <p className="lead">Create an account and start managing healthcare bookings and patient care.</p>
      <form onSubmit={submit}>
        <div className="form-group"><input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
        <div className="form-group"><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></div>
        <div className="form-group"><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/></div>
        <div className="form-group"><select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select></div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
