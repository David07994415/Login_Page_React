import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import apiweb from './website';

function Signout({token,setToken}){
    const [msg, setMSG]=useState("");

    const header={
        headers: {
            Authorization: token,
        }
    }

    async function btnsignout(){
        try{
            const response=await axios.post(apiweb.base+apiweb.singout,{},header)
            setMSG(`登出成功`)
            setToken("")
            console.log(response)
            Swal.fire({
                title: '登出成功',
                text: response.data.message+":"+response.data.status,
                icon: 'success',
                confirmButtonColor:"green",
                showConfirmButton: true,
                confirmButtonText:"OK",
                showCloseButton: true,
                timer: 5000
            })
        }
        catch(error){
            setMSG("登出失敗:"+error.response.data.message)
            Swal.fire({
                title: '登出失敗',
                text: error.response.data.message,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor:'red',
                confirmButtonText:"請重新登出",
                showCloseButton: true,
                timer: 5000
            })
        }
    }

    return (<div className='d-flex justify-content-start align-items-center '>
        <div className='d-flex flex-column'>
            <h2 className='fs-4 mb-3'>登出</h2>
            <div className='d-flex flex-column align-self-center btn_128_w'>
                <button className="border-0 rounded-3 py-2 px-5 btn_bg text-light fw-bold fs-6 " onClick={()=>btnsignout()}>登出</button>
            </div>
            <p className="mt-3 w_300 overflow-auto">{msg}</p>
        </div>
    </div>)
}

export default Signout