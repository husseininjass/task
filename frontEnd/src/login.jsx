import axios from 'axios';
import { useState, useRef } from 'react';
function Login() {
    const [data, setData] = useState({});
    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((values) => ({ ...values, [name]: value }));
    };
    const subHandler = e=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login', data)
            .then(response => {
                console.log('done');
            })

    }
    return (
        <>
            <div className=''>
                <form className='w-100 d-inline-block' onSubmit={subHandler}>
                    <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                    <input type="text" className="form-control w-25" id="exampleInputEmail1" aria-describedby="emailHelp" name='phone' onChange={inputHandler}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control w-25" id="exampleInputPassword1" name='password' onChange={inputHandler}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </>
    );
}

export default Login;