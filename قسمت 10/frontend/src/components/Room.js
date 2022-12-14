import React, { Component } from "react";
import {Button, Typography, Grid} from "@material-ui/core";

export default class Room extends Component {
  constructor(props) {
    super(props);
    

   
    this.state = {
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    };

    this.roomCode = this.props.match.params.roomCode
    this.getRoomDetails();
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    
    
  }

  getRoomDetails() {
    return fetch("/api/get/room/" + "?code=" + this.roomCode).then((response) => {
      if (!response.ok) {
        this.props.leaveRoomCallback();
        this.props.history.push("/");
      }
      return response.json();
    }).then((data) => {
      this.setState({
        votesToSkip: data.votes_to_skip,
        guestCanPause: data.guest_can_pause,
        isHost: data.is_host,
      });
    

    })
    
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

    };

    fetch("/api/leave/room/", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    })
  }

  render() {
    
    return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4" >
              Code: {this.roomCode}
            </Typography>
            </Grid>

            <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6" >
              رای ها: {this.state.votesToSkip}
            </Typography>
            </Grid>


            <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6" >
              اجازه پخش/توقف اهنگ: {this.state.guestCanPause.toString()}
            </Typography>
            </Grid>

            <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6" >
              میزبان: {this.state.isHost.toString()}
            </Typography>
            </Grid>

            <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>خروج از اتاق</Button>
            </Grid>

        </Grid>
      )
  }
}