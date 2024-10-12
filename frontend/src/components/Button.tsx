interface buttonProps {
  children: React.ReactNode;
  handleClick: (e: any) => void;
}

const Button: React.FC<buttonProps> = ({children, handleClick}) => {
  const buttonClassName = `px-5 py-2.5 mt-10 text-sm font-medium text-[#171717] bg-[#f4f4f4] hover:bg-gray-300 focus:ring-4 focus:outline-none rounded-lg text-center`
    return (
<button type="button" className={buttonClassName} onClick={handleClick}>
  {children}
  </button>
  );
};

export {Button, type buttonProps};
