import './Checkbox.css';

function Checkbox({ idCheckbox, checkboxChecked, handleCheckboxClick }) {

  return (
    <button className={"checkbox" + (checkboxChecked.includes(idCheckbox) ? " checked" : "")}
    onClick={() => handleCheckboxClick(idCheckbox)}>
      <i className={"icon-" + (checkboxChecked.includes(idCheckbox) ? "check" : "cross_mark")}></i>
    </button>
  );
}

export default Checkbox;