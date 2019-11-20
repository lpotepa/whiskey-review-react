import React, {Component} from 'react'
import {connect} from 'react-redux';
import { createWhiskey } from '../../actions/whiskeys'
import { fetchRatingTypes } from '../../actions/rating-types'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Rating from 'react-rating';

class CreateWhiskey extends Component {

  constructor(props){
    super(props)
    this.renderRatings = this.renderRatings.bind(this)
    this.state = {}
  }
  
  componentDidMount(){
    this.props.fetchRatingTypes('whiskey')
  }

  componentDidUpdate(){
    if (this.props.ratingTypes) {
      this.props.ratingTypes.forEach((type) => {
        this.props.change(`ratings.${type}`, 1)
      })
    }
  }

  onSubmit(formData){
    this.props.createWhiskey(formData)
  }

  renderRatings(){
    if (this.props.ratingTypes) {
      let { ratingTypes } = this.props
      return _.map(ratingTypes, (type) => {
        return (
          <div key={type}>{_.capitalize(type)}: 
            <Rating
              {...this.props} 
              initialRating={1}
              stop={10}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              onChange={(rate) => { this.props.change(`ratings.${type}`, rate) } }
            />
          </div>
        )
      })
    }
  }

  render(){
    return(
      <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} >
        <div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <Field name="name" className="form-control" component="input" type="text" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <Field className="form-control" name="description" rows="10" component="textarea" type="text" required />
          </div>
          {this.renderRatings()}
        </div>

        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ratingTypes: state.ratingTypes.whiskey,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  dispatch,
  fetchRatingTypes,
  createWhiskey
}, dispatch)

CreateWhiskey = reduxForm({ form: 'whiskeyForm'})(CreateWhiskey);
export default connect(mapStateToProps, mapDispatchToProps)(CreateWhiskey);
