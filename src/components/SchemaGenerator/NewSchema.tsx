type NewSchemaPropTypes = {
  addSchema: () => void;
};
export const NewSchema = ({ addSchema }: NewSchemaPropTypes) => {
  return (
    <div className="h-screen w-12 flex flex-wrap text-primary_font_color bg-Secondary_background_color hover:bg-[#282230] hover:text-white transition-all">
      <button className="h-full w-full" onClick={addSchema}>
        <span className="[writing-mode:vertical-rl] text-sm uppercase font-[600] font-fira_code">
          Add Schema +
        </span>
      </button>
    </div>
  );
};
