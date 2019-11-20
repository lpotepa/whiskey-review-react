import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import { fetchRatingTypes } from '../../actions/rating-types'
import _ from 'lodash';
import history from '../../router/history'
import qs from 'query-string'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Col, Container, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class Header extends Component {
  constructor(props){
    super(props)
    this.state = { search: {} }
    this.search = this.search.bind(this)
    this.renderRatingFields = this.renderRatingFields.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.fetchRatingTypes('whiskey')
  }

  renderLinks(){
    return ([
      <li className="nav-item" key={1}>
        <Link to="">Home</Link>
      </li>
    ])
  }

  handleChange(e, type){
    let searchParms = this.state.search
    searchParms[type] = e.target.value
    this.setState({search: searchParms})
  }

  renderRatingFields(){
    if (this.props.ratingTypes) {
      let { ratingTypes } = this.props
      return ratingTypes.map((type) => {
        return (
          <div key={type}>
            <Form.Label className="mr-sm-5">{type}</Form.Label>
            <FormControl onChange={(e) => {this.handleChange(e, type)}} as="select" className="mr-sm-5">
              <option></option>
              {[...Array(10).keys()].map((value) => {
                return <option key={value+1}>{value+1}</option>
              })}
            </FormControl>
          </div>
        )
      })
    }
  }

  search(e){
    e.preventDefault()
    let url = `?${qs.stringify(this.state.search)}`
    history.push(url)
  }_

  render(){
    return(
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><Link className="navbar-brand" to="">Whiskey Review</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="">Home</Link>
            <Link className="nav-link" to="/create-whiskey">Create</Link>
          </Nav>
          <Form inline onSubmit={this.search}>
            {this.renderRatingFields()}
            <FormControl type="text" onChange={(e) => {this.handleChange(e, "name")}} 
              placeholder="Search by name" className="mr-sm-2" />
            <FormControl type="text" onChange={(e) => {this.handleChange(e, "description")}}
              placeholder="Search by description" className="mr-sm-2" />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
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
  fetchRatingTypes
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header);
