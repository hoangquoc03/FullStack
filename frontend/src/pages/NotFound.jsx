export default function Notfound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
        <img
          src="404_NotFound.png"
          alt="Not Found"
          className="max-w-full mb-6 w-96"
        />
        <p className="text-xl font-semibold">Bạn đang đi vao vùng cấm địa</p>
        <a
          href="/"
          className="inline-block px-6 py-3 mt-6 front-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
        >
          Quay về trang chủ
        </a>
      </div>
    </>
  );
}
