import React,{Component} from 'react'
export default class SimpleTable extends Component{
  constructor(props){
    super(props)
    this.props = props
  }
  render(){
    const {tableData,data} = this.props
    return(
        <div className="div-table">
          { tableData.map((tableDatum,index)=>
              {
                  return(
                        <div className="div-table-row" key={index}>
                       <div className="div-table-col-bold">{tableDatum.label}</div>
                       <div className="div-table-col">
                    {tableDatum.isArray ? data[tableDatum.key].map((datum,innerIndex)=><div key={`${innerIndex}-1`}>{datum.label}</div>):<div>{data[tableDatum.key]}</div>}
                       </div>
                     </div>
               )
            }
           )
         }
       </div>
       )
       }
}
