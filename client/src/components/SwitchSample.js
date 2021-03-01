import React, { useEffect, useState } from 'react'
import Switch from "react-switch";
import '../components/styles/Switch.css'

const SwitchSample = (props) => {

  const [checked, setChecked] = useState(true)

  useEffect(() => {
    setChecked(props.value)
    console.log('se checkea ' + props.value)
  }, [])

  const handleChange = (check) => {
    setChecked(check)
    setTimeout(props.onChange, 150)
  }

  return (
    <label>
      <div className="switch-container">
        <span className="switch-label">{checked ? 'Auto' : 'Manual'}</span>
        <Switch 
          onChange={handleChange} 
          checked={checked}             
          onColor="#bf92e6"
          onHandleColor="#7E22CD"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />
      </div>
    </label>
  );

}

export default SwitchSample
