import React from "react";
import axios from "axios";
import Spinner from "../views/spinner";
import "../styles/home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get("/all")
      .then((res) => {
        this.setState({
          students: res.data,
          loading: false,
        });
      })
      .catch(function (error) {
        console.log("Fetching error", error);
      });
  }

  render() {
    const { students, loading } = this.state;
    if (loading) {
      return (
        <div id="home">
          <Spinner />
        </div>
      );
    }
    return (
      <div id="home">
        {students.map((item) => {
          return (
            <button className="student" key={item.first_name}>
              {"Hello: "}
              {item.first_name}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Home;
