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
class PersonDescription extends Component{
  constructor(props){
    super(props)
    this.props = props
    this.state={

    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
 render(){

   return (<div>
      <Card className={this.props.classes.card}>
        <CardContent>
          <Typography  variant="headline" component="h4" color="primary">
          Person Description
          </Typography>
            <Typography className={this.props.classes.pos} component="div" color="textSecondary">
              {this.props.person!=null?<PersonDetails person={this.props.person}/>:`Please click on a row in the data table to view`}
            </Typography>
        </CardContent>
      </Card>
    </div>)
 }
}

const PersonDetails = props =>{
  const {person} = props
  return(
    <div>
      <Paper elevation={4}>
        <Typography component="div">
          <SimpleTable
            tableData={[{"label":"Name","key":"name","isArray":false},
                        {"label":"Height","key":"height","isArray":false},
                      {"label":"Mass","key":"mass","isArray":false},
                    {"label":"Hair color","key":"hair_color","isArray":false},
                  {"label":"Skin color","key":"skin_color","isArray":false},
                {"label":"Eye color","key":"eye_color","isArray":false},
              {"label":"Birth year","key":"birth_year","isArray":false},
            {"label":"Gender","key":"gender","isArray":false},
          {"label":"Homeworld","key":"homeworld","isArray":false},
          {"label":"Films","key":"films","isArray":true},
          {"label":"Species","key":"species","isArray":true},
          {"label":"Vehicles","key":"vehicles","isArray":true},
          {"label":"Starships","key":"starships","isArray":true},
          {"label":"Created on","key":"created","isArray":false},
          {"label":"Edited on","key":"edited","isArray":false},
          {"label":"Url","key":"url","isArray":false}
        ]}
            data={person}/>
        </Typography>
      </Paper>
    </div>
  )
}
PersonDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PersonDescription);
