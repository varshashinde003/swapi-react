import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SimpleTable from '../simpletable/simpletable'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu: {
    width: 200,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
class VehicleDescription extends Component{
  constructor(props){
    super(props)
    this.props = props
  }
 render(){

   return (<div>
      <Card className={this.props.classes.card}>
        <CardContent>
          <Typography  variant="headline" component="h4" color="primary">
          Vehicle Description
          </Typography>
            <Typography className={this.props.classes.pos} component="div" color="textSecondary">
              {this.props.vehicle!=null?<VehicleDetails vehicle={this.props.vehicle}/>:`Please click on a row in the data table to view`}
            </Typography>
        </CardContent>
      </Card>
    </div>)
 }
}

const VehicleDetails = props =>{
  const {vehicle} = props
  return(
    <div>
      <Paper elevation={4}>
        <Typography component="div">
          <SimpleTable
            tableData={[{"label":"Name","key":"name","isArray":false},
                        {"label":"Model","key":"model","isArray":false},
                      {"label":"Manufacturer","key":"manufacturer","isArray":false},
                    {"label":"Cost(in credits)","key":"cost_in_credits","isArray":false},
                  {"label":"Length","key":"length","isArray":false},
                {"label":"Atmosphering Speed(max.)","key":"max_atmosphering_speed","isArray":false},
              {"label":"Crew","key":"crew","isArray":false},
            {"label":"Passengers","key":"passengers","isArray":false},
          {"label":"Cargo Capacity","key":"cargo_capacity","isArray":false},
          {"label":"Consumables","key":"consumables","isArray":false},
          {"label":"Vehicle Class","key":"vehicle_class","isArray":false},
          {"label":"Pilots","key":"pilots","isArray":true},
          {"label":"Films","key":"films","isArray":true},
          {"label":"Created on","key":"created","isArray":false},
          {"label":"Edited on","key":"edited","isArray":false},
          {"label":"Url","key":"url","isArray":false}
        ]}
            data={vehicle}/>
        </Typography>
      </Paper>
    </div>
  )
}
VehicleDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(VehicleDescription);
