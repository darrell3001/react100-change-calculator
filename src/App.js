import React, { Component } from "react";

import Holder from "react-holder";

import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardGroup from "react-bootstrap/CardGroup";

import InputGroup from "react-bootstrap/InputGroup";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountDue: "",
      amountReceived: "",

      alert: false,

      changeDue: "",
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0
    };
  }

  onChangeAmountDue(e) {
    console.log("onChangeAmountDue()");

    this.setState({
      amountDue: e.target.value
    });

    if (e.target.value == "") {
      this.setState({
        changeDue: "",
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0
      });
    }
  }

  onChangeAmountReceived(e) {
    console.log("onChangeAmountReceived()");

    this.setState({
      amountReceived: e.target.value
    });

    if (e.target.value == "") {
      this.setState({
        changeDue: "",
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0
      });
    }
  }

  onClickRunButton(e) {
    console.log("onClickRunButton()");

    // convert to cents. we dont like dealing with float
    var amountDue = Number(this.state.amountDue);
    var amountDueInCents = Math.floor(amountDue * 100);

    var amountReceived = Number(this.state.amountReceived);
    var amountGivenInCents = Math.floor(Number(amountReceived) * 100);

    var changeDueInCents = amountGivenInCents - amountDueInCents;
    var changeDue = (changeDueInCents / 100).toFixed(2);

    var twentiesDue = Math.floor(changeDueInCents / 2000);
    changeDueInCents -= twentiesDue * 2000;

    var tensDue = Math.floor(changeDueInCents / 1000);
    changeDueInCents -= tensDue * 1000;

    var fivesDue = Math.floor(changeDueInCents / 500);
    changeDueInCents -= fivesDue * 500;

    var onesDue = Math.floor(changeDueInCents / 100);
    changeDueInCents -= onesDue * 100;

    var quartersDue = Math.floor(changeDueInCents / 25);
    changeDueInCents -= quartersDue * 25;

    var dimesDue = Math.floor(changeDueInCents / 10);
    changeDueInCents -= dimesDue * 10;

    var nicklesDue = Math.floor(changeDueInCents / 5);
    changeDueInCents -= nicklesDue * 5;

    var penniesDue = changeDueInCents;

    this.setState({
      changeDue: changeDue,
      twenties: twentiesDue,
      tens: tensDue,
      fives: fivesDue,
      ones: onesDue,
      quarters: quartersDue,
      dimes: dimesDue,
      nickels: nicklesDue,
      pennies: penniesDue
    });
  }

  render() {
    return (
      <>
        <Container className="container-fluid">
          <h3 className="text-white border-bottom">Change Calculator</h3>
          <Row>
            <Col className="col-sm-4">
              <Card>
                <Card.Header>
                  <h3 className="text-center">Enter Information</h3>
                </Card.Header>

                <Card.Body className="text-left">
                  <label className="font-weight-bold">How much is due?</label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="amountDue"
                      type="number"
                      value={this.state.amountDue}
                      onChange={e => this.onChangeAmountDue(e)}
                    />
                  </InputGroup>

                  <label className="font-weight-bold">
                    How much was received?
                  </label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="amountReceived"
                      type="number"
                      value={this.state.amountReceived}
                      onChange={e => this.onChangeAmountReceived(e)}
                    />
                  </InputGroup>
                </Card.Body>

                <Card.Footer>
                  <Button
                    disabled={
                      Number(this.state.amountReceived) >=
                      Number(this.state.amountDue)
                        ? false
                        : true
                    }
                    name="runButton"
                    variant="primary"
                    onClick={e => this.onClickRunButton(e)}
                  >
                    Run
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col className="col-sm-8">
              <Card>
                <Card.Header>
                  <h3
                    className="text-center"
                    id="output"
                    name="alert alert-success"
                  >
                    {this.state.changeDue != ""
                      ? "The total change due is $" + this.state.changeDue
                      : ""}
                  </h3>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col className="text-center col-sm-3 mx-auto rounded-sm">
                      <Card>
                        <Card.Body>
                          <Card.Text className="font-weight-bold">
                            Twenties:
                          </Card.Text>
                          <Card.Text className="change">
                            {this.state.twenties}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col className="text-center col-sm-3 mx-auto rounded-sm">
                      <Card>
                        <Card.Body>
                          <Card.Text className="font-weight-bold">
                            Tens
                          </Card.Text>
                          <Card.Text className="change">
                            {this.state.tens}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col className="text-center col-sm-3 mx-auto rounded-sm">
                      <Card>
                        <Card.Body>
                          <Card.Text className="font-weight-bold">
                            Fives
                          </Card.Text>
                          <Card.Text className="change">
                            {this.state.fives}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col className="text-center col-sm-3 mx-auto rounded-sm">
                      <Card>
                        <Card.Body>
                          <Card.Text className="font-weight-bold">
                            Ones
                          </Card.Text>
                          <Card.Text className="change">
                            {this.state.ones}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <br />

                  <Row>
                    <Col className="text-center col-sm-3 mx-auto rounded-sm">
                      <Card>
                        <Card.Body>
                          <Card.Text className="font-weight-bold">
                            Quarters
                          </Card.Text>
                          <Card.Text className="change">
                            {this.state.quarters}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col className="text-center col-sm-3 mx-auto rounded-sm">
                      <Card>
                        <Card.Body>
                          <Card.Text className="font-weight-bold">
                            Dimes
                          </Card.Text>
                          <Card.Text className="change">
                            {this.state.dimes}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col className="text-center col-sm-3 mx-auto rounded-sm">
                      <Card>
                        <Card.Body>
                          <Card.Text className="font-weight-bold">
                            Nickles
                          </Card.Text>
                          <Card.Text className="change">
                            {this.state.nickels}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col className="text-center col-sm-3 mx-auto rounded-sm">
                      <Card>
                        <Card.Body>
                          <Card.Text className="font-weight-bold">
                            Pennies
                          </Card.Text>
                          <Card.Text className="change">
                            {this.state.pennies}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Card.Footer></Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
