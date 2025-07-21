

export default function SearchMenu() {
  return (
    <div>
       <div className="fixed top-[50px] left-1/2 transform -translate-x-1/2 w-[90%] ">
<form className="w-full max-w-md ">
  <div className="relative">
    {/* アイコン（例：検索） */}
    <img
      src="/search.svg"
      alt="検索"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h- text-gray-400"
    />

    {/* 入力欄 */}
    <input
      type="text"
      placeholder="ここで検索"
      className="pl-10 pr-4 py-3 border border-blue-500 w-full rounded-full"
    />
  </div>
</form>
</div>
</div>
  );
}

