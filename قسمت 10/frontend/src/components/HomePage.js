import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room"
import { Grid, Button, Typography, ButtonGroup} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";


export default class HomePage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            roomCode: null,
        }

        this.clearRoomCode = this.clearRoomCode.bind(this);
        
    }

async componentDidMount() {
    fetch("/api/user/in/room").then((response) => response.json()).then((data) => {
        this.setState({
            roomCode: data.code,
        });
    
    
    })
}


clearRoomCode() {
    this.setState({
        roomCode: null,
    });

}


renderHomePage() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    صفحه اصلی
                </Typography>
        </Grid>

        <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>
                        ورود به اتاق
                    </Button>
                    <Button color="secondary" to="/create-room" component={Link}>
                        ایجاد یک اتاق
                    </Button>
                </ButtonGroup>
        </Grid>
        </Grid>
        )
}

    render() {
        
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => {
                        return this.state.roomCode ? (
                            <Redirect to={`/room/${this.state.roomCode}`} />
                        ) : (this.renderHomePage());
                    }} />
                        
                    
                    <Route path="/join" component={ RoomJoinPage  } />
                    <Route path="/create-room" component={ CreateRoomPage  } />
                    <Route path="/room/:roomCode" render={(props) => {
                        return <Room {...props } leaveRoomCallback={this.clearRoomCode} />;
                    }} />
                    
                </Switch>
            </Router>
        )
    }
}