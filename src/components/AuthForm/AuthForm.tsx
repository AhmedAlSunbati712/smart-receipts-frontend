import { useState } from "react";
import { TextInput } from "./TextInput";
import AuthChoice from "./AuthChoice";
import { Button } from "@/components/ui/button";
import { signup, login } from "@/api/user";
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = () => {
    const [login_chosen, set_login_choice] = useState(true);
    const [signup_chosen, set_signup_choice] = useState(false);
    const [loginData, set_loginData] = useState({
        email: "",
        password: "",
    });
    const [signupData, set_signupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const onClickLogin = (e: any) => {
        e.preventDefault();
        set_login_choice(true);
        set_signup_choice(false);
    }
    const onClickSignup = (e: any) => {
        e.preventDefault();
        set_login_choice(false);
        set_signup_choice(true);
    }

    const onSubmitLogin = async (e: any) => {
        e.preventDefault();
        try {
            const data = await login(loginData);
            toast.success(`Welcome ${data.firstName}!`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to log in!");
        }
    }
    const onSubmitSignup = async (e: any) => {
        e.preventDefault();
        try {
            const data = await signup(signupData);
            toast.success("Signup succesful!");
            set_login_choice(true);
            set_signup_choice(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to sign up!");
        }
    }
    
    return (
        <div className="w-115 h-142 bg-white shadow-lg p-3 flex flex-col items-center rounded-lg border border-3 border-teal">
            <div className="flex mt-6">
                <AuthChoice text="Log in" chosen={login_chosen} alignement="left" onClickAct={onClickLogin} />
                <AuthChoice text="Sign up" chosen={signup_chosen} alignement="right" onClickAct={onClickSignup}/>
            </div>
            <div>
                <h1 className="text-teal text-4xl font-bold mt-7">
                    Smart Receipts
                </h1>
            </div>
            <div className="w-80 h-[3px] rounded-md bg-lightgrey mt-2"></div>
            {login_chosen && (
                <>
                <div className="w-85 mt-7">
                <TextInput label="Email" value={loginData.email} name="email" className="mt-5" onChange={(e) => set_loginData({...loginData, email: e.target.value})}/>
                </div>
                <div className="w-85 mt-8">
                    <TextInput label="Password" value={loginData.password} name="password" type="password" className="mt-8" onChange={(e) => set_loginData({...loginData, password: e.target.value})}/>
                </div>
                <div className="mt-5">
                    <Button className="bg-teal text-white hover:bg-darkteal w-25 h-12 font-bold text-md mt-7" variant="default" onClick={onSubmitLogin}>
                        Log in
                    </Button>
                </div>
                </>
            )}
            { signup_chosen && (
                <>
                <div className="w-85 flex flex-row gap-3 mt-7">
                    <div>
                        <TextInput label="First Name" value={signupData.firstName} name="firstName" className="mt-5" onChange={(e) => set_signupData({...signupData, firstName: e.target.value})}/>
                    </div>
                    <div>
                        <TextInput label="Last Name" value={signupData.lastName} name="lastName" className="mt-5" onChange={(e) => set_signupData({...signupData, lastName: e.target.value})}/>
                    </div>
                </div>
                <div className="w-85 mt-7">
                    <TextInput value={signupData.email} label="Email" name="email" onChange={(e) => set_signupData({...signupData, email: e.target.value})}/>
                </div>
                <div className="w-85 mt-7">
                    <TextInput value={signupData.password} label="Password" name="password" type="password" onChange={(e) => set_signupData({...signupData, password: e.target.value})}/>
                </div>
                <div className="mt-7">
                    <Button className="bg-teal text-white hover:bg-darkteal w-25 h-12 font-bold text-md" variant="default" onClick={onSubmitSignup}>
                        Sign Up
                    </Button>
                </div>
                </>
            )}
        </div>
    )
}

export default AuthForm;