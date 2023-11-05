import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import { getAllSpecialty } from "../../../services/userService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import "./ListSpecialty.scss";
class ListSpecialty extends Component {
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
        <HomeHeader />
        <div className="danhsach">
          <div className="cuaso-dau">
            <button
              type="button"
              className="cuaso-dong"
              data-dl-cuaso="chuyenkhoa"
              aria-label="Đóng"
              onClick={this.returnToHome}
            >
              <span className="bt-g bt-g-muiten-trai" aria-hidden="true">
                <i className="fas fa-home"></i>
              </span>
            </button>
            <h5 className="cuaso-tieude"> / Danh sách chuyên khoa khám</h5>
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
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSpecialty);
