import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../Api/Axios';
import { CAT, Cat} from '../../Api/Api';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Components/loading/Loading';

function UpadateCat() {
    const [title,settitle]=useState('')
    const [image,setimage]=useState('')
    const [disable,setdisable]=useState(true)
    const [loading,setloading]=useState(false)
    const [err,seterr]=useState('')

    //ID (BOTH ARE RIGHT)
    // const id=window.location.pathname.split('/').slice(-1)[0];
    // const id=Number(window.location.pathname.replace('/dashboard/categories/',''))
    //other way to get the id using hooks (params)
    const {id}=useParams();

    useEffect(()=>{
      setloading(true)
        Axios.get(`${Cat}/${id}`)
        .then((data)=>{
            settitle(data.data.title)
            setloading(false)
        })
        .then(()=>setdisable(false))
        .catch(()=>{
          nav('/dashboard/categories/page/404',{replace:true})
        })
    },[])

    const nav=useNavigate()

    
    async function HandelSubmit(e){
        e.preventDefault();
        const form = new FormData();
        form.append('title',title);
        form.append('image',image);

        try{
            setloading(true)
            const res=Axios.post(`${Cat}/edit/${id}`,form)
            nav('/dashboard/categories')
        }
        catch(err){
            console.log(err)
            setloading(false)
            if(title==='' ){
                seterr('Please Fill Name Field..')
            }
            
        }
        
    }

  return (
    <>
    {loading && <Loading/>}
    <Form className='bg-white w-100 mx-2 p-3' onSubmit={HandelSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" value={title} onChange={(e)=> settitle(e.target.value)} placeholder="Update title.." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="file"  onChange={(e)=> setimage(e.target.files.item[0])} placeholder="Update title.." />
      </Form.Group>
      {err !== '' && <span className="error">{err}</span>}
      <button style={{marginTop:'0.5rem'}} disabled={disable} className='btn btn-primary'>Update</button>
    </Form>
    </>
  )
}

export default UpadateCat