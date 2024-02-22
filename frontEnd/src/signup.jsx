import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [ver, setOtp] = useState({});
    const otp = useRef();

    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((values) => ({ ...values, [name]: value }));
    };

    const otpHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setOtp((values) => ({ ...values, [name]: value }));
    };

    const subHandler = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/signup', data)
            .then(response => {
                if(response.data.status === 201){
                    otp.current.style.display = 'block';
                }
            })
    };

    const otpSub = e => {
        e.preventDefault();
        const requestData = { ...data, ...ver };
        axios.post('http://127.0.0.1:8000/api/verify', requestData)
            .then(r => {
                if(r.data.status===201){
                    navigate('/');
                }
            })
    };

    return (
        <div className=''>
            <form className='w-100 d-inline-block' onSubmit={subHandler}>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="text" className="form-control w-25" id="phoneNumber" name="phoneNumber" aria-describedby="emailHelp" onChange={inputHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control w-25" id="name" name="name" aria-describedby="emailHelp" onChange={inputHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control w-25" id="password" name="password" aria-describedby="emailHelp" onChange={inputHandler} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <form style={{ display: 'none' }} ref={otp} onSubmit={otpSub}>
                <label>Verify Phone Number : plese enter your otp </label>
                <input type="text" onChange={otpHandler} name='otp'/>
                <input type="submit" value="verify"/>
            </form>
        </div>
    );
}

export default SignUp;
