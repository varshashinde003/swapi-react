import React from 'react'
import EntityService from '../../services/entityservice'
import EnhancedTable from '../enhancedtable/enhancedtable'
import FilmDescription from './filmdescription'
const appConstants = require("../../appconstants.json")
class FilmsComponent extends React.Component{
   constructor(props){
    super(props)
    this.state = {
      "page":1,
      "data":[],
      "film":null
    }
  }
  async componentDidMount(){
    try{
      let data = await EntityService.getData(appConstants["FILMS"],this.state.page)
      this.setState({data:data.results,count:data.count})
    }catch(e){
      console.error(e)
    }
  }
  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }
  render(){
    if(this.state.data.length>0){
      return (<div ref={el => { this.el = el; }}><EnhancedTable data={this.state.data}
        orderBy="episode_id"
        columnData={[
              { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
              { id: 'episode_id', numeric: false, disablePadding: false, label: 'Episode' },
              { id: 'director', numeric: false, disablePadding: false, label: 'Director' },
              { id: 'producer', numeric: false, disablePadding: false, label: 'Producer' },
              { id: 'release_date', numeric: false, disablePadding: false, label: 'Released on' }]}
        handleChangePage={()=>this.handleChangePage()}
        count={this.state.count}
        onRowClick={url=>this.onRowClick(url)}
        tableTitle="Films"
        /><FilmDescription film={this.state.film}/></div>)
      }else{
        return (<div>Loading...</div>)
      }

  }
  async handleChangePage(){
    try{
      let page = this.state.page
      page = page + 1
      let data = await EntityService.getData(appConstants["FILMS"],page)
      this.setState({data:data.results,page})
    }catch(e){
      console.error(e)
      throw e
    }
  }
  async onRowClick(url){
    try{
      let film = await EntityService.getDatum(url)
      this.setState({film})
      this.scrollToBottom()
    }catch(e){
      console.error(e)
      throw e
    }

  }
}
export default FilmsComponent
