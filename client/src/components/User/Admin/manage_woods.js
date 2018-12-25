import React, { Component } from "react";
import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetField
} from "../../utils/Form/formActions";

import { connect } from "react-redux";

import { getWoods, addWood } from "../../../actions/products_actions";

class ManageWoods extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter the wood"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  showCategoryItem = () =>
    this.props.products.woods
      ? this.props.products.woods.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  componentDidMount = () => {
    this.props.dispatch(getWoods());
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formdata, "woods");
    this.setState({
      formError: false,
      formdata: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetField(this.state.formdata, "woods");

    this.setState({
      formSuccess: true,
      formdata: newFormData
    });

    setTimeout(() => {
      this.setState({
        formSuccess: false
      });
    }, 3000);
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "woods");

    let formIsValid = isFormValid(this.state.formdata, "woods");

    let existingWoods = this.props.products.woods;

    if (formIsValid) {
      this.props
        .dispatch(addWood(dataToSubmit, existingWoods))
        .then(response => {
          if (response.payload.success) {
            this.resetFieldHandler();
          } else {
            this.setState({ formError: true });
          }
        });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>

        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItem()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />

              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}

              <button onClick={event => this.submitForm(event)}>
                Add wood
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapsStateToProps)(ManageWoods);
