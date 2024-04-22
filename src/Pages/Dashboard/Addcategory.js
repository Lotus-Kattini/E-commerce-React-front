import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../Api/Axios';
import {Cat} from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/loading/Loading';

function Addcategory() {
    const [title,settitle]=useState('')
    const [image,setimage]=useState('')
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
        const form = new FormData();
        form.append('title',title);
        form.append('image',image);

        try{
            setloading(true)
            const res=await Axios.post(`${Cat}/add`,form)
            nav('/dashboard/categories')
        }
        catch(err){
            console.log(err)
            setloading(false)
            if(title==='' ){
                seterr('Please Fill Title Field..')
            }
        }
        
    }

  return (
    <>
    {loading && <Loading/>}
    <Form className='bg-white w-100 mx-2 p-3' onSubmit={HandelSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" value={title} onChange={(e)=> settitle(e.target.value)} placeholder="title.." ref={focus}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="file" onChange={(e)=> setimage(e.target.files.item(0))}  />
      </Form.Group>

      
      {err !== '' && <span className="error">{err}</span>}
      <button style={{marginTop:'0.5rem'}}
        className='btn btn-primary'
        disabled={title.length>1 ? false: true}
        >Add</button>
    </Form>
    </>
  )
}

export default Addcategory