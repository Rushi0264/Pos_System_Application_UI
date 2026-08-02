import { useDispatch, useSelector } from "react-redux";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { toggleTheme } from "../../redux/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
    </button>
  );
};

export default ThemeToggle;