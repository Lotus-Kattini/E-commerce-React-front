import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { REGISTER, baseURL } from "../../Api/Api";
import Loading from "../../Components/loading/Loading";
import Cookie from 'cookie-universal'
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";



function Register() {
    //states
    const [form,setform]=useState({
        name:'',
        email:'',
        password:'',
    })

    //loading
    const [loading,setloading]=useState(false)

    //error
    const [err,seterr]=useState('')

    //cookie
    const cookie=Cookie();

    //navigate
    const nav=useNavigate();

    //useRef (for focus on the input when the page loads)
    const focus=useRef(null);
    useEffect(()=>{
        focus.current.focus();
    },[])



    function Handelchange(e){
        setform({...form,[e.target.name]:e.target.value})
    }
    //handel submit

    async function HandelSubmit(e){
        e.preventDefault();
        setloading(true)

        try{
            const res=await axios.post(`${baseURL}/${REGISTER}`,form)
            setloading(false)
            const token=res.data.token;
            cookie.set('e-commers',token)
            console.log(res)
            // window.location.pathname='/';
            nav('/dashboard/users')
        }
        catch(err){
            setloading(false)
            if(err.response.status===422){
                seterr('This Email is already been taken..')
            }
            else{
                seterr('Interval Server Error..')
            }
        }
    }

  return (
    <>
    {loading && <Loading/>}
    <div className="container">
        <div className="row" style={{height:'100vh'}}>
        <Form className="form" onSubmit={HandelSubmit}>
        <div className="custom-form">
        <h1 className="mb-3">Register Now</h1>

        <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
        <Form.Control name="name" type="text" value={form.name} onChange={Handelchange} placeholder="UserName..." /*ref={focus}*/ required/>
        <Form.Label>Name:</Form.Label>
      </Form.Group>

        <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
        <Form.Control name="email" type="email" value={form.email} onChange={Handelchange} placeholder="name@example.com" required/>
        <Form.Label>Email:</Form.Label>
      </Form.Group>


        <Form.Group className="form-custom" controlId="exampleForm.ControlInput3">
        <Form.Control name="password" type="password" value={form.password} onChange={Handelchange} placeholder="Password..." required minLength='8'/>
        <Form.Label>Password:</Form.Label>
      </Form.Group>

        <button className="btn btn-primary">Register</button>
        <div className="google-btn">
            <a href="http://127.0.0.1:8000/login-google" >
                <div className="google-icon-wrapper">
                    <img className="google-icon"
                        src="http://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt=""
                    />
                </div>
                <p className="btn-text">
                    <b>Register with google</b>
                </p>
            </a>
        </div>
        {err !== '' && <span className="error">{err}</span>}
        </div>
        </Form>
        </div>
    </div>
    </>
  )
}

export default Register