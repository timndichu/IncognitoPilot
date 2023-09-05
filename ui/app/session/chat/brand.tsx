export default function Brand() {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-center items-center gap-2">
        <div className="w-32">
          <img src="/afrineuron-logo.png" alt="Brand" />
        </div>
        <div className="text-2xl text-black font-bold mt-4 dark:text-white">Afrineuron ChatBot</div>
      </div>
    </div>
  );
}
