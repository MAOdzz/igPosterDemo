import React, { useState } from 'react';
import {
  Box,
  RadioGroup,
  Heading,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
} from '@chakra-ui/react';

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" cursor="pointer" w="100%">
      <input {...input} />
      <Box
        {...checkbox}
        w="100%"
        borderWidth="1px"
        boxShadow="sm"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={2}
        py={1}
        mt={1}
        fontSize="sm"
        opacity={props.isChecked ? '1' : '0.75'}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export const SelectionForm = ({
  formHeader,
  selector,
  selectorDescription,
  onSelectionChange,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (nextValue) => {
    setValue(nextValue);
    if (onSelectionChange) {
      onSelectionChange(nextValue);
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'options',
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <Box p={4} w="100%">
      {formHeader && (
        <Heading size="md" mb={2}>
          {formHeader}
        </Heading>
      )}
      {selectorDescription && <Text mb={1}>{selectorDescription}</Text>}
      <RadioGroup value={value}>
        <VStack {...group}>
          {selector.map((option) => (
            <RadioCard
              w="100%"
              key={option.value}
              {...getRadioProps({ value: option.value })}
              isChecked={value === option.value}
            >
              {option.label}
            </RadioCard>
          ))}
        </VStack>
      </RadioGroup>
    </Box>
  );
};
