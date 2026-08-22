import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div>
      <div>
        <h1>LogIn</h1>
        <form className="form-widget">
          <div>
            <label>Email</label>
            <input name="email" type="email" required />
          </div>

          <div>
            <label>Password</label>
            <input name="password" type="password" required />
          </div>

          <div>
            <button formAction={login} className="button block">
              Login
            </button>
          </div>
        </form>

        <hr />

        <form className="form-widget">
          <h2>หรือสมัครสมาชิกใหม่</h2>

          <div>
            <label>Email</label>
            <input name="email" type="email" required />
          </div>

          <div>
            <label>Password</label>
            <input name="password" type="password" required />
          </div>

          <div>
            <button formAction={signup} className="button primary block">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
