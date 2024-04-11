import React, { useState } from 'react';
import mainLogo from "../../img/logo.png"
import OtpInput from 'react-otp-input';
import { Button } from 'antd';
import Swal from 'sweetalert2'

function OtpVerification() {
    const [otp, setOtp] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (otpValue, index) => {
        console.log(otpValue, index);
        setOtp(otpValue);
        setIsButtonEnabled(otpValue.length === 5);
        setError("")
    };

    const handleVerify = () => {
        if (otp === '00000') {
            // alert('yes')
            setError('')
            console.log("OTP entered:", otp);
            Swal.fire({
                title: 'Successful !',
                text: "You have successfully verified your account.",
                icon: 'success',
                confirmButtonText: 'Done',

            })

        }
        else {
            setError('invalid otp')
            // Swal.fire({
            //     title: 'Error',
            //     text: 'Invalid OTP. Please try again.',
            //     icon: 'error',
            //     confirmButtonColor: '#3085d6',
            //     confirmButtonText: 'Okay'
            // });
        }
    };

    return (
        <>
            <div className='flex justify-center mt-5 mb-3'>
                <img src={mainLogo} alt="logo" width={140} />
            </div>
            <div className='flex justify-center items-center'>
                <div className='login_container flex justify-center items-center shadow-myshadow p-12 bg-white rounded-lg'>
                    <div>

                        <img src="img/login_signup/otp.gif" alt="" width={170} className='m-auto mb-11' />
                        <h1 className='text-3xl font-bold text-center'>OTP Verification</h1>
                        <p className='mt-2 text-lg text-rgray text-center'>Enter the 5 digit verification code recieved on your Email ID</p>
                        <h5 className='flex text-xl font-bold text-start mt-10'>Verification Code</h5>

                        <OtpInput
                            numInputs={5}
                            value={otp}
                            inputType="tel"
                            onChange={handleChange}
                            otpType="number"
                            inputStyle={{
                                width: '5rem',
                                height: '5rem',
                                margin: '1rem',
                                fontSize: '35px',
                                fontWeight: '700',
                                borderRadius: '8px',
                                border: "1px solid gray",
                                backgroundColor: "transparent",
                                outline: "none",
                            }}
                            shouldAutoFocus={true}
                            renderInput={(inputProps, index) => <input {...inputProps} id={`otp-${index}`} key={index}

                            // disabled={index !=}
                            />}
                        />
                        {error ? (<p className='text-red-500 text-base'>Invalid OTP</p>) : <p></p>}
                        <Button
                            className='bg-rblue mt-9 w-full h-full text-white text-base py-2 font-bold'
                            htmlType="submit"
                            onClick={handleVerify}
                            disabled={!isButtonEnabled}
                        >
                            Verify OTP
                        </Button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default OtpVerification;
