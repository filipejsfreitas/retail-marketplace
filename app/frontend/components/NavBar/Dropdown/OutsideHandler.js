import React, { useRef, useEffect } from "react";

// Component that enables the Dropdown component to close when
// the user clicks outside the bondaries of the Dropdown
// It requires a state prop linked to the visible state of
// the dropdown (visible or hidden) and a buttonRef referencing
// the button that makes the dropdown visible
// The buttonRef is needed because there is a race between the click
// event on the button itself and the handler function that detects
// a click outside the Dropdown component
function OutsideHandler(props) {
    const [open,setOpen] = props.state
    const wrapperRef = useRef(null);
    const buttonRef = props.buttonRef

    useEffect(() => {
      function handleClickOutside(event) {
        if (!buttonRef.current.contains(event.target) && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef,open,setOpen,buttonRef]);
  
    return <div ref={wrapperRef} className="d-flex" style={{maxWidth: "max-content"}}>{props.children}</div>;
}


  export default OutsideHandler;