import AppNav from "./AppNav";

export default function Header() {
  return (
    <header className="flex justify-center items-center p-6 w-full">
      <div className="container flex flex-row items-center">
        <h1 className="mr-6 text-xl">ATL Flavors</h1>
        <div className="flex-grow" />
        <AppNav />
      </div>
    </header>
  );
}
