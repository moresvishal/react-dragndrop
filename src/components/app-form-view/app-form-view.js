import { useEffect, useState } from 'react';
import './app-form-view.css';
import AppFormModal from '../app-form-model/app-form-modal';

function AppFormView() {
    const [isModelClose, setIsModelClose] = useState(true);
    const [droppedItem, setDroppedItem] = useState('');
    const [droppedItems, setDroppedItems] = useState([]);
    const controls = [
        { name: 'text', type: 'input-text', inputType: 'text', placeholder: '', label:''},
        { name: 'textarea', type: 'input-textarea', inputType: 'textarea', label:'' },
        { name: 'checkbox', type: 'input-check', inputType: 'checkbox', value: true},
        { name: 'radio', type: 'input-radio', inputType: 'radio', options:[]  },
        { name: 'select', type: 'input-select', inputType: 'select', options:[]  }
      ];
    
      useEffect(()=>{
        console.log(JSON.stringify(droppedItems));
      },[droppedItems]);
    const drag = (e,item) => {
        e.dataTransfer.setData("item", JSON.stringify(item));
    }
    const drop = (e) => {
        e.preventDefault();
        let data = e.dataTransfer.getData("item");
        setDroppedItem(data);
        setIsModelClose(false);
    }
    const allowDrop = (e) => {
        e.preventDefault(); 
    }
    const controlsList = controls.map((item) =>
            <li key={item.name} className="list-group-item list-group-item-action list-group-item-success" draggable onDragStart={(e)=>drag(e,item)}>{item.name}</li>
    );
    const formView = <div className="card card-outline-primary mb-3" onDrop={drop} onDragOver={allowDrop}>
        <div className="card-header card-inverse card-primary">Drop the controls on the form!!!!</div>
        <div className="card-block scroll-list formview" id="formContent">
            <form>
                {
                    droppedItems.map((item)=>{
                        switch (item.inputType) {
                            case 'text':
                                return <li className="list-group-item px-2" key={item.name}>
                                <label className="form-label">{ item.label }</label>
								<input type="text" className="form-control" placeholder={item.placeholder}
									name={item.name} />
                                </li>
                            case 'textarea':
                              return <li className="list-group-item px-2" key={item.name}>
                              <div className="mb-3">
                              <label className="form-label">{item.label}</label>
                              <textarea className="form-control" id={item.name} rows="3"></textarea>
                              </div>
                              </li>
                            case 'checkbox':
                              return <li className="list-group-item px-2" key={item.name}>
                                <div className="form-check">
									<input className="form-check-input" type="checkbox" name={item.name}
										defaultChecked={item.value} id={item.name} />
									<label className="form-check-label">
										{item.label}
									</label>
								</div>
                              </li>
                            case 'radio':
                              return <li className="list-group-item px-2" key={item.name}>
                                <label  className="form-label mx-3">{ item.label } :</label>
                                { item.options.map((option,i)=>{
                                    return <div className="form-check form-check-inline" key={item.name+i}>
                                        <input className="form-check-input" type="radio" name={item.name} id={item.name+i} value={option.value} />
                                        <label className="form-check-label">
                                        {option.label}
                                        </label>
                                    </div>
                                })
                                }
                              </li>
                            case 'select':
                                return <li className="list-group-item px-2" key={item.name}>
                                    <select className="form-select my-2" name={item.name} >
									<option value="" defaultValue={true}>select {item.label}</option>
                                    { item.options.map((option,i)=>{
                                    return <option key={i} value={option.value}>{option.label}</option>
                                })
                                }  
                                  </select>
                                </li>
                            default:
                              return null
                        }
                    })
                }  
            </form>
        </div>
    </div>
    return (
     <>
        <div className="container-fluid">
            <h3>Form Builder</h3>
            <hr />
            <div className="row">
                <div className="col-3">
                    <div className="card card-outline-success mb-3">
                        <div className="card-header card-inverse card-success">
                            Controls
                        </div>
                        <div className="card-block scroll-list">
                            <div className="list-group">
                            { controlsList }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    {formView}
                </div>
            </div>
        </div>
        {!isModelClose && <AppFormModal data={droppedItem} droppedItems={droppedItems} setDroppedItems={setDroppedItems} closeModal={setIsModelClose}/>}
     </>
    );
  }
  
  export default AppFormView;
