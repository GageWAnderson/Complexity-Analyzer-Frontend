import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeInputArgument } from '../../redux/inputArgumentsSlice';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody, Button } from 'reactstrap';

const ArgumentList = () => {
  const objects = useSelector(state => state.inputArguments.inputArguments); // assuming the objects are stored in the 'objects' slice of Redux state

  const dispatch = useDispatch();

  const deleteInputArg = (event) => {
    dispatch(removeInputArgument(event.target.id));
  }

  const [open, setOpen] = useState(false);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <Accordion open={open} toggle={toggle} style={{ marginTop: '16px', marginBottom: '32px' }}>
      {objects.map(inputArgument => (
        <AccordionItem key={inputArgument.name}>
          <AccordionHeader targetId={inputArgument.name}>{inputArgument.name}</AccordionHeader>
          <AccordionBody accordionId={inputArgument.name}>
            <p><b>Type : </b>{inputArgument.type},<b> Variable: </b>{inputArgument.isVariable ? "True" : "False"} {inputArgument.isVariable && `, Max Input Size: ${inputArgument.maxInputSize}`}</p>
            <Button id={inputArgument.name} color="danger" onClick={deleteInputArg}>Delete</Button>
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ArgumentList;
