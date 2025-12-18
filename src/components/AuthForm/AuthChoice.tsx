import React from 'react'
type AuthChoiceProps = {
    text: string;
    chosen: boolean;
    alignement: "left" | "right";
    onClickAct: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
  
const AuthChoice = ({text, chosen, alignement, onClickAct}: AuthChoiceProps ) => {
    let dynamicClassName = "";
    if (chosen) {
        dynamicClassName = "w-35 h-13 text-xl font-bold bg-teal text-white border-t-1 border-b-1 border-darkgrey-300 transition-colors duration-200 ease-in-out"
    } else {
        dynamicClassName = "w-35 h-13 text-xl font-bold bg-white text-teal border-t-1 border-b-1 border-darkgrey-300 transition-colors duration-200 ease-in-out"
    }
    if (alignement == "left") {
        dynamicClassName += " border-l-1 rounded-l-md";
    } else {
        dynamicClassName += " border-r-1 rounded-r-md";
    }
    return (
        <button className={dynamicClassName} onClick={onClickAct}>
            {text}
        </button>
    )
}

export default AuthChoice;