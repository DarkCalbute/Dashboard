import React from 'react';

function Field ({name, value, onChange, children}) {
	return (
		<div className='mb-3 mx-3'>
			<label htmlFor={name} className="form-label">{children}</label>
			<input className="form-control" type="text" value={value} onChange={onChange} id={name} name={name}/>
		</div>
	);
}

export default Field;