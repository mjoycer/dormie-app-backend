import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Notes from './components/Notes';
import { useDispatch, useSelector } from 'react-redux';
import Chores from './components/Chores';
import Bills from './components/Bills';
import NewNoteForm from './components/NewNoteForm';
import { Route, Link, Switch } from 'react-router-dom';
import NewChoreForm from './components/NewChoreForm';
import NewBillForm from './components/NewBillForm';
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from 'react-bootstrap';
import './App.css';


const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.loggedInUser);
  const users = useSelector(state => state.users);
  const [show, setShow] = useState(false);

  console.log(currentUser.length);

  let currentUserName = users.find(user => user._id === currentUser.id)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <div className="App ">

      <Route exact path="/" component={LoginForm} />
      <Route exact path="/register" component={RegistrationForm} />

      <Route path="/home">
        <Navbar className="blueBg" expand="lg">
          <Container>
            {currentUser.length !== 0 && currentUserName !== undefined ?
              <Navbar.Brand> Hi, {currentUserName.name}! </Navbar.Brand> : null}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <NavDropdown title="Add New" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/home/new-note" onClick={handleShow}>Note</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/home/new-chore" onClick={handleShow}>Chore</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/home/new-bill" onClick={handleShow}>Bill</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={handleLogOut} href="/">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {currentUser.length !== 0 ?
          <>
            <div>
              <Notes />

            </div>
            <div>
              <Chores />
            </div>
            <div>
              <Bills />
            </div>
          </> :
          <p> Please log-in. <Link to="/">Login</Link> </p>
        }
      </Route>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <Switch>
              <Route path="/home/new-note">Add new note</Route>
              <Route path="/home/new-chore">Add a new chore</Route>
              <Route path="/home/new-bill"> Add a new bill</Route>
            </Switch>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Switch>
            <Route path="/home/new-note" component={NewNoteForm} />
            <Route path="/home/new-chore" component={NewChoreForm} />
            <Route path="/home/new-bill" component={NewBillForm} />
          </Switch>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default App;
