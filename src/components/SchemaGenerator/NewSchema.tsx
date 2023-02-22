type NewSchemaPropTypes = {
  addSchema: () => void;
};
export const NewSchema = ({ addSchema }: NewSchemaPropTypes) => {
  return (
    <div className="h-screen w-12 flex flex-wrap text-primary_font_color bg-Secondary_background_color">
      <button className="h-full w-full" onClick={addSchema}>
        <span className="[writing-mode:vertical-rl] text-sm uppercase font-bold font-fira_code">
          Add Schema +
        </span>
      </button>
    </div>
  );
};
