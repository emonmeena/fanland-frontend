import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export default function CreateFanClub() {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubImageURL, setClubImageURL] = useState("");
  return (
    <div>
      <div className="container py-5">
        <Form>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Example file input"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="mb-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox" className="mb-3">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-2">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
