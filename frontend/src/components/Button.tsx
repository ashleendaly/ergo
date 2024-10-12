interface buttonProps {
  children: React.ReactNode;
  handleClick: () => void;
}

const Button: React.FC<buttonProps> = ({children, handleClick}) => {
  const buttonClassName = `px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
    return (
<button type="button" className={buttonClassName} onClick={handleClick}>
  {children}
  </button>
  );
};

export {Button, type buttonProps};
