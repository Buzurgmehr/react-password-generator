import React, {useState, useRef, useEffect} from "react";
import {toast} from "react-toastify";
import {FaClipboard} from "react-icons/fa";
import {COPY_SUCCESS, ALERT} from "./Messages";
import {numbers, lowerCaseLetters, upperCaseLetters, specialCharacters} from "./Characters";

toast.configure();

function App() {
    const [password,
        setPassword] = useState("");
    const [passwordLength,
        setPasswordLength] = useState(5);
    const [includeUppercase,
        setIncludeUppercase] = useState(true);
    const [includeLowercase,
        setIncludeLowercase] = useState(true);
    const [includeNumbers,
        setIncludeNumbers] = useState(true);
    const [includeSymbols,
        setIncludeSymbols] = useState(true);

    const copyBtn = useRef();

    const handleGeneratePassword = (e) => {
        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            notify(ALERT, true);
            return;
        }

        let characterList = "";

        if (includeLowercase) {
            characterList += lowerCaseLetters;
        }

        if (includeUppercase) {
            characterList += upperCaseLetters;
        }

        if (includeNumbers) {
            characterList += numbers;
        }

        if (specialCharacters) {
            characterList += specialCharacters;
        }

        setPassword(createPassword(characterList));
    };

    const createPassword = (characterList) => {
        let password = "";
        const characterListLength = characterList.length;

        for (let i = 0; i < passwordLength; i++) {
            const characterIndex = getRandomIndex(characterListLength);
            password += characterList.charAt(characterIndex);
        }

        return password;
    };

    const getRandomIndex = (limit) => {
        return Math.round(Math.random() * limit);
    };

    useEffect(() => {
        handleGeneratePassword();
    }, []);

    const copyToClipboard = () => {
        const newTextArea = document.createElement("textarea");
        newTextArea.innerText = password;
        document
            .body
            .appendChild(newTextArea);
        newTextArea.select();
        document.execCommand("copy");
        newTextArea.remove();

        copyBtn.current.disabled = true;
        setTimeout(() => {
            copyBtn.current.disabled = false;
        }, 3000);
    };

    const notify = (message, hasError = false) => {
        if (hasError) {
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } else {
            toast(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    };

    const handleCopyPassword = (e) => {
        copyToClipboard();

        notify(COPY_SUCCESS);
    };

    return (
        <div className="container">
            <div className="generator">
                <h2 className="title">Password Generator</h2>

                <div className="password">
                    {password}
                    <button className="clipboard" onClick={handleCopyPassword} ref={copyBtn}>
                        <FaClipboard/>
                    </button>
                </div>

                <div className="form-group">
                    <label htmlFor="password-length">Password length</label>
                    <input
                        name="password-length"
                        id="password-length"
                        type="number"
                        max="20"
                        min="10"
                        defaultValue={passwordLength}
                        onChange={(e) => setPasswordLength(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="uppercase-letters">Uppercase letters</label>
                    <input
                        id="uppercase-letters"
                        name="uppercase-letters"
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="lowercase-letters">Lowercase letters</label>
                    <input
                        id="lowercase-letters"
                        name="lowercase-letters"
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={(e) => setIncludeLowercase(e.target.checked)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="include-numbers">Include Numbers</label>
                    <input
                        id="include-numbers"
                        name="include-numbers"
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="include-symbols">Include Symbols</label>
                    <input
                        id="include-symbols"
                        name="include-symbols"
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}/>
                </div>

                <button className="btn_generator" onClick={handleGeneratePassword}>
                    Generate Password
                </button>
            </div>
        </div>
    );
}

export default App;
