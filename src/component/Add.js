//3.code for Uploading File  A logged in user should be able to upload a file. For every uploaded file, there should be a unique 6 digit code generated.
//4. An uploaded file should be saved on the file system for future reterival.

import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default class Add extends React.Component {
  async onChangeImage(e) {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      let img = e.target.files[0];
      let fileImage = await this.convertToFile(
        URL.createObjectURL(img),
        "png",
        e.target.files[0].name
      );
      const formData = new FormData();
      formData.append("file", fileImage);
      console.log(fileImage);
      axios
        .post(process.env.REACT_APP_BASE_URL + "/uploadimage", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          this.setState({ p_image: res.data });
        })
        .catch((err) => {});
    }
  }

  render() {
    return (
      <div className="container col-sm-5">
        <form>
          <div className="mb-3 ">
            <label htmlFor="iname" clasiname="form-label">
              Name
            </label>
            <input
              type="text"
              clasiname="form-control"
              id="iname"
              aria-describedby="iname"
              onChange={(e) => {
                e.preventDefault();
              }}
            />
          </div>

          <Form.Group controlId="formFile" clasiname="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control type="file" onChange={this.onChangeImage} />
          </Form.Group>
          <button type="button" clasiname="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
