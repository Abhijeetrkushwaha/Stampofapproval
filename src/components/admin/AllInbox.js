import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

function AllInbox({ documents, sendEmail, deleteMessage }) {
  // const [admin, setAdmin] = useState('Stamp Of Approval')
  // const [email, setEmail] = useState('')

  let allDocuments = documents?.length ? (
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
                        <span className="font-weight-bold">Address: </span><br/>
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
                      <form onSubmit={sendEmail}>
                        <div className="input-group d-none">
                          <input  name="admin" value="Abhijeet Kushwaha" readOnly={true} type="text" />
                        </div>
                        <div className="input-group d-none">
                          <input  name="from_name" value="Stamp Of Approval" readOnly={true} type="text" />
                        </div>
                        <div className="input-group d-none">
                          <input  name="to_name" value={data.document.userInfo.userName} readOnly={true} type="text" />
                        </div>
                        <div className="input-group d-none">
                          <input  name="reply_to" value={data.document.userInfo.email} readOnly={true} type="email" />
                        </div>
                        <div className="input-group">
                          <span className="ml-3">Enter Approve or Reject Message:</span>
                          <input name="message" type="text" placeholder="Approve or Reject" />
                        </div>
                        <button className="btn">Send Email</button>
                      </form>
                    </div>
                    <button className="btn btn--lg mt-3" onClick={() => deleteMessage(data.id)}>Delete Message</button>
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
      <div className="text-center">
        {documents?.length === 0 ? "Inbox is empty" : null }
      </div>
    </Accordion>
  )
}

export default AllInbox


