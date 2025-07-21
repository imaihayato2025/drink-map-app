

export default function SearchMenu() {
  return (
    <div>
       <div className="fixed top-[50px] left-1/2 transform -translate-x-1/2 w-[90%]">
<form className="w-full">
  <div className="relative">
    {/* アイコン（例：検索） */}
    <img
      src="/search.svg"
      alt="検索"
      className="absolute z-1 left-4 top-1/2 transform -translate-y-1/2 w-5 h- text-gray-400 bg-white"
    />

    {/* 入力欄 */}
    <input
      type="text"
      placeholder="ここで検索"
      className="bg-white pl-10 pr-6 py-3 border border-blue-500 w-full rounded-full drop-shadow-sm"
    />
  </div>
</form>
</div>
</div>
  );
}

