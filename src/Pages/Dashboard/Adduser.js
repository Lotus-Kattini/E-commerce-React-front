import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../Api/Axios';
import { USER} from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/loading/Loading';

function Adduser() {
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [role,setrole]=useState('')
    const [loading,setloading]=useState(false)
    const [err,seterr]=useState('')



    const nav=useNavigate()

    //useRef (for focus on the input when the page loads)
    const focus=useRef(null);
    useEffect(()=>{
        focus.current.focus();
    },[])


    async function HandelSubmit(e){
        e.preventDefault();
        try{
            setloading(true)
            const res=await Axios.post(`${USER}/add`,
            {
              name:name,
              email:email,
              password:password,
              role:role,
            })
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
        <Form.Control type="text" value={name} onChange={(e)=> setname(e.target.value)} placeholder="Username.." ref={focus}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder=" Email.." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Password.." />
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
      <button style={{marginTop:'0.5rem'}}
        className='btn btn-primary'
        disabled={name.length>1 && email.length>1 && password.length>6 && role !=='' ? false: true}
        >Add</button>
    </Form>
    </>
  )
}

export default Adduser