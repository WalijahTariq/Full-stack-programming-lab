import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Login(){
  const [form, setForm] = useState({email:'',password:''})
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      toast.success('Logged in')
      window.location.href = '/dashboard'
    }catch(err){
      toast.error(err.response?.data?.msg || 'Error')
    }
  }
  return (
    <div className="card" style={{maxWidth:520, margin:'20px auto'}}>
      <h2 className="section-title">Login</h2>
      <p className="lead">Access your HLApp dashboard to manage appointments and patient care.</p>
      <form onSubmit={submit}>
        <div className="form-group"><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></div>
        <div className="form-group"><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/></div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
