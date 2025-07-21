export default function MenuBtn() {
  return (
   <div className="w-full h-[75px] bg-white fixed bottom-0 flex items-center pb-6 pt-6 border-t border-gray-300">
        <div className="w-[80%] flex  justify-between  items-center mx-auto">
            <div className="flex flex-col items-center justify-center h-16">
            <img src="/01.svg" alt="アイコン" className="w-[20px] h-16 mb-2" />
            <span className="text-sm">MAP</span>
            </div>
            <div className="flex flex-col items-center justify-center h-16">
            <img src="/02.svg" alt="アイコン" className="w-[20px] h-16 mb-2" />
            <span className="text-sm">保存済み</span>
            </div>
            <div className="flex flex-col items-center justify-center h-16">
            <img src="/03.svg" alt="アイコン" className="w-[20px] h-16 mb-2" />
            <span className="text-sm">設定</span>
            </div>
        </div>
   </div>
  );
}


