import { useState } from "react";
import { TextInput } from "./TextInput";
import AuthChoice from "./AuthChoice";
import { Button } from "@/components/ui/button";

const AuthForm = () => {
    const [login_chosen, set_login_choice] = useState(true);
    const [signup_chosen, set_signup_choice] = useState(false);
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
                <div className="w-90 mt-7">
                <TextInput label="Email" name="email" className="mt-5"/>
                </div>
                <div className="w-90 mt-8">
                    <TextInput label="Password" name="password" type="password" className="mt-8"/>
                </div>
                <div className="mt-5">
                    <Button className="bg-teal text-white hover:bg-darkteal w-25 h-12 font-bold text-md mt-7" variant="default">
                        Log in
                    </Button>
                </div>
                </>
            )}
            { signup_chosen && (
                <>
                <div className="w-85 flex flex-row gap-3 mt-7">
                    <div>
                        <TextInput label="First Name" name="firstName" className="mt-5"/>
                    </div>
                    <div>
                        <TextInput label="Last Name" name="lastName" className="mt-5"/>
                    </div>
                </div>
                <div className="w-85 mt-7">
                    <TextInput label="Email" name="email"/>
                </div>
                <div className="w-85 mt-7">
                    <TextInput label="Password" name="password" type="password"/>
                </div>
                <div className="mt-7">
                    <Button className="bg-teal text-white hover:bg-darkteal w-25 h-12 font-bold text-md" variant="default">
                        Sign Up
                    </Button>
                </div>
                </>
            )}
        </div>
    )
}

export default AuthForm;