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
            <Card.Body>
              <Card.Title className="">
                {`${data.document.userInfo.userName} ${data.document.userInfo.lastName}`}
              </Card.Title>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="card mb-3">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span className="font-weight-bold">Name:</span><br/>
                        <p>{data.document.userInfo.userName} {data.document.userInfo.lastName}</p>
                        <span className="font-weight-bold">Address:</span><br/>
                        <p>{data.document.userInfo.stream}</p>
                        <span className="font-weight-bold">Mobile No.:</span><br/>
                        <p>{data.document.userInfo.mobileNo}</p>
                        <span className="font-weight-bold">Aaddhar No.:</span><br/>
                        <p>{data.document.userInfo.aaddharNo}</p>
                        <span className="font-weight-bold">Standard:</span><br/>
                        <p>{data.document.userInfo.standard}</p>
                        <span className="font-weight-bold">PRN No.:</span><br/>
                        <p>{data.document.userInfo.prnNo}</p>
                        <span className="font-weight-bold">GI No.:</span><br/>
                        <p>{data.document.userInfo.giNo}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="all__inbox__doc">
                    <img src={data.document.url} alt="doc pic" />
                    <h5 className="text-center">
                      Document
                    </h5>
                    <div className="approve__reject d-flex justify-content-around">
                      <button className="btn">Approve</button>
                      <button className="btn btn--blue">Reject</button>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    })
  ) : (
    null
  )

  return (
    <Accordion>
      {allDocuments} 
    </Accordion>
  )
}

export default AllInbox


