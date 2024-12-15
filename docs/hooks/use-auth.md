# useAuth

***

You can login, register, and reset password using this hook.

```jsx
const { login, forgetPassword, register, logout } = useAuth();
```

### login:

```jsx
const LoginPage = () => {
    const { login: { error, handleSubmit, loading } } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form onSubmit={(ev) => {
            ev.preventDefault();
            handleSubmit(username, password)
        }}>
            <input
                type='text'
                value={username}
                onChange={(ev) => setUsername(ev.target.value)} />
            <input
                type='password'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)} />
            <button
                disabled={loading}
                type='submit'>
                {loading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    )
}

LoginPage.setPageConfig = {
    guestOnly: true
}

export default LoginPage;
```

Once you have successfully logged in. You will be automatically redirected to another page.

### logout:

### register:

Register hook has 2 steps. The first step is user information and the second step is to verify the phone number.

```jsx
const RegisterPage = () => {
    const { register: { error, step, loading, handleCreateProfile, handleVerifyPhoneNumber } } = useAuth();

    //Step one
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneName, setPhoneName] = useState('');

    //Step two
    const [otp, setOtp] = useState('');

    return (
        <>
            {
                step === 'profileInfo'
                    ? (
                        <form onSubmit={(ev) => {
                            ev.preventDefault();
                            handleCreateProfile(username, password)
                        }}>
                            <input
                                type='email'
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)} />
                            <input
                                type='text'
                                value={firstName}
                                onChange={(ev) => setFirstName(ev.target.value)} />
                            <input
                                type='text'
                                value={lastName}
                                onChange={(ev) => setLastName(ev.target.value)} />
                            <input
                                type='password'
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)} />
                            <input
                                type='text'
                                value={phoneName}
                                onChange={(ev) => setPhoneName(ev.target.value)} />
                        </form>
                    ) : (
                        <form onSubmit={(ev) => {
                            ev.preventDefault();
                            handleVerifyPhoneNumber(otp, () => {
                                alert('success')
                                Router.push('/login')
                            })
                        }}>
                            <input
                                type='number'
                                value={otp}
                                onChange={(ev) => setOtp(ev.target.value)} />
                        </form>
                    )
            }
        </>

    )
}

RegisterPage.setPageConfig = {
    guestOnly: true
}

export default RegisterPage;
```

### forgetPassword:

Logging in is similar to registering. The first step is to enter the phone number, the second step is to confirm it.
Finally, a new password needs to be entered.

```jsx
const RegisterPage = () => {
    const {
        forgetPassword: {
            handleOtpSend,
            handleVerifyPhoneNumber,
            handleChangePassword,
            loading,
            step,
            error
        }
    } = useAuth();


    const [phoneName, setPhoneName] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');

    return (
        <>
            {
                step === 'otpSend'
                && (
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        handleOtpSend(phoneName)
                    }}>
                        <input
                            type='text'
                            value={phoneName}
                            onChange={(ev) => setPhoneName(ev.target.value)} />
                        <button disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
                    </form>
                )
            }
            {
                step === 'verifyPhoneNumber'
                && (
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        handleVerifyPhoneNumber(otp)
                    }}>
                        <input
                            type='number'
                            value={phoneName}
                            onChange={(ev) => setOtp(ev.target.valueAsNumber)} />
                        <button disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
                    </form>
                )
            }
            {
                step === 'changePassword'
                && (
                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        if (password === confirmPassword) {
                            handleChangePassword(otp, () => {
                                alert('success')
                                Router.push('/login')
                            })
                        } else {
                            alert('password and confirmPassword is not equal!')
                        }
                    }}>
                        <input
                            type='password'
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)} />
                        <input
                            type='password'
                            value={confirmPassword}
                            onChange={(ev) => setConfrimPassword(ev.target.value)} />
                        <button disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
                    </form>
                )
            }
        </>

    )
}

RegisterPage.setPageConfig = {
    guestOnly: true
}

export default RegisterPage;
```
