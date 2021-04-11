import React from 'react'
import EntityService from '../../services/entityservice'
import EnhancedTable from '../enhancedtable/enhancedtable'
import SpeciesDescription from './speciesdescription'
const appConstants = require("../../appconstants.json")
class SpeciesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "page": 1,
      "data": [],
      "species": null
    }
  }
  async componentDidMount() {
    try {
      let data = await EntityService.getData(appConstants["SPECIES"], this.state.page)
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
            id: 'classification',
            numeric: false,
            disablePadding: false,
            label: 'Classification'
          }, {
            id: 'designation',
            numeric: false,
            disablePadding: false,
            label: 'Designation'
          }, {
            id: 'average_height',
            numeric: false,
            disablePadding: false,
            label: 'Average Height'
          }, {
            id: 'skin_colors',
            numeric: false,
            disablePadding: false,
            label: 'Skin Colors'
          }
        ]} handleChangePage={(page) => this.handleChangePage(page)} count={this.state.count} onRowClick={url => this.onRowClick(url)} tableTitle="Species"/><SpeciesDescription species={this.state.species}/></div>)
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
      let data = await EntityService.getData(appConstants["SPECIES"], actualPage)
      this.setState({data: data.results, page, count: data.count})
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  async onRowClick(url) {
    try {
      let species = await EntityService.getDatum(url)
      this.setState({species})
      this.scrollToBottom()
    } catch (e) {
      console.error(e)
      throw e
    }

  }
}
export default SpeciesComponent
