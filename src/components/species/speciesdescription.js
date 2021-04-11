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
class SpeciesDescription extends Component{
  constructor(props){
    super(props)
    this.props = props
  }
 render(){
   return (<div>
      <Card className={this.props.classes.card}>
        <CardContent>
          <Typography  variant="headline" component="h4" color="primary">
          Species Description
          </Typography>
            <Typography className={this.props.classes.pos} component="div" color="textSecondary">
              {this.props.species!=null?<SpeciesDetails species={this.props.species}/>:`Please click on a row in the data table to view`}
            </Typography>
        </CardContent>
      </Card>
    </div>)
 }
}

const SpeciesDetails = props =>{
  const {species} = props
  return(
    <div>
      <Paper elevation={4}>
        <Typography component="div">
          <SimpleTable
            tableData={[{"label":"Name","key":"name","isArray":false},
                        {"label":"Classification","key":"classification","isArray":false},
                      {"label":"Designation","key":"designation","isArray":false},
                    {"label":"Average Height","key":"average_height","isArray":false},
                  {"label":"Skin Colors","key":"skin_colors","isArray":false},
                {"label":"Hair Colors","key":"hair_colors","isArray":false},
              {"label":"Eye Colors","key":"eye_colors","isArray":false},
            {"label":"Average Lifespan","key":"average_lifespan","isArray":false},
          {"label":"Homeworld","key":"homeworld","isArray":false},
          {"label":"Language","key":"language","isArray":false},
          {"label":"People","key":"people","isArray":true},
          {"label":"Films","key":"films","isArray":true},
          {"label":"Created on","key":"created","isArray":false},
          {"label":"Edited on","key":"edited","isArray":false},
          {"label":"Url","key":"url","isArray":false}
        ]}
            data={species}/>
        </Typography>
      </Paper>
    </div>
  )
}
SpeciesDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SpeciesDescription);
