import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import apiweb from './website';

function Signup(){
    const [email,setEmail]=useState("");
    const [password,setpassword]=useState("");
    const [nickname,setNicknnm]=useState("");
    const [msg,setMSG]=useState("");

    async function submitsingup(){
      try{
        const response=await axios.post(apiweb.base+apiweb.signup,{
            email,
            password,
            nickname,
        })
        Swal.fire({
            title: '註冊成功',
            text: 'UID為:'+response.data.uid,
            icon: 'success',
            confirmButtonColor:"green",
            showConfirmButton: true,
            confirmButtonText:"OK",
            showCloseButton: true,
            timer: 5000
        })
        setMSG("UserID為:"+response.data.uid);
      }
      catch(error){
        Swal.fire({
            title: '註冊失敗',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor:'red',
            confirmButtonText:"重新註冊",
            showCloseButton: true,
            timer: 5000
        })
        setMSG("註冊失敗:"+error.response.data.message);
      }
      setEmail("");
      setpassword("");
      setNicknnm("");
    }

    return <div className='d-flex justify-content-start align-items-center '>
        <div className='d-flex flex-column'>
            <h2 className='fs-4 mb-3'>註冊</h2>
            <div className="d-flex flex-column mb-3">
                <label htmlFor='signupemail' className="fs-6 fw-bold mb-1">Email</label>
                <input id="signupemail" className="border-0 rounded-3 py-2 px-3 fs-6 mb-1 input_304_w" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='請輸入Email' type='email'/>
                <p className='fs-6 fw-bold remark_c mb-6'>此欄位不得為空</p>
            </div>
            <div className="d-flex flex-column mb-3">
                <label htmlFor='signuppassword' className="fs-6 fw-bold mb-1">密碼</label>
                <input id="signuppassword" className="border-0 rounded-3 py-2 px-3 fs-6 mb-1 input_304_w" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='請輸入密碼' type='password'/>
                <p className='fs-6 fw-bold remark_c mb-6'>此欄位不得為空</p>
            </div>
            <div className='d-flex flex-column mb-4'>
                <label htmlFor='signupnickname' className="fs-6 fw-bold mb-1">暱稱</label>
                <input id="signupnickname" className="border-0 rounded-3 py-2 px-3 fs-6 mb-1 input_304_w"  value={nickname} onChange={(e) => setNicknnm(e.target.value)} placeholder='請輸入暱稱' type='text'/>
                <p className='fs-6 fw-bold remark_c'>此欄位不得為空</p>
            </div>
            <div className='d-flex flex-column align-self-center btn_128_w'>
                <button className="border-0 rounded-3 py-2 px-5 btn_bg text-light fw-bold fs-6 " onClick={()=>submitsingup()}>註冊</button>
            </div>
            <p className="mt-3 w_300 overflow-auto">{msg}</p>
        </div>
    </div>
}

export default Signup