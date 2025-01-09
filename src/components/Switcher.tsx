interface Props {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const Switcher = ({ isDark, setIsDark }: Props) => {
  return (
    <div
      className={` rounded-full p-0.5 w-[50px] ml-auto cursor-pointer flex items-center`}
      style={{
        backgroundColor: !isDark ? "#FFFFFF" : "#000000",
      }}
      onClick={() => setIsDark(!isDark)} // Toggle isDark on click
    >
      <div
        className={`w-5 h-5 rounded-full  transform transition-transform`}
        style={{
          transform: isDark ? "translateX(130%)" : "translateX(0)",
          backgroundColor: isDark ? "#FFFFFF" : "#000000",
        }}
      ></div>
    </div>
  );
};

export default Switcher;
