import React, { useRef, useState } from 'react'
import {Modal,Form, Container, Button, Row, Col} from 'react-bootstrap';
import { useRouter } from 'next/router'
import useFetchAuth from 'hooks/useFetchAuth';

const AddImage = (props) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()

    let formData = new FormData();    

    const onFileChange = (e) => {
      console.log(e.target.files[0])
      if(e.target && e.target.files[0]){
        formData.append('file',  e.target.files[0])
      }
    }
   
    const SubmitFile = () =>{
       fetchAuth(`${process.env.NEXT_PUBLIC_HOST}/seller/image`, {
          method: 'POST',headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: formData
        }).then(res=>{
          console.log(res);
        }).catch(error=>{
          console.log(error);
        })
    }

    return(
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Form>
        <Modal.Header closeButton>
           <h5>Add Company Logo</h5>
        </Modal.Header>
        <Modal.Body >
            <input type="file" name='file' onChange={onFileChange} />
        </Modal.Body>
        <Modal.Footer>
          {console.log(formData)}
        <button variant="primary" onClick={SubmitFile} >
          Submit
        </button>
          
        </Modal.Footer>
        </Form>
      </Modal>
    )
}


export default AddImage;