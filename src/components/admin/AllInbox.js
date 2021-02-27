import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

function AllInbox({ documents }) {

  let allDocuments = documents.length ? (
    documents.map(data => {
      return (
        <Card key={data.id}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span className="font-weight-bold">{`Message from ${data.document.userInfo.userName} ${data.document.userInfo.lastName}`}</span>
            <Accordion.Toggle as={Button} variant="link" eventKey={data.id}>
              View Message
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={data.id}>
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    })
  ) : (
    <div className="initial__loader text-center my-2">
      <div className="spinner-border spinner-border-sm" style={{width: '3rem', height: '3rem',}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  return (
    <Accordion>
      {allDocuments}    
    </Accordion>
  )
}

export default AllInbox


