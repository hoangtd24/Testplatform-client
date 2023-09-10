type Props = {
  children: JSX.Element;
};
const NonLayout = ({ children }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url(../../../src/assets/images/background.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
};

export default NonLayout;
