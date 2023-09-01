import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import apiweb from './website';

function Todo({ token, setToken }) {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [todoEdit, setTodoEdit] = useState({});
    const [msg, setMSG] = useState('');
    const [notyettodos, setNotYetTodos]=useState([]);
    const [donetodos, setDoneTodos]=useState([]);
    const [page,setPage]=useState("");
    const [editbtn,setEditbtn]=useState("");

    useEffect(() => {
        gettodolist();
        setPage("all")
    }, [token])

    const header = {
        headers: {
            Authorization: token,
        }
    }

    async function gettodolist() {
        try {
            const respon = await axios.get(apiweb.base + apiweb.todos, header)
            setTodos(respon.data.data)
            const divnotyet=respon.data.data.filter((item)=>item.status===false)
            setNotYetTodos(divnotyet)
            const divnotdone=respon.data.data.filter((item)=>item.status===true)
            setDoneTodos(divnotdone)
        }
        catch (error) {
            setMSG(error.response.data.message)
        }
    }

    async function addtodolist() {
        if (!newTodo){
            alert("請於欄位中新增待辦事項！")
            return
        }
        const todoadd = {
            content: newTodo,
        };
        try {
            const respon = await axios.post(apiweb.base + apiweb.todos, todoadd, header)
            alert("新增待辦事項成功！")
        }
        catch (error) {
            alert("新增待辦事項\"失敗\"！")
        }
        setNewTodo("")
        gettodolist();
    }

    async function deletodolist(id) {
        try {
            const respon = await axios.delete(apiweb.base + apiweb.todos + id, header)
            alert("刪除成功")
        }
        catch (error) {
            setMSG(error.response.data.message)
        }
        gettodolist();
    }

    async function updatodolist(id) {
        const finditem = todos.find((item) => item.id === id);
        finditem.content = todoEdit[id];
        try {
            const respon = await axios.put(apiweb.base + apiweb.todos + id, finditem, header)
            setMSG(respon.data.data)
            alert("修改待辦事項成功！")
        }
        catch (error) {
            setMSG(error.response.data.message)
        }
        gettodolist();
        setTodoEdit({
            ...todoEdit,
            [id]: ''
        })
    }

    async function ordertodolist(id) {
        try {
            const respon = await axios.patch(apiweb.base + apiweb.todos + id + apiweb.toggle, {}, header)
        }
        catch (error) {
            setMSG(error.response.data.message)
        }
        gettodolist();
    }

    return (<div className="todoframe_500_w d-flex flex-column ms-5">
        <h2 style={{ display: token ? "none" : "block" }}>請先登入才能編輯TodoList</h2>
        <div style={{ display: token ? "block" : "none" }}>
        <h2 className='fs-4 mb-3'>待辦事項TodoList</h2>
        <div className="mb-3 addframe">
            <label htmlFor='todoinput' className="fs-6 fw-bold mb-1"></label>
            <input id="todoinput" className="border-0 rounded-3 py-3 px-3 fs-6 mb-1 todoframe_500_w" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder='新增待辦事項' type='text' />
            <button className='border-0 addbtn_icon' onClick={() => addtodolist()}><img src='plus 1.png'/></button>
        </div>
        <div>
            <div className=" d-flex">
                <button className="py-3 text-center border-0 border_left_radius fs-6 fw-bold todostate_33pcer_w todohit" onClick={()=>setPage("all")}>全部</button>
                <button className="py-3 text-center border-0 fs-6 fw-bold todostate_33pcer_w todohit" onClick={()=>setPage("notyet")}>待完成</button>
                <button className="py-3 text-center border-0 border_right_radius fs-6 fw-bold todostate_33pcer_w todohit" onClick={()=>setPage("done")}>已完成</button>
            </div>
        </div>
        <div className="p-4 d-flex flex-column bg-light rounded-bottom-2">
            <ul className="d-flex flex-column mb-3 justify-content-between">
                <div style={{ display: page==="all" ? "block" : "none" }}>
                {todos.map((todoitem,index) => (
                    <li key={index} className="d-flex mb-3 align-items-start justify-content-between">
                        <div className="d-flex align-items-start border-bottom pb-3 edit_428_w me-3">
                            <div style={{ display: todoitem.status ? "none" : "block" }}>
                                <button className='border-0 bg-light' onClick={() => ordertodolist(todoitem.id)}>
                                    <img src="Rectangle 2.png" alt="" />
                                </button>
                            </div>
                            <div style={{ display: todoitem.status ? "block" : "none" }}>
                                <button className='border-0 bg-light' onClick={() => ordertodolist(todoitem.id)}>
                                    <img src="check 1.png" alt="" />
                                </button>
                            </div>
                            {/* <label htmlFor="todoitems"></label>
                            <input id="todoitems" className="fs-5 me-3" type="checkbox"  ref={checkbox}  onClick={() => ordertodolist(todoitem.id)} /> */}
                            {/* <p className="fs-6" style={{textDecoration: todoitem.status ? "line-through" : "none",}}>{todoitem.content}</p> */}
                            {/* <label htmlFor="edititems"></label> */}
                            <input className="fs-6 p-0 m-0 border-0 bg-light updatetodo_frame" style={{textDecoration: todoitem.status ? "line-through" : "none"}} type="text" placeholder={todoitem.content} onChange={(e) => {
                                const newTodoEdit = { ...todoEdit}
                                newTodoEdit[todoitem.id] = e.target.value
                                setTodoEdit(newTodoEdit)
                                setEditbtn(todoitem.id)
                                // updatodolist(todoitem.id)
                            }}/>
                            <button className="ms-3"  style={{display:editbtn===todoitem.id?"block":"none"}} onClick={() => {updatodolist(todoitem.id);setEditbtn("none")}}>確認編輯</button>
                        </div>
                        <button className='border-0 bg-light' onClick={() => deletodolist(todoitem.id)}><img src="close (1) 1.png"/></button>
                        {/* <button onClick={() => ordertodolist(todoitem.id)}>shift</button> */}
                    </li>
                ))}
                </div>
                <div style={{ display: page==="notyet" ? "block" : "none" }}>
                {notyettodos.map((todoitem,index) => (
                    <li key={index} className="d-flex mb-3 align-items-start justify-content-between">
                        <div className="d-flex align-items-start border-bottom pb-3 edit_428_w me-3">
                            <div style={{ display: todoitem.status ? "none" : "block" }}>
                                <button className='border-0 bg-light' onClick={() => ordertodolist(todoitem.id)}>
                                    <img src="Rectangle 2.png" alt="" />
                                </button>
                            </div>
                            <div style={{ display: todoitem.status ? "block" : "none" }}>
                                <button className='border-0 bg-light' onClick={() => ordertodolist(todoitem.id)}>
                                    <img src="check 1.png" alt="" />
                                </button>
                            </div>
                            {/* <label htmlFor="todoitems"></label>
                            <input id="todoitems" className="fs-5 me-3" type="checkbox" onClick={() => ordertodolist(todoitem.id)} /> */}
                            {/* <p className="fs-6" style={{textDecoration: todoitem.status ? "line-through" : "none",}}>{todoitem.content}</p> */}
                            {/* <label htmlFor="edititems"></label> */}
                            <input className="fs-6 p-0 m-0 border-0 bg-light updatetodo_frame" style={{textDecoration: todoitem.status ? "line-through" : "none"}} type="text" placeholder={todoitem.content} onChange={(e) => {
                                const newTodoEdit = { ...todoEdit}
                                newTodoEdit[todoitem.id] = e.target.value
                                setTodoEdit(newTodoEdit)
                                setEditbtn(todoitem.id)
                            }}/>
                            <button className="ms-3"  style={{display:editbtn===todoitem.id?"block":"none"}} onClick={() => {updatodolist(todoitem.id);setEditbtn("none")}}>確認編輯</button>
                        </div>
                        <button className='border-0 bg-light' onClick={() => deletodolist(todoitem.id)}><img src="close (1) 1.png"/></button>
                        {/* <button onClick={() => ordertodolist(todoitem.id)}>shift</button> */}
                    </li>
                ))}
                </div>
                <div style={{ display: page==="done" ? "block" : "none" }}>
                {donetodos.map((todoitem,index) => (
                    <li key={index} className="d-flex mb-3 align-items-start justify-content-between">
                        <div className="d-flex align-items-start border-bottom pb-3 edit_428_w me-3">
                            <div style={{ display: todoitem.status ? "none" : "block" }}>
                                <button className='border-0 bg-light' onClick={() => ordertodolist(todoitem.id)}>
                                    <img src="Rectangle 2.png" alt="" />
                                </button>
                            </div>
                            <div style={{ display: todoitem.status ? "block" : "none" }}>
                                <button className='border-0 bg-light' onClick={() => ordertodolist(todoitem.id)}>
                                    <img src="check 1.png" alt="" />
                                </button>
                            </div>
                            {/* <label htmlFor="todoitems"></label>
                            <input id="todoitems" className="fs-5 me-3" type="checkbox" defaultChecked="true" onClick={() => {
                                // checkbox.current.checked=false;
                                ordertodolist(todoitem.id)
                            }} /> */}
                            {/* <p className="fs-6" style={{textDecoration: todoitem.status ? "line-through" : "none",}}>{todoitem.content}</p> */}
                            {/* <label htmlFor="edititems"></label> */}
                            <input className="fs-6 p-0 m-0 border-0 bg-light updatetodo_frame" style={{textDecoration: todoitem.status ? "line-through" : "none"}} type="text" placeholder={todoitem.content} onChange={(e) => {
                                const newTodoEdit = { ...todoEdit}
                                newTodoEdit[todoitem.id] = e.target.value
                                setTodoEdit(newTodoEdit)
                                setEditbtn(todoitem.id)
                            }}/>
                            <button className="ms-3"  style={{display:editbtn===todoitem.id?"block":"none"}} onClick={() => {updatodolist(todoitem.id);setEditbtn("none")}}>確認編輯</button>
                        </div>
                        <button className='border-0 bg-light' onClick={() => deletodolist(todoitem.id)}><img src="close (1) 1.png"/></button>
                        {/* <button onClick={() => ordertodolist(todoitem.id)}>shift</button> */}
                    </li>
                ))}
                </div>
            </ul>
            <div className="d-flex justify-content-between align-items-center">
                <p>{notyettodos.length}件事項未完成</p>
                <button className="bg-light text-black-50" onClick={()=>{
                    const clsdone=()=>{ todos.map((item)=>{if(item.status===true){deletodolist(item.id)}})
                        return todos.filter((item)=>item.status===false)}
                    setTodos(clsdone)
                    gettodolist()
                    alert("完成清除！")
                }}>清除已完成事項</button>
            </div>
        </div>
        </div>
    </div>)
}

export default Todo