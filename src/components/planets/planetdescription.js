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
class PlanetDescription extends Component{
  constructor(props){
    super(props)
    this.props = props
  }
 render(){

   return (<div>
      <Card className={this.props.classes.card}>
        <CardContent>
          <Typography  variant="headline" component="h4" color="primary">
          Planet Description
          </Typography>
            <Typography className={this.props.classes.pos} component="div" color="textSecondary">
              {this.props.planet!=null?<PlanetDetails planet={this.props.planet}/>:`Please click on a row in the data table to view`}
            </Typography>
        </CardContent>
      </Card>
    </div>)
 }
}

const PlanetDetails = props =>{
  const {planet} = props
  return(
    <div>
      <Paper elevation={4}>
        <Typography component="div">
          <SimpleTable
            tableData={[{"label":"Name","key":"name","isArray":false},
                        {"label":"Rotation Period","key":"rotation_period","isArray":false},
                      {"label":"Orbital Period","key":"orbital_period","isArray":false},
                    {"label":"Diameter","key":"diameter","isArray":false},
                  {"label":"Climate","key":"climate","isArray":false},
                {"label":"Gravity","key":"gravity","isArray":false},
              {"label":"Terrain","key":"terrain","isArray":false},
            {"label":"Surface Water","key":"surface_water","isArray":false},
          {"label":"Population","key":"population","isArray":false},
          {"label":"Residents","key":"residents","isArray":true},
          {"label":"Films","key":"films","isArray":true},
          {"label":"Created on","key":"created","isArray":false},
          {"label":"Edited on","key":"edited","isArray":false},
          {"label":"Url","key":"url","isArray":false}
        ]}
            data={planet}/>
        </Typography>
      </Paper>
    </div>
  )
}
PlanetDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PlanetDescription);
