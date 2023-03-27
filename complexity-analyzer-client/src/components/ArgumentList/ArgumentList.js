import React from 'react';
import { useSelector } from 'react-redux';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';

const ArgumentList = () => {
  const objects = useSelector(state => state.inputArguments.inputArguments); // assuming the objects are stored in the 'objects' slice of Redux state

  return (
    <Accordion>
      {objects.map(object => (
        <AccordionItem key={object.id}>
          <AccordionHeader>{object.title}</AccordionHeader>
          <AccordionBody>
            <p>{object.description}</p>
            {/* render any other information about the object here */}
          </AccordionBody>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ArgumentList;
