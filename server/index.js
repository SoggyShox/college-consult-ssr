import path from "path";
import fs from "fs";
import bodyParser from "body-parser";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";
import sgMail from '@sendgrid/mail';


const PORT = 3000;
const app = express();


sgMail.setApiKey("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")

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve("./build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  
  sendInviteEmail(req.body)

  res.send()
});


async function sendInviteEmail(requestbody) {
  const email = {
    to: requestbody.requester_email,
    from: "college.student.connect@gmail.com",
    templateId: "d-42d0083f34844b98a9f88feada617fdc",
    dynamicTemplateData: { 
      requester_firstname: requestbody.requester_firstname,
      consultant_firstname: requestbody.consultant_firstname,
      requester_subject: requestbody.requester_subject,
      school_name: requestbody.school_name,
    }
  };
  try{
  sgMail.send(email);
  }
  catch(error){
    console.log(error)
    console.log(error.message)
  }
}

app.use(express.static("./build"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); 
