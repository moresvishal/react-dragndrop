import { useState } from 'react';
import './app-form-modal.css';
const AppFormModal = ({data, droppedItems, setDroppedItems, closeModal})=>{
    const [formValues, setFormValues] = useState(JSON.parse(data));
    const [isUniqueElement, setUniqueElement] = useState(true);
    const close = ()=>{
        closeModal(true)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        let data = [];
        let isNotUnique = droppedItems.some((item)=> item.name === formValues.name);
        setUniqueElement(!isNotUnique);
        if(isNotUnique){
          return;
        }
        data.push(formValues)
        setDroppedItems([...droppedItems,...data])
        closeModal(true)
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormValues({...formValues, ...{[name]: value}});
    }
    const addOptions = (level) => {
        formValues.options.push({label: `label ${formValues.options.length+1}`, value: `option ${formValues.options.length+1}`});
        setFormValues({...formValues});
    }
    const handleOptionChange = (e,option,type)=> {
       if( type === 'value' ) {
            option.value = e.target.value;
       } else {
            option.label = e.target.value;
       }
       setFormValues({...formValues});
    }
    return(
        <>
            <div className="modal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Set Field</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                           { !isUniqueElement && 
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Name</strong> must be unique.
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                            onClick={()=> setUniqueElement(true)}></button>
                            </div>
                           } 
                           <div className="mb-3 row">
                                <label htmlFor="label" className="col-sm-4 col-form-label">Label:</label>
                                <div className="col-sm-8 col-form-label">
                                    <input type="text" className="form-control" id="label"
                                         name="label" value={formValues.label} onChange={handleChange} />
                                </div>
                           </div>
                           <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-4 col-form-label">Name:</label>
                            <div className="col-sm-8 col-form-label">
                            <input type="text" className="form-control" id="name" name="name" value={formValues.name} onChange={handleChange} />
                          </div>
                    </div>
                           { formValues.inputType === 'text' && <div className="my-3 row">
                                <label htmlFor="placeholder" className="col-sm-4 col-form-label">Placeholder:</label>
                                 <div className="col-sm-8">
                                     <input type="text" className="form-control" id="placeholder" name="placeholder" value={formValues.placeholder} onChange={handleChange} />
                                 </div>
                            </div>
                           }
                          { (formValues.inputType==='radio' || formValues.inputType==='select') && <div className="mb-3 row">
                                <div className="col-sm-6 col-form-label">
                                <label htmlFor="options" className="col-sm-4 col-form-label">Options:</label>
                             </div>
                            <div className="col-sm-6 col-form-label">
                                <button type="button" className="btn btn-success mb-2" onClick={()=>addOptions('')}>Add</button>
                            </div>
                            <div className="col-sm-12">
                                { formValues.options.map((option,i) =>
                                    <div className="row" key={i}>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control my-2" value={option.label}
                                                name={formValues.name+'label'+i} placeholder="label" onChange={(e)=>handleOptionChange(e,option,'label')}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control my-2" value={option.value}
                                                name={formValues.name+'value'+i} placeholder="value" onChange={(e)=>handleOptionChange(e,option,'value')} />
                                        </div>
                                    </div>
                                )
                                }
                        </div>
                    </div>
                } 
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppFormModal;