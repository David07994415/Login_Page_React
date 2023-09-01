import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import apiweb from './website';
import Checkout from './Checkout';
import Signout from './Signout';
import Todo from './Todo';
import Signup from './Signup';


function Singin(){
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [token,setToken]=useState("");
    const [msg,setMSG]=useState("")

    async function btnsignin(){
        try{
            const response=await axios.post(apiweb.base+apiweb.signin,{
                email,
                password,
            })
            Swal.fire({
                title: '登入成功',
                text: 'TOKEN為:'+response.data.token,
                icon: 'success',
                confirmButtonColor:"green",
                showConfirmButton: true,
                confirmButtonText:"OK",
                showCloseButton: true,
                timer: 5000
            })
            setMSG("登入成功 token為:"+ response.data.token)
            setToken(response.data.token)
        }
        catch(error){
            Swal.fire({
                title: '登入失敗',
                text: error.response.data.message,
                icon: 'error',
                showConfirmButton: true,
                confirmButtonColor:'red',
                confirmButtonText:"重新登入",
                showCloseButton: true,
                timer: 5000
            })
            setMSG("登入失敗:"+error.response.data.message)
            setToken("")
        }
        setEmail("")
        setPassword("")
    }

    return <><div className='d-flex'>
        <div>
        <Signup/>
        <hr/>
        <div className='d-flex justify-content-start align-items-center '>
        <div className='d-flex flex-column'>
            <h2 className='fs-4 mb-3'>登入</h2>
            <div className="d-flex flex-column mb-3">
                <label htmlFor='signinemail' className="fs-6 fw-bold mb-1">Email</label>
                <input id="signinemail" className="border-0 rounded-3 py-2 px-3 fs-6 mb-1 input_304_w" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='請輸入Email' type='email'/>
                <p className='fs-6 fw-bold remark_c mb-6'>此欄位不得為空</p>
            </div>
            <div className='d-flex flex-column mb-4'>
                <label htmlFor='signinpassword' className="fs-6 fw-bold mb-1">密碼</label>
                <input id="signinpassword" className="border-0 rounded-3 py-2 px-3 fs-6 mb-1 input_304_w"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder='請輸入密碼' type='password'/>
                <p className='fs-6 fw-bold remark_c'>此欄位不得為空</p>
            </div>
            <div className='d-flex flex-column align-self-center btn_128_w'>
                <button className="border-0 rounded-3 py-2 px-5 btn_bg text-light fw-bold fs-6 " onClick={()=>btnsignin()}>登入</button>
            </div>
            <p className="mt-3 w_300 overflow-auto">{msg}</p>
        </div>
    </div>
        <hr/>
        <Checkout token={token} setToken={setToken}/>
        <hr/>
        <Signout token={token} setToken={setToken}/>
    </div>
    <Todo token={token} setToken={setToken}/>
    </div>
    </>
}

export default Singin