import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [profielPic, setProfilePic] = useState<File | null>(null);
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!fullname) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");
  };

  return (
    <>
      <AuthLayout>
        <div className="lg:w-[80%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">
            Create an Account
          </h3>
          <p className="text-xs text-slate-600 mt-[5px] mb-6">
            Join with us today by entering yoour details
          </p>

          <form onSubmit={handleSubmit}>
            <ProfilePhotoSelector image={profielPic} setImage={setProfilePic} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full name"
                label="Fullname"
                value={fullname}
                onChange={({ target }) => setEmail(target.value)}
              />
              <Input
                type="email"
                placeholder="johndoe@gmail.com"
                label="Email Address"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <Input
              type="password"
              placeholder="Min 8 charactors"
              label="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && <p className="text-red-600 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              SIGNUP
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Already have an account?{" "}
              <Link
                className="font-medium text-violet-500 underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default SignUp;
