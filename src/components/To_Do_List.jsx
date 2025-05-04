import React, { useEffect, useState } from 'react';
import to_do_img from '../to_do_img.jfif';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  ListGroup,
  Badge
} from 'react-bootstrap';

const To_Do_List = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('Work');
  const [status, setStatus] = useState('Pending');

  const categories = ['Work', 'Health', 'Home'];
  const statuses = ['Pending', 'In-Progress', 'Completed'];

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAdd = () => {
    if (taskName.trim()) {
      setTasks((prev) => [
        ...prev,
        { name: taskName, category, status, id: Date.now() }
      ]);
      setTaskName('');
    }
  };

  const handleDelete = (id) => {
    setTasks((tasks) => tasks.filter((prev) => prev.id !== id));
  };

  const handleStatusChange = (id, value) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: value } : task))
    );
  };

  const handleVariant = (status) => {
    switch (status) {
      case 'Pending':
        return 'danger';
      case 'In-Progress':
        return 'warning';
      case 'Completed':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${to_do_img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '20px'
      }}
    >
      <Container className="mt-4 bg-secondary bg-opacity-75 rounded p-4">
        <h2 className="text-center mb-4">📝 My Responsive To-Do List</h2>

        <Row className="g-2 justify-content-center">
          <Col xs={12} md={5}>
            <Form.Control
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter the task name..."
              className="text-center"
            />
          </Col>
          <Col xs={6} md={3}>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={3}>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statuses.map((stat) => (
                <option key={stat}>{stat}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={1}>
            <Button
              style={{
                backgroundColor: 'orangered',
                color: 'white',
                border: '1px solid orangered'
              }}
              onClick={handleAdd}
              className="w-100"
            >
              Add
            </Button>
          </Col>
        </Row>

        <Row className="mt-4">
          {categories.map((cat) => {
            const catTasks = tasks.filter((task) => task.category === cat);
            return (
              <Col key={cat} xs={12} md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Header className="text-center">
                    🗂️ Category: {cat}
                  </Card.Header>
                  <ListGroup variant="flush">
                    {catTasks.length === 0 ? (
                      <ListGroup.Item className="text-center text-muted">
                        No tasks in this category.
                      </ListGroup.Item>
                    ) : (
                      catTasks.map((tas) => (
                        <ListGroup.Item
                          key={tas.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          🔹 {tas.name}
                          <div className="d-flex align-items-center gap-2">
                            <Badge bg={handleVariant(tas.status)}>
                              {tas.status}
                            </Badge>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(
                                  tas.id,
                                  tas.status === 'Pending'
                                    ? 'In-Progress'
                                    : tas.status === 'In-Progress'
                                    ? 'Completed'
                                    : 'Pending'
                                )
                              }
                            >
                              Change
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(tas.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))
                    )}
                  </ListGroup>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default To_Do_List;
