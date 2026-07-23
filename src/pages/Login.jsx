import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BiSolidHappyHeartEyes } from "react-icons/bi";
import { PiSmileyXEyesBold } from "react-icons/pi";
import { API, LOGIN_API } from "../api/api";
import { ErrorHandler } from "../utils/errorhandler";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveUser } from "../store/slices/userSlice";

export default function Login() {
  const [isPassword, setIsPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const go = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(ev) {
    try {
      ev.preventDefault();

      const data = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };

      setIsLoading(true);

      const response = await API.post(LOGIN_API, data);
      const authUser = response.data;

      const userDetailRes = await API.get(`/users/${authUser.id}`, {
        headers: { Authorization: `Bearer ${authUser.token}` },
      });
      const user = { ...authUser, role: userDetailRes.data.role };


      localStorage.setItem("user", JSON.stringify(user));
      dispatch(saveUser(user));
      toast.success("Login Success");

      if (user.role && user.role.toLowerCase().trim() === "admin") {
        go("/DashBoard");
        toast.success(`Hello Admin ${data.username}`)

      } else {
        go("/profile");
        toast.success(`Hello User ${data.username}`)
      }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2> Login </h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username"> Username </Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            placeholder="username"
            ref={usernameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password"> Password </Form.Label>
          <InputGroup>
            <Form.Control
              type={isPassword ? "password" : "text"}
              name="password"
              id="password"
              placeholder="*********"
              ref={passwordRef}
            />
            <InputGroup.Text onClick={() => setIsPassword(!isPassword)}>
              {isPassword ? <BiSolidHappyHeartEyes /> : <PiSmileyXEyesBold />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button
          type="submit"
          className="w-25"
          variant="outline-primary"
          disabled={isLoading}
        >
          {isLoading ? "is Loading..." : "Login"}
        </Button>
      </Form>
    </>
  );
}
