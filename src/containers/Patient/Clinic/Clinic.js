import React, { Component } from "react";
import { connect } from "react-redux";
import "./Clinic.scss";
import { getAllClinic } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
class Clinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({ dataClinic: res.data ? res.data : [] });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  render() {
    let { dataClinic } = this.state;
    return (
      <div>
        <div className="cuaso cuaso-mo">
          <div className="cuaso-vung">
            <div className="cuaso-dau">
              <h5 className="cuaso-tieude">
                <FormattedMessage id={`homeheader.health-facility`} />
              </h5>
              <button
                type="button"
                className="cuaso-dong"
                data-dl-cuaso="cosoyte"
                aria-label="Đóng"
                onClick={this.returnToHome}
              >
                <span className="bt-g bt-g-muiten-trai" aria-hidden="true">
                  <i className="fas fa-chevron-left"></i>
                </span>
              </button>
            </div>
            <div className="cuaso-noidung">
              <div className="cosoyte-ds" data-dl-tai="1">
                <ul>
                  {dataClinic &&
                    dataClinic.length > 0 &&
                    dataClinic.map((item, index) => (
                      <li key={index}>
                        <a href={`/detail-clinic/${item.id}`}>
                          <img
                            src={item.image}
                            className="luoi"
                            width="100"
                            height="67"
                            alt={item.name}
                          />
                          <h3>
                            <FormattedMessage id={`clinic.${item.name}`} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
