import FormSinhVien from "./components/FormSinhVien";

function App() {
  return (
    <>
      <header className="bg-black uppercase text-center font-bold py-5 text-3xl text-white">
        Thông tin sinh viên
      </header>
      <div className="my-5">
        <FormSinhVien />
      </div>
      <footer className=" bg-black text-center text-2xl font-medium py-14 text-red-600">
        &copy; devtoanphan2211@gmail.com
      </footer>
    </>
  );
}

export default App;
