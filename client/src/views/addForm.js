import React from "react";
import axios from "axios";
import { withRouter } from "react-router";

class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.take = this.take.bind(this);
    this.publish = this.publish.bind(this);

    this.state = {
      first_name: "",
      status: "",
      message: ""
    };
  }

  take = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case "first_name":
        return this.setState({ first_name: e.target.value });
      default:
        return this.setState({
          first_name: ""
        });
    }
  };

  publish = (e) => {
    e.preventDefault();
    const newStudent = {
      first_name: this.state.first_name,
    };
    axios
      .post("/add", newStudent, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        this.props.history.push("/");
        this.setState({ status: "ok", message: "Published successfully!" });
      })
      .catch((error) => {
        this.setState({ status: "no", message: "Publishing failed!" });
        console.log("User auth error: " + error);
      });
  };

  render() {
    return (
      <form id="add">
        <div className="form-block">
          <div className="add_form_group">
            <label className="add_form_label"> First Name: </label>
            <div className="textInput">
              <input
                onChange={this.take}
                name="first_name"
                value={this.state.first_name}
                type="text"
                className="add_form_control"
                placeholder="Enter First Name"
              />
            </div>
          </div>
          <br />
          <div className="add_form_group" id="action_btns">
            <button type="button" onClick={this.publish}>
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(AddForm);
