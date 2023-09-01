import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import apiweb from './website';

function Checkout({token,setToken}){
    const [msg, setMsg]=useState("")

    const header={
        headers: {
            Authorization: token,
        }
    }

    async function btntoken(){
        try{
            const response= await axios.get(apiweb.base+apiweb.checkout,header)
            setMsg(`驗證成功，uid為:${response.data.uid}，暱稱為:${response.data.nickname}`)
            Swal.fire({
                title: '驗證成功',
                html:'驗證成功!'+'<br/>'+
                     'uid為:'+ response.data.uid +'<br/>'+
                     '暱稱為:'+ response.data.nickname,
                // text: `驗證成功，uid為:${response.data.uid}，暱稱為:${response.data.nickname}`,
                icon: 'success',
                confirmButtonColor:"green",
                showConfirmButton: true,
                confirmButtonText:"OK",
                showCloseButton: true,
                timer: 5000
            })
        }
        catch(error){
            setMsg("失敗:"+error.response.data.message)
            Swal.fire({
                title: '驗證失敗',
                text: error.response.data.message,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor:'red',
                confirmButtonText:"重新驗證",
                showCloseButton: true,
                timer: 5000
            })
        }
        // setToken("")
    }

    return(<div className='d-flex justify-content-start align-items-center '>
        <div className='d-flex flex-column'>
            <h2 className='fs-4 mb-3'>驗證</h2>
            <div className='d-flex flex-column mb-4'>
                <label htmlFor='checkouttoken' className="fs-6 fw-bold mb-1">金鑰(Token)</label>
                <input id="checkouttoken" className="border-0 rounded-3 py-2 px-3 fs-6 mb-1 input_304_w"  value={token} onChange={(e) => setToken(e.target.value)} placeholder='請輸入金鑰' type='text'/>
                <p className='fs-6 fw-bold remark_c'>此欄位不得為空</p>
            </div>
            <div className='d-flex flex-column align-self-center btn_128_w'>
                <button className="border-0 rounded-3 py-2 px-5 btn_bg text-light fw-bold fs-6 " onClick={()=>btntoken()}>驗證</button>
            </div>
            <p className="mt-3 w_300 overflow-auto">{msg}</p>
        </div>
    </div>)
}

export default Checkout