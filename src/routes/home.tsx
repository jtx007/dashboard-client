import { AuroraText } from "@/components/ui/aurora-text";
import { Testimonials } from "@/components";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
function Home() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-8xl text-center mt-36">
        Cool<AuroraText speed={4}>Dashboard</AuroraText>Bro
      </h1>
      <h6 className="text-center text-lg">
        Wanna use a cool dashboard that will make you the talk of the town? Look no further. <br />
        This dashboard is only for the coolest of the cool. Real Super Admin IAM power users, <br />{" "}
        to keep track of everything and anything
      </h6>
      <div className="flex gap-8">
        <Button className="text-lg p-6" size={"lg"}>
          <Link
            to="/signup
            "
          >
            Sign Up
          </Link>
        </Button>
        <Button className="text-lg p-6" variant={"secondary"} size={"lg"}>
          <Link
            to="/dashboard
            "
          >
            Dashboard
          </Link>
        </Button>
      </div>

      <Testimonials />
    </div>
  );
}

export default Home;
