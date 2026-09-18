interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <>
      {/* <div className="w-[84%] max-w-360 mx-auto "> */}
      <div className="mx-auto w-[92%] sm:w-[94%] lg:w-[84%] max-w-360">
        {children}
      </div>
    </>
  );
};

export default Container;
