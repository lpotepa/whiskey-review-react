import React, {Component} from 'react'
import {connect} from 'react-redux';
import {fetchWhiskey, changeWhiskeyRating, updateWhiskey } from '../../actions/whiskeys'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Row, Col, Container } from 'react-bootstrap'
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Rating from 'react-rating';

class ShowWhiskey extends Component {

  constructor(props){
    super(props)
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.renderRatings = this.renderRatings.bind(this)
  }
  
  componentDidMount(){
    let { id } = this.props.match.params
    this.props.fetchWhiskey(id);
  }

  onSubmit(formData){
    this.props.updateWhiskey(formData)
  }

  handleRatingChange(id, type, value){
    this.props.change(`ratings.${type}`, value)
    this.props.changeWhiskeyRating(id, type, value)
  }

  renderRatings(){
    let whiskey = this.props.whiskey || {}
    if (whiskey.ratings) {
      return _.map(whiskey.ratings, (value, type) => {
        return (
          <div key={type}>{_.capitalize(type)}: 
            <Rating
              {...this.props} 
              initialRating={value}
              stop={10}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              onChange={(rate) => { this.handleRatingChange(whiskey.id, type, rate)} }
            />
          </div>
        )
      })
    }
  }

  render(){
    let whiskey = this.props.whiskey || {};
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
    whiskey : state.whiskeys[ownProps.match.params.id],
    initialValues: state.whiskeys[ownProps.match.params.id],
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  dispatch,
  fetchWhiskey,
  updateWhiskey,
  changeWhiskeyRating,
}, dispatch)

ShowWhiskey = reduxForm({ form: 'whiskeyForm'})(ShowWhiskey);
export default connect(mapStateToProps, mapDispatchToProps)(ShowWhiskey);
