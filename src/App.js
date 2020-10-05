import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    username: "",
    email: "",
    pass: "",
    accept: false,
    message: "",

    errors: {
      username: false,
      email: false,
      pass: false,
      accept: false,
    },
  };

  messages = {
    username_incorrect:
      "Nazwa musi być dłuższa niż 10 znaków i nie może zawierać spacji",
    email_incorrect: "Brak @ w mailu",
    password_incorrect: "Hasło mus mieć 8 znaków",
    accept_incorrect: "Nie zaznaczona zgoda",
  };

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;
    const checked = e.target.checked;
    if (type === "text" || type === "password" || type === "email") {
      this.setState({
        [name]: value,
      });
    } else if (type === "checkbox") {
      this.setState({
        [name]: checked,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const validation = this.formValidation();
    console.log(validation);
    if (validation.correct) {
      this.setState({
        username: "",
        email: "",
        pass: "",
        accept: false,
        message: "Formularz został wysłany",

        errors: {
          username: false,
          email: false,
          pass: false,
          accept: false,
        },
      });
      console.log("formularz wysłanys");
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept,
        },
      });
    }
  };

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;
    if (
      this.state.username.length > 10 &&
      this.state.username.indexOf(" ") === -1
    ) {
      username = true;
    }
    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }

    if (this.state.pass.length === 8) {
      password = true;
    }

    if (this.state.accept) {
      accept = true;
    }

    if (username && email && password && accept) {
      correct = true;
    }

    return {
      correct,
      username,
      email,
      password,
      accept,
    };
  };

  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(
        () =>
          this.setState({
            message: "",
          }),
        2000
      );
    }
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">
            Twoje imię:
            <input
              id="user"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.errors.username && (
              <span>{this.messages.username_incorrect}</span>
            )}
          </label>
          <label htmlFor="email">
            Twoje email:
            <input
              id="email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email && (
              <span>{this.messages.email_incorrect}</span>
            )}
          </label>
          <label htmlFor="password">
            Twoje hasło:
            <input
              id="password"
              type="password"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange}
            />
            {this.state.errors.pass && (
              <span>{this.messages.password_incorrect}</span>
            )}
          </label>

          <label htmlFor="accept">
            <input
              id="accept"
              type="checkbox"
              name="accept"
              checked={this.state.accept}
              onChange={this.handleChange}
            />
            Wyrażam zgodę
          </label>
          {this.state.errors.accept && (
            <span>{this.messages.accept_incorrect}</span>
          )}
          <button>Zapisz się</button>
        </form>
        {this.state.message && <h3>{this.state.message}</h3>}
      </div>
    );
  }
}

export default App;
