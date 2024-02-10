// Single selection Accordion
// Multi selection Accordion

import { useState } from 'react';
import data from './data';
import './styles.css';
export default function Accordion() {
  // holds the state for the current selected accordion item id
  const [selected, setSelected] = useState(null);
  const [isSingleSelect, setIsSingleSelect] = useState(true);
  const [multipleSelectedIds, setMultipleSelectedIds] = useState([]);

  // if single selection active will change the selected state to be the clicked item id
  function handleSingleSelection(id) {
    setSelected(id === selected ? null : id);
  }
  function handleMultipleSelection(id) {
    setMultipleSelectedIds((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((item) => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  }
  function toggleSelectType() {
    setIsSingleSelect((prevState) => !prevState);
    isSingleSelect === true ? setSelected(null) : setMultipleSelectedIds([]);
  }

  return (
    <div className="wrapper">
      <button onClick={toggleSelectType}>Change Select Type</button>
      {isSingleSelect ? <p>Single Select</p> : <p>Multi Select</p>}
      <div className="accordion">
        {/* map through the dataset and output the structure with data */}
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="accordion-item">
              <div
                className="accordion-title"
                onClick={() =>
                  isSingleSelect
                    ? handleSingleSelection(item.id)
                    : handleMultipleSelection(item.id)
                }
              >
                <h2>{item.question}</h2>
                {/* shows + or - if the selected state is equal to items id */}
                <span>{selected === item.id ? '-' : '+'}</span>
              </div>
              <div
                className={`accordion-content ${
                  selected === item.id ? 'open' : 'closed'
                }`}
              >
                {/* only displays the items answer is the selected state is equal to the item id */}
                {isSingleSelect
                  ? selected === item.id && <p>{item.answer}</p>
                  : multipleSelectedIds.includes(item.id) && (
                      <p>{item.answer}</p>
                    )}
              </div>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
}
