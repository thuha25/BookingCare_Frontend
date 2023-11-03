import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialtly.scss";
import { getAllSpecialty } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecially: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({ dataSpecially: res.data ? res.data : [] });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  render() {
    let { dataSpecially } = this.state;
    return (
      <div>
        <div className="cuaso cuaso-mo">
          <div className="cuaso-vung">
            <div className="cuaso-dau">
              <h5 className="cuaso-tieude">
                <FormattedMessage id={`homeheader.speciality`} />
              </h5>
              <button
                type="button"
                className="cuaso-dong"
                data-dl-cuaso="chuyenkhoa"
                aria-label="Đóng"
                onClick={this.returnToHome}
              >
                <span className="bt-g bt-g-muiten-trai" aria-hidden="true">
                  <i className="fas fa-chevron-left"></i>
                </span>
              </button>
            </div>
            <div className="cuaso-noidung">
              <div className="chuyenkhoa-ds" data-dl-tai="1">
                <ul>
                  {dataSpecially &&
                    dataSpecially.length > 0 &&
                    dataSpecially.map((item, index) => (
                      <li key={index}>
                        <a href={`/detail-specialty/${item.id}`}>
                          <img
                            src={item.image}
                            className="luoi"
                            width="100"
                            height="67"
                            alt={item.name}
                          />
                          <h3>
                            <FormattedMessage id={`specialty.${item.name}`} />
                          </h3>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
