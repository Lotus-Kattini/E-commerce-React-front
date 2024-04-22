import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../Api/Axios';
import { USER, USERS, baseURL } from '../../Api/Api';
import axios from 'axios';
import Cookie from 'cookie-universal'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Components/loading/Loading';

function User() {
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [role,setrole]=useState('')
    const [disable,setdisable]=useState(true)
    const [loading,setloading]=useState(false)
    const [err,seterr]=useState('')




    //ID (BOTH ARE RIGHT)
    // const id=window.location.pathname.split('/').slice(-1)[0];
    // const id=Number(window.location.pathname.replace('/dashboard/users/',''))

    // GET ID USING USEPARAMS HOOK
     const {id}=useParams();

    useEffect(()=>{
      setloading(true)
        Axios.get(`${USER}/${id}`)
        .then((data)=>{
            setname(data.data.name)
            setemail(data.data.email)
            setrole(data.data.role)
            setloading(false)
        })
        .then(()=>setdisable(false))
        .catch(()=>{
          nav('/dashboard/users/page/404',{replace:true})
        })
    },[])

    

    const cookie=Cookie();
    const token=cookie.get('e-commers')

    const nav=useNavigate()

    async function HandelSubmit(e){
        e.preventDefault();
        try{
            setloading(true)
            const res=await axios.post(`${baseURL}/${USER}/edit/${id}`,
            {
              name:name,
              email:email,
              role:role,
            },
            {headers:{
                Authorization:'Bearer '+token,
            }})
            nav('/dashboard/users')
        }
        catch(err){
            console.log(err)
            setloading(false)
            if(name==='' ){
                seterr('Please Fill Name Field..')
            }
            if(email==='' ){
                seterr('Please Fill Email Field..')
            }
            
        }
        
    }

  return (
    <>
    {loading && <Loading/>}
    <Form className='bg-white w-100 mx-2 p-3' onSubmit={HandelSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>User Name:</Form.Label>
        <Form.Control type="text" value={name} onChange={(e)=> setname(e.target.value)} placeholder="Update username.." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Update Email.." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Role:</Form.Label>
        <Form.Select  value={role} onChange={(e)=> setrole(e.target.value)} >
          <option disabled value=''>Select Role</option>
          <option value={1995}>Admin</option>
          <option value={2001}>User</option>
          <option value={1996}>Writer</option>
          <option value={1999}>Product Maneger</option>
        </Form.Select>
      </Form.Group>
      {err !== '' && <span className="error">{err}</span>}
      <button style={{marginTop:'0.5rem'}} disabled={disable} className='btn btn-primary'>Update</button>
    </Form>
    </>
  )
}

export default User