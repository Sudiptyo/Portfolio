interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className="w-[84%] max-w-360 mx-auto ">{children}</div>;
};

export default Container;
