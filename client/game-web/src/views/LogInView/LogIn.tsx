import './LogIn.css'

const LogIn: React.FC = () => {

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        //Prevent page reload
        event.preventDefault();

        let username = document.getElementById('username') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        console.log(username.value);
        console.log(password.value);

        // Find user login info
        // const userData = database.find((user) => user.username === uname.value);

        // // Compare user info
        // if (userData) {
        //   if (userData.password !== pass.value) {
        //     // Invalid password
        //     setErrorMessages({ name: "pass", message: errors.pass });
        //   } else {
        //     setIsSubmitted(true);
        //   }
        // } else {
        //   // Username not found
        //   setErrorMessages({ name: "uname", message: errors.uname });
        // }
    };
    return (
    <div className="form" onSubmit={handleSubmit} >
        <form autoComplete="off">
            <div className="input-container">
                <label>Username </label>
                <input type="text" id="username" required />
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" id="password" required />
            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
        </form>
    </div>
    )
}

export default LogIn;