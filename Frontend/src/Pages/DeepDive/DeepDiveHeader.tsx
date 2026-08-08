const DeepDiveHeader = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-[#0FD3FA] text-md tracking-widest font-semibold">
          DEEP DIVE{" "}
        </span>

        <h2 className="text-[48px] font-bold mt-3">
          Featured{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Case Study
          </span>
        </h2>
      </div>
    </>
  );
};

export default DeepDiveHeader;
