import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  handleButtonClick = () => {
    if (this.props.history) {
      this.props.history.push(`/co-so-y-te`);
    }
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.clinic" />
            </span>
            <button
              className="btn-section"
              onClick={() => this.handleButtonClick()}
            >
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider
              {...this.props.settings}
              autoplay={true}
              autoplaySpeed={2000}
              infinite={true}
            >
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      className="section-customize clinic-child"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-img section-medical-facility"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      />
                      <div className="clinic-name">
                        {" "}
                        <FormattedMessage id={`clinic.${item.name}`} />
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
