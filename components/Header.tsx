import LogoutButton from "./buttons/Logout";
import AppNav from "./AppNav";

export default function Header() {
  return (
    <div className="flex justify-center items-center p-6 w-full">
      <div className="container flex flex-row items-center">
        <h1 className="mr-6">ATL Flavors</h1>

        <AppNav />

        <div className="flex-grow" />

        <LogoutButton />
      </div>
    </div>
  );
}
