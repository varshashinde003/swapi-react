import React from 'react'
import EntityService from '../../services/entityservice'
import EnhancedTable from '../enhancedtable/enhancedtable'
import PlanetDescription from './planetdescription'
const appConstants = require("../../appconstants.json")
class PlanetsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "page": 1,
      "data": [],
      "planet": null
    }
  }
  async componentDidMount() {
    try {
      let data = await EntityService.getData(appConstants["PLANETS"], this.state.page)
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
            id: 'rotation_period',
            numeric: false,
            disablePadding: false,
            label: 'Rotation Period'
          }, {
            id: 'orbital_period',
            numeric: false,
            disablePadding: false,
            label: 'Orbital Period'
          }, {
            id: 'diameter',
            numeric: false,
            disablePadding: false,
            label: 'Diameter'
          }, {
            id: 'climate',
            numeric: false,
            disablePadding: false,
            label: 'Climate'
          }
        ]} handleChangePage={(page) => this.handleChangePage(page)} count={this.state.count} onRowClick={url => this.onRowClick(url)} tableTitle="Planets"/><PlanetDescription planet={this.state.planet}/></div>)
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
      let data = await EntityService.getData(appConstants["PLANETS"], actualPage)
      this.setState({data: data.results, page, count: data.count})
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  async onRowClick(url) {
    try {
      let planet = await EntityService.getDatum(url)
      this.setState({planet})
      this.scrollToBottom()
    } catch (e) {
      console.error(e)
      throw e
    }

  }
}
export default PlanetsComponent
