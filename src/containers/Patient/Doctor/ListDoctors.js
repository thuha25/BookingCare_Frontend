import React, { Component } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

import "./ListDoctors.scss";
class ListDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    return (
      <div>
        <HomeHeader />
        <div className="danhsach">
          <div className="cuaso-dau">
            <button
              type="button"
              className="cuaso-dong"
              data-dl-cuaso="bacsi"
              aria-label="Đóng"
              onClick={this.returnToHome}
            >
              <span className="bt-g bt-g-muiten-trai" aria-hidden="true">
                <i className="fas fa-home"></i>
              </span>
            </button>
            <h5 className="cuaso-tieude">/ Danh sách bác sĩ nổi bật</h5>
          </div>
          <div className="cuaso-noidung">
            <div className="bacsi-ds" data-dl-tai="1">
              {arrDoctors && arrDoctors.length > 0 && (
                <ul>
                  {arrDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = Buffer.from(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                    return (
                      <li key={index}>
                        <a href={`/detail-doctor/${item.id}`}>
                          <img
                            src={imageBase64}
                            className="luoi"
                            width="100%"
                            height="100"
                            alt={item.name}
                          />
                          <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListDoctors)
);
