import React from 'react'
import EntityService from '../../services/entityservice'
import EnhancedTable from '../enhancedtable/enhancedtable'
import VehicleDescription from './vehicledescription'
const appConstants = require("../../appconstants.json")
class VehiclesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "page": 1,
      "data": [],
      "vehicle": null
    }
  }
  async componentDidMount() {
    try {
      let data = await EntityService.getData(appConstants["VEHICLES"], this.state.page)
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
        }}><EnhancedTable data={this.state.data}
        orderBy="name" columnData={[
          {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Name'
          }, {
            id: 'model',
            numeric: false,
            disablePadding: false,
            label: 'Model'
          }, {
            id: 'manufacturer',
            numeric: false,
            disablePadding: false,
            label: 'Manufacturer'
          }, {
            id: 'cost_in_credits',
            numeric: false,
            disablePadding: false,
            label: 'Cost(Credits)'
          }, {
            id: 'length',
            numeric: false,
            disablePadding: false,
            label: 'Length'
          }
        ]} handleChangePage={(page) => this.handleChangePage(page)} count={this.state.count} onRowClick={url => this.onRowClick(url)} tableTitle="Vehicles"/><VehicleDescription vehicle={this.state.vehicle}/></div>)
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
      let data = await EntityService.getData(appConstants["VEHICLES"], actualPage)
      this.setState({data: data.results, page, count: data.count})
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  async onRowClick(url) {
    try {
      let vehicle = await EntityService.getDatum(url)
      this.setState({vehicle})
      this.scrollToBottom()
    } catch (e) {
      console.error(e)
      throw e
    }

  }
}
export default VehiclesComponent
