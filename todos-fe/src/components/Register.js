import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Register = () => {
  const [member, setMember] = useState({
    email: "junnywei15@gmail.com",
    name: "Eddie",
    password: "123123",
    confirmPassword: "123123",
    photo: null,
  });
  return (
    <div className="column is-three-fifths">
      <form className="box">
        <div className="field">
          <label className="label">帳號</label>
          <div className="control">
            <input
              name="email"
              className="input"
              type="email"
              value={member.email}
              onChange={(e) => {
                let newMember = { ...member };
                newMember.email = e.target.value;
                setMember(newMember);
              }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input
              name="password"
              className="input"
              type="password"
              value={member.password}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">確認密碼</label>
          <div className="control">
            <input
              name="confirmPassword"
              className="input"
              type="password"
              value={member.confirmPassword}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">暱稱</label>
          <div className="control">
            <input
              name="name"
              className="input"
              type="text"
              value={member.name}
            />
          </div>
        </div>
        <div className="file is-primary is-boxed has-name mb-3">
          <label className="file-label">
            <input name="photo" className="file-input" type="file" />
            <span className="file-cta">
              <FontAwesomeIcon icon={faUpload} />
              <span className="file-label">選擇檔案</span>
            </span>
            <span className="file-name">TODO: 檔名</span>
          </label>
          <figure className="image is-128x128 ml-5">
            <img src="#" />
          </figure>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">註冊</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
