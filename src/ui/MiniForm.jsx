function MiniForm({ children, title }) {
  return (
    <div className="m-2 w-full flex justify-between">
      <label className="font-semibold text-md">{title}</label>
      {children}
    </div>
  );
}

export default MiniForm;
