import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  media: {
    height: 140,
  }
}));

export default function ImgMediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt={props.item.name}
          height="140"
          src={`data:image/jpeg;base64,${props.item.image}`}
          title={props.item.name}
        />
        <CardContent >
            <List disablePadding className={classes.cardPricing}>
                <ListItem xs={12} sm={6} md={6}>
                    <ListItemText primary={props.item.name} />
                    <Typography variant="subtitle1" className={classes.total}>
                    {props.item.price}
                    </Typography>
                </ListItem>
            </List>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.item.details}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="green">
          Buy Now
        </Button>
        <Button size="small" color="warning">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

