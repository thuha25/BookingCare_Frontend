import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2021 Booking care. More information, please visit my youtube
          channel.
          <a href="/home"> &#8594; Click here &#8592;</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
