const FeedbackHeader = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-[#0FD3FA] text-[14px] tracking-widest font-semibold">
          YOUR VOICE
        </span>

        <h2 className="text-center text-4xl font-bold sm:text-5xl lg:text-5xl">
          Share Your{" "}
          <span className="bg-linear-to-r from-violet-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Feedback
          </span>
        </h2>

        <p className="text-center text-base text-[#AAA3C2] sm:text-lg">
          Your honest review helps me grow and helps others know what to
          <br />
          expect when working with me.
        </p>
      </div>
    </>
  );
};

export default FeedbackHeader;
