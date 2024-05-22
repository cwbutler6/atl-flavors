import LogoutButton from "./buttons/Logout";

export default function Header() {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="container flex flex-row">
        <div>
          <h1>ATL Flavors</h1>
        </div>

        <div className="flex-grow" />

        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
