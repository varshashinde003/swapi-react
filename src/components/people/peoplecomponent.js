import React from 'react'
import EntityService from '../../services/entityservice'
import EnhancedTable from '../enhancedtable/enhancedtable'
import PersonDescription from './persondescription'
const appConstants = require("../../appconstants.json")
class PeopleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "page": 1,
      "data": [],
      "person": null
    }
  }
  async componentDidMount() {
    try {
      let data = await EntityService.getData(appConstants["PEOPLE"], this.state.page)
      this.setState({data: data.results, count: data.count})
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  scrollToBottom() {
    this.el.scrollIntoView({behavior: 'smooth'});
  }
  render() {
    if (this.state.data.length > 0) {
      return (<div ref={el => {
          this.el = el;
        }}><EnhancedTable data={this.state.data} orderBy="name" columnData={[
          {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Name'
          }, {
            id: 'height',
            numeric: false,
            disablePadding: false,
            label: 'Height'
          }, {
            id: 'mass',
            numeric: false,
            disablePadding: false,
            label: 'Mass'
          }, {
            id: 'hair_color',
            numeric: false,
            disablePadding: false,
            label: 'Hair Color'
          }, {
            id: 'skin_color',
            numeric: false,
            disablePadding: false,
            label: 'Skin Color'
          }
        ]} handleChangePage={(page) => this.handleChangePage(page)} count={this.state.count} onRowClick={url => this.onRowClick(url)} tableTitle="People"/><PersonDescription person={this.state.person}/></div>)
    } else {
      return (<div>Loading...</div>)
    }

  }
  async handleChangePage(page) {
    try {
      let actualPage = 0;
      if (page <= 0) {
        actualPage = 1
      } else {
        actualPage = page + 1
      }
      let data = await EntityService.getData(appConstants["PEOPLE"], actualPage)
      this.setState({data: data.results, page, count: data.count})
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  async onRowClick(url) {
    try {
      let person = await EntityService.getDatum(url)
      this.setState({person})
      this.scrollToBottom()
    } catch (e) {
      console.error(e)
      throw e
    }

  }
}
export default PeopleComponent
