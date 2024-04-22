import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { LOGIN, baseURL } from "../../Api/Api";
import Loading from "../../Components/loading/Loading";
import Cookie from 'cookie-universal'
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


function Login() {
    //states
    const [form,setform]=useState({

        email:'',
        password:'',
    })

    //loading
    const [loading,setloading]=useState(false)

    //error
    const [err,seterr]=useState('')

    //cokiee
    const cookie=Cookie();

    //navigate
    const nav=useNavigate();

    //useRef (for focus on the input when the page loads)
    // const focus=useRef(null);
    // useEffect(()=>{
    //     focus.current.focus();
    // },[])



    function Handelchange(e){
        setform({...form,[e.target.name]:e.target.value})
    }
    //handel submit

    async function HandelSubmit(e){
        e.preventDefault();
        setloading(true)
        try{
            let res=await axios.post(`${baseURL}/${LOGIN}`,form)
            setloading(false)
            const token=res.data.token;
            cookie.set('e-commers',token)
            console.log(res)
            const role=res.data.user.role;
            if(role==='1995'){
                window.location.pathname='/dashboard/users'
            }
            else if(role==='1996'){
                window.location.pathname='/dashboard/writer'
            }
            else if(role==='2001'){
                window.location.pathname='/'
            }
        }
        catch(err){
            setloading(false)
            if(err.response.status===401){
                seterr('Wrong Email or Password..')
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
        <h1 className="mb-5">Log In</h1>

        <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
        <Form.Control name="email" type="email" value={form.email} onChange={Handelchange} placeholder="name@example.com" /*ref={focus}*/ required/>
        <Form.Label>Email:</Form.Label>
      </Form.Group>


        <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
        <Form.Control name="password" type="password" value={form.password} onChange={Handelchange} placeholder="Password..." required minLength='8'/>
        <Form.Label>Password:</Form.Label>
      </Form.Group>

        <button className="btn btn-primary">Login</button>
        <div className="google-btn">
            <a href="http://127.0.0.1:8000/login-google">
                <div className="google-icon-wrapper">
                    <img className="google-icon"
                        src="http://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt=""
                    />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
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

export default Login